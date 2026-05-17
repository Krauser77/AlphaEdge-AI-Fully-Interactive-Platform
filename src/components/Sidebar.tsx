import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, FileText, FlaskConical, Brain, Bot, Zap, TrendingUp } from 'lucide-react';
import type { TabId } from '../types';
import { useAppStore } from '../store/appStore';

interface SidebarProps {
  activeTab: TabId;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode; path: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { id: 'news', label: 'AI News', icon: <Newspaper size={20} />, path: '/news' },
  { id: 'research', label: 'Research', icon: <FileText size={20} />, path: '/research' },
  { id: 'backtest', label: 'Backtesting', icon: <FlaskConical size={20} />, path: '/backtest' },
  { id: 'reasoning', label: 'AI Reasoning', icon: <Brain size={20} />, path: '/reasoning' },
  { id: 'agents', label: 'AI Agents', icon: <Bot size={20} />, path: '/agents' },
];

export default function Sidebar({ activeTab }: SidebarProps) {
  const navigate = useNavigate();
  const { agentLogs } = useAppStore();
  
  const activeAgents = agentLogs.filter(l => l.status === 'running').length;

  return (
    <aside className="w-64 bg-[#0a0e1a] border-r border-gray-800/60 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800/60">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">AlphaEdge</h1>
            <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">AI Research</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-500/15 to-cyan-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <span className={activeTab === tab.id ? 'text-emerald-400' : ''}>{tab.icon}</span>
            {tab.label}
            {tab.id === 'agents' && activeAgents > 0 && (
              <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-400 rounded">
                {activeAgents}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-gray-800/60">
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">LIVE</span>
          </div>
          <p className="text-xs text-gray-400">{activeAgents > 0 ? `${activeAgents} agents active` : '6 agents ready'}</p>
          <p className="text-xs text-gray-400">142K docs indexed</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={12} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold">+47.2% YTD</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
