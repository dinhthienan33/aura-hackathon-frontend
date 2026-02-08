"use client";

import { useEffect, useState } from "react";
import { AgentProfile } from "@/types/agent";
import { agentApi } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Edit2, 
  Trash2, 
  User, 
  Plus, 
  MoreVertical,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function MyAgents() {
  const [agents, setAgents] = useState<AgentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingAgent, setEditingAgent] = useState<AgentProfile | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const data = await agentApi.listAgents();
      setAgents(data);
    } catch (err) {
      console.error("Failed to load agents", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await agentApi.deleteAgent(id);
      setAgents(agents.filter(a => a.id !== id));
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete agent", err);
    }
  };

  const handleEditInit = (agent: AgentProfile) => {
    setEditingAgent(agent);
    setEditForm({ name: agent.name, description: agent.description });
  };

  const handleUpdate = async () => {
    if (!editingAgent) return;
    setUpdating(true);
    try {
      const updated = await agentApi.updateAgent(editingAgent.id, editForm);
      setAgents(agents.map(a => a.id === editingAgent.id ? updated : a));
      setEditingAgent(null);
    } catch (err) {
      console.error("Failed to update agent", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-elderly-base font-medium">Back to Home</span>
          </Link>
          <h1 className="font-display text-elderly-3xl md:text-elderly-4xl font-bold text-navy-900">
            My AI Companions
          </h1>
          <p className="text-elderly-lg text-navy-600 mt-2">
            Choose who you would like to talk with today.
          </p>
        </div>
        
        <Link 
          href="/create"
          className="inline-flex items-center gap-2 px-6 py-4 bg-sage-500 text-white rounded-warm-xl text-elderly-lg font-bold hover:bg-sage-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <Plus className="w-6 h-6" />
          Create New Aura
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-20 bg-white/50 backdrop-blur rounded-warm-2xl border-2 border-dashed border-warmGray-300">
          <div className="w-20 h-20 bg-warmGray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-warmGray-400" />
          </div>
          <h2 className="text-elderly-2xl font-bold text-navy-800 mb-2">No Companions Yet</h2>
          <p className="text-elderly-lg text-warmGray-500 mb-8">Create your first AI companion to start chatting.</p>
          <Link 
            href="/create"
            className="px-8 py-4 bg-sage-500 text-white rounded-warm-xl text-elderly-lg font-bold"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-warm-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-warmGray-100 flex flex-col"
              >
                {/* Card Top: Info */}
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-warm-xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-display font-bold text-white uppercase">
                        {agent.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditInit(agent)}
                        className="p-2 text-warmGray-400 hover:bg-cream-100 hover:text-navy-700 rounded-full transition-colors"
                        title="Edit companion"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setDeleteId(agent.id)}
                        className="p-2 text-warmGray-400 hover:bg-red-50 hover:text-aura-danger rounded-full transition-colors"
                        title="Delete companion"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-elderly-2xl font-bold text-navy-900 mb-2 group-hover:text-sage-600 transition-colors">
                    {agent.name}
                  </h2>
                  <p className="text-elderly-base text-navy-600 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                {/* Card Bottom: Actions */}
                <div className="bg-warmGray-50 p-4 grid grid-cols-3 gap-3 border-t border-warmGray-100">
                  <Link 
                    href={`/chat?agentId=${agent.id}`}
                    className="flex flex-col items-center justify-center gap-2 p-3 bg-white hover:bg-sage-50 text-sage-600 rounded-warm-lg shadow-sm hover:shadow transition-all group/action"
                  >
                    <MessageCircle className="w-6 h-6 group-hover/action:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Chat</span>
                  </Link>
                  
                  <Link 
                    href={`/chat?agentId=${agent.id}&mode=voice`}
                    className="flex flex-col items-center justify-center gap-2 p-3 bg-white hover:bg-aura-accent/10 text-aura-accent rounded-warm-lg shadow-sm hover:shadow transition-all group/action"
                  >
                    <Phone className="w-6 h-6 group-hover/action:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Voice</span>
                  </Link>
                  
                  <Link 
                    href={`/chat?agentId=${agent.id}&mode=video`}
                    className="flex flex-col items-center justify-center gap-2 p-3 bg-white hover:bg-navy-50 text-navy-600 rounded-warm-lg shadow-sm hover:shadow transition-all group/action"
                  >
                    <Video className="w-6 h-6 group-hover/action:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">Video</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-warm-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-aura-danger">
                <Trash2 className="w-10 h-10" />
              </div>
              <h3 className="text-elderly-2xl font-bold text-navy-800 mb-4">Are you sure?</h3>
              <p className="text-elderly-lg text-warmGray-600 mb-8">
                This will delete your AI companion and all conversation history.
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleDelete(deleteId)}
                  className="w-full py-4 bg-aura-danger text-white text-elderly-lg font-bold rounded-warm-xl hover:bg-red-700 transition-colors shadow-lg"
                >
                  Delete Forever
                </button>
                <button 
                  onClick={() => setDeleteId(null)}
                  className="w-full py-4 bg-warmGray-200 text-navy-700 text-elderly-lg font-medium rounded-warm-xl hover:bg-warmGray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAgent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-warm-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-elderly-2xl font-bold text-navy-800 mb-6">Edit Companion</h3>
              
              <div className="space-y-6 mb-8 text-left">
                <div>
                  <label className="block text-elderly-base font-medium text-navy-700 mb-2">Name</label>
                  <input 
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-elderly-base font-medium text-navy-700 mb-2">Description</label>
                  <textarea 
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-warmGray-200 rounded-warm-xl focus:border-sage-400 outline-none transition-all min-h-[120px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleUpdate}
                  disabled={updating}
                  className="w-full py-4 bg-sage-500 text-white text-elderly-lg font-bold rounded-warm-xl hover:bg-sage-600 transition-colors shadow-lg disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  onClick={() => setEditingAgent(null)}
                  className="w-full py-4 bg-warmGray-200 text-navy-700 text-elderly-lg font-medium rounded-warm-xl hover:bg-warmGray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
