import { Bot, CheckCircle2, AlertCircle, Loader2, Clock, Activity, Database, Cpu, Globe, BarChart3, Shield, Zap, Play, Pause, RotateCcw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

const agentIcons: Record<string, React.ReactNode> = {
  'News Crawler': <Globe size={16} />,
  'Sentiment Analyzer': <BarChart3 size={16} />,
  'RAG Indexer': <Database size={16} />,
  'Price Predictor': <Activity size={16} />,
  'Risk Monitor': <Shield size={16} />,
  'Report Generator': <Zap size={16} />,
  'Backtest Engine': <Cpu size={16} />,
  'On-Chain Analyzer': <Globe size={16} />,
  'Trade Executor': <Activity size={16} />,
  'Portfolio Optimizer': <BarChart3 size={16} />,
};

const statusConfig = {
  completed: { icon: <CheckCircle2 size={14} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Completed' },
  running: { icon: <Loader2 size={14} className="animate-spin" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', label: 'Running' },
  error: { icon: <AlertCircle size={14} />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Error' },
};

const architectureNodes = [
  { name: 'Data Ingestion', agents: ['News Crawler', 'On-Chain Analyzer'], x: 0 },
  { name: 'Processing', agents: ['Sentiment Analyzer', 'RAG Indexer'], x: 1 },
  { name: 'Analysis', agents: ['Price Predictor', 'Risk Monitor', 'Backtest Engine'], x: 2 },
  { name: 'Decision', agents: ['Report Generator', 'Portfolio Optimizer'], x: 3 },
  { name: 'Execution', agents: ['Trade Executor'], x: 4 },
];

export default function AgentMonitor() {
  const { agentLogs, addAgentLog, addNotification } = useAppStore();
  const [pulseState, setPulseState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPulseState((p) => (p + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const completed = agentLogs.filter((l) => l.status === 'completed').length;
  const running = agentLogs.filter((l) => l.status === 'running').length;
  const errors = agentLogs.filter((l) => l.status === 'error').length;

  const handleRestartAgent = (agentName: string) => {
    addAgentLog({
      agent: agentName,
      action: `Restarting ${agentName}...`,
      status: 'running',
      details: 'Manual restart initiated by user.',
    });
    addNotification({
      type: 'info',
      title: 'Agent Restarting',
      message: `${agentName} is being restarted.`,
    });
    
    setTimeout(() => {
      addAgentLog({
        agent: agentName,
        action: `${agentName} restarted successfully`,
        status: 'completed',
        details: 'Agent is now operational and processing tasks.',
      });
      addNotification({
        type: 'success',
        title: 'Agent Online',
        message: `${agentName} is now running.`,
      });
    }, 2000);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    addNotification({
      type: isPaused ? 'success' : 'warning',
      title: isPaused ? 'Agents Resumed' : 'Agents Paused',
      message: isPaused ? 'All agents are now active.' : 'All agents have been paused.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Bot size={18} className="text-emerald-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">Total Agents</span>
          </div>
          <p className="text-3xl font-bold text-white">10</p>
          <p className="text-xs text-emerald-400 mt-1">Multi-agent system</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 size={18} className={`text-cyan-400 ${!isPaused && running > 0 ? 'animate-spin' : ''}`} />
            <span className="text-xs text-gray-400 uppercase tracking-wider">Active</span>
          </div>
          <p className="text-3xl font-bold text-cyan-400">{running}</p>
          <p className="text-xs text-gray-400 mt-1">{isPaused ? 'Paused' : 'Currently processing'}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">Completed</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">{completed}</p>
          <p className="text-xs text-gray-400 mt-1">Last 30 minutes</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/15 to-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-red-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">Errors</span>
          </div>
          <p className="text-3xl font-bold text-red-400">{errors}</p>
          <p className="text-xs text-gray-400 mt-1">Auto-retry enabled</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between bg-[#0d1117] border border-gray-800/60 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Agent Control Panel</span>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs ${
            isPaused ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            {isPaused ? 'PAUSED' : 'ACTIVE'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePause}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isPaused
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
            }`}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            {isPaused ? 'Resume All' : 'Pause All'}
          </button>
          <button
            onClick={() => handleRestartAgent('All Agents')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-300 border border-gray-700/50 hover:bg-white/10 transition-all"
          >
            <RotateCcw size={14} />
            Restart All
          </button>
        </div>
      </div>

      {/* Architecture Pipeline */}
      <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Agent Pipeline Architecture</h3>
        <p className="text-xs text-gray-500 mb-6">Data flows through 5 processing stages with autonomous coordination</p>

        <div className="flex items-stretch gap-3">
          {architectureNodes.map((node, nodeIndex) => (
            <div key={node.name} className="flex-1 flex flex-col items-center gap-2">
              <div className={`text-xs font-semibold px-3 py-1 rounded-lg ${
                nodeIndex === pulseState && !isPaused
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-400 border border-gray-800/60'
              } transition-all duration-500`}>
                {node.name}
              </div>
              <div className="flex flex-col gap-2 w-full">
                {node.agents.map((agentName) => {
                  const log = agentLogs.find((l) => l.agent === agentName);
                  const status = log ? statusConfig[log.status] : statusConfig.completed;
                  return (
                    <div
                      key={agentName}
                      onClick={() => log?.status === 'error' && handleRestartAgent(agentName)}
                      className={`rounded-xl p-3 border ${status.border} ${status.bg} transition-all ${
                        log?.status === 'error' ? 'cursor-pointer hover:scale-[1.02]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={status.color}>{agentIcons[agentName] || <Bot size={14} />}</span>
                        <span className="text-xs font-medium text-white truncate">{agentName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {status.icon}
                        <span className={`text-[10px] ${status.color}`}>{status.label}</span>
                        {log?.status === 'error' && (
                          <span className="text-[10px] text-gray-500 ml-1">(click to restart)</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Flow arrows */}
        <div className="flex items-center justify-between mt-3 px-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-1 flex justify-center">
              <div className={`text-xs transition-all duration-500 ${
                i === pulseState && !isPaused ? 'text-emerald-400' : 'text-gray-700'
              }`}>→→→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800/60 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Agent Activity Log</h3>
            <p className="text-xs text-gray-500 mt-0.5">Real-time monitoring of all agent operations</p>
          </div>
          <span className="text-xs text-gray-500">{agentLogs.length} events</span>
        </div>

        <div className="divide-y divide-gray-800/40 max-h-[400px] overflow-y-auto">
          {agentLogs.map((log) => {
            const status = statusConfig[log.status];
            return (
              <div key={log.id} className="px-6 py-4 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 p-2 rounded-lg ${status.bg} ${status.color}`}>
                    {agentIcons[log.agent] || <Bot size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold text-white">{log.agent}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.color} ${status.bg} border ${status.border} flex items-center gap-1`}>
                        {status.icon}
                        {status.label}
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1 ml-auto">
                        <Clock size={10} />
                        {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-1 bg-white/[0.02] rounded-lg p-2 border border-gray-800/40">{log.details}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
