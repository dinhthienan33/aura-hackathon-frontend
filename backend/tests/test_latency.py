import asyncio
import websockets
import time
import json
import base64

async def test_latency():
    uri = "ws://localhost:8089/ws"
    async with websockets.connect(uri) as websocket:
        print("Connected to WebSocket Server")
        
        # 1. Send Dummy Audio (Just bytes)
        # In real life, this would be a chunk of WAV or PCM
        dummy_audio = b'\x00' * 1024 # 1KB of silence
        
        start_time = time.time()
        print(f"Sending {len(dummy_audio)} bytes...")
        await websocket.send(dummy_audio)
        
        # 2. Receive responses
        while True:
            response = await websocket.recv()
            current_time = time.time()
            
            if isinstance(response, str):
                data = json.loads(response)
                print(f"[Time: {current_time - start_time:.3f}s] Received Text JSON: {data}")
                if data.get("type") == "llm_response":
                    print("LLM Response received, waiting for audio...")
            else:
                print(f"[Time: {current_time - start_time:.3f}s] Received Audio Bytes: {len(response)} bytes")
                print("Pipeline Complete!")
                break
                
        total_latency = time.time() - start_time
        print(f"Total Round Trip Latency: {total_latency:.3f}s")

if __name__ == "__main__":
    asyncio.run(test_latency())
