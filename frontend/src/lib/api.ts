import { AgentProfile, CreateAgentRequest, UpdateAgentRequest } from '@/types/agent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const agentApi = {
  createAgent: async (data: CreateAgentRequest): Promise<AgentProfile> => {
    const response = await fetch(`${API_BASE_URL}/agents/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create agent');
    return response.json();
  },

  listAgents: async (): Promise<AgentProfile[]> => {
    const response = await fetch(`${API_BASE_URL}/agents/`);
    if (!response.ok) throw new Error('Failed to fetch agents');
    return response.json();
  },

  getAgent: async (id: string): Promise<AgentProfile> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`);
    if (!response.ok) throw new Error('Failed to fetch agent');
    return response.json();
  },

  updateAgent: async (id: string, data: UpdateAgentRequest): Promise<AgentProfile> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update agent');
    return response.json();
  },

  deleteAgent: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete agent');
  },

  getChatHistory: async (agentId: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/chat/history/${agentId}`);
    if (!response.ok) throw new Error('Failed to fetch chat history');
    return response.json();
  },
};
