"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: any) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  reconnectAttempts?: number;
  reconnectInterval?: number;
}

interface WebSocketHookReturn {
  isConnected: boolean;
  send: (data: any) => void;
  disconnect: () => void;
  reconnect: () => void;
}

/**
 * Custom hook for WebSocket connection management
 * Will be used to connect with the backend server
 */
export function useWebSocket({
  url,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
  reconnectAttempts = 5,
  reconnectInterval = 3000,
}: UseWebSocketOptions): WebSocketHookReturn {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("[WebSocket] Connected to", url);
        setIsConnected(true);
        reconnectCountRef.current = 0;
        onConnect?.();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage?.(data);
        } catch (e) {
          // Handle non-JSON messages
          onMessage?.(event.data);
        }
      };

      ws.onclose = () => {
        console.log("[WebSocket] Disconnected");
        setIsConnected(false);
        onDisconnect?.();

        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++;
          console.log(
            `[WebSocket] Reconnecting... Attempt ${reconnectCountRef.current}`,
          );
          setTimeout(connect, reconnectInterval);
        }
      };

      ws.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
        onError?.(error);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("[WebSocket] Failed to connect:", error);
    }
  }, [
    url,
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    reconnectAttempts,
    reconnectInterval,
  ]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const payload = typeof data === "string" ? data : JSON.stringify(data);
      wsRef.current.send(payload);
    } else {
      console.warn("[WebSocket] Cannot send - not connected");
    }
  }, []);

  const disconnect = useCallback(() => {
    reconnectCountRef.current = reconnectAttempts; // Prevent reconnection
    wsRef.current?.close();
  }, [reconnectAttempts]);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectCountRef.current = 0;
    setTimeout(connect, 100);
  }, [connect, disconnect]);

  useEffect(() => {
    // Uncomment to auto-connect when backend is ready
    // connect();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return {
    isConnected,
    send,
    disconnect,
    reconnect,
  };
}

/**
 * Audio streaming utilities for WebSocket
 */
export class AudioStreamer {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(onDataAvailable: (data: Blob) => void): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          onDataAvailable(event.data);
        }
      };

      this.mediaRecorder.start(100); // Send chunks every 100ms
      console.log("[AudioStreamer] Recording started");
    } catch (error) {
      console.error("[AudioStreamer] Failed to start recording:", error);
      throw error;
    }
  }

  stopRecording(): Blob | null {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
      this.stream?.getTracks().forEach((track) => track.stop());

      if (this.audioChunks.length > 0) {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        this.audioChunks = [];
        console.log("[AudioStreamer] Recording stopped");
        return audioBlob;
      }
    }
    return null;
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === "recording";
  }
}

/**
 * Helper to play audio from base64 or Blob
 */
export function playAudio(audioData: string | Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();

    if (typeof audioData === "string") {
      // Assume base64
      audio.src = `data:audio/mp3;base64,${audioData}`;
    } else {
      audio.src = URL.createObjectURL(audioData);
    }

    audio.onended = () => {
      URL.revokeObjectURL(audio.src);
      resolve();
    };

    audio.onerror = (error) => {
      URL.revokeObjectURL(audio.src);
      reject(error);
    };

    audio.play().catch(reject);
  });
}
