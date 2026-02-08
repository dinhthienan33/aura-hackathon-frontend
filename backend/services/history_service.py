import json
import os
from typing import List, Dict, Any
from datetime import datetime

class HistoryService:
    def __init__(self):
        self.history_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data/history"))
        print(f"Initializing HistoryService with dir: {self.history_dir}")
        if not os.path.exists(self.history_dir):
            try:
                os.makedirs(self.history_dir, exist_ok=True)
                print(f"Created history directory: {self.history_dir}")
            except Exception as e:
                print(f"Failed to create history directory: {e}")

    def _get_agent_history_path(self, agent_id: str) -> str:
        return os.path.join(self.history_dir, f"{agent_id}.json")

    def save_message(self, agent_id: str, role: str, content: str):
        history_path = self._get_agent_history_path(agent_id)
        
        history = self.get_history(agent_id)
        history.append({
            "id": str(len(history) + 1),
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        
        try:
            with open(history_path, 'w', encoding='utf-8') as f:
                json.dump(history, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving history for agent {agent_id}: {e}")

    def get_history(self, agent_id: str) -> List[Dict[str, Any]]:
        history_path = self._get_agent_history_path(agent_id)
        if os.path.exists(history_path):
            try:
                with open(history_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading history for agent {agent_id}: {e}")
                return []
        return []

history_service = HistoryService()
