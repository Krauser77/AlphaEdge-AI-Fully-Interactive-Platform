import { useState } from 'react';
import { FlaskConical, TrendingUp, BarChart3, Target, AlertTriangle, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp, Loader2, Play } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../store/appStore';

export default function Backtesting() {
  const { backtests, runningBacktest, runBacktest } = useAppStore();
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [showTrades, setShowTrades] = useState(false);
  const result = backtests[selectedStrategy];

  const handleRunBacktest = () => {
    runBacktest(result.strategy);
  };

  const metricCards = [
    { label: 'Total Return', value: `+${result.totalReturn}%`, icon: <TrendingUp size={16} />, color: 'emerald' },
    { label: 'Sharpe Ratio', value: result.sharpeRatio.toFixed(2), icon: <BarChart3 size={16} />, color: 'cyan' },
    { label: 'Max Drawdown', value: `${result.maxDrawdown}%`, icon: <AlertTriangle size={16} />, color: 'red' },
    { label: 'Win Rate', value: `${result.winRate}%`, icon: <Target size={16} />, color: 'purple' },
    { label: 'Total Trades', value: result.totalTrades.toString(), icon: <FlaskConical size={16} />, color: 'blue' },
    { label: 'Profit Factor', value: result.profitFactor.toFixed(2), icon: <ArrowUpRight size={16} />, color: 'amber' },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    emerald: { bg: 'from-emerald-500/15 to-emerald-500/5', text: 'text-emerald-400', border: 'border-emerald-500/20', iconBg: 'bg-emerald-500/15' },
    cyan: { bg: 'from-cyan-500/15 to-cyan-500/5', text: 'text-cyan-400', border: 'border-cyan-500/20', iconBg: 'bg-cyan-500/15' },
    red: { bg: 'from-red-500/15 to-red-500/5', text: 'text-red-400', border: 'border-red-500/20', iconBg: 'bg-red-500/15' },
    purple: { bg: 'from-purple-500/15 to-purple-500/5', text: 'text-purple-400', border: 'border-purple-500/20', iconBg: 'bg-purple-500/15' },
    blue: { bg: 'from-blue-500/15 to-blue-500/5', text: 'text-blue-400', border: 'border-blue-500/20', iconBg: 'bg-blue-500/15' },
    amber: { bg: 'from-amber-500/15 to-amber-500/5', text: 'text-amber-400', border: 'border-amber-500/20', iconBg: 'bg-amber-500/15' },
  };

  return (
    <div className="space-y-6">
      {/* Strategy Config */}
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/15 rounded-xl">
              <FlaskConical size={24} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Backtesting Engine</h3>
              <p className="text-sm text-gray-400 mt-0.5">Walk-forward optimized strategy evaluation with ML signals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(Number(e.target.value))}
              className="bg-white/5 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
              disabled={runningBacktest}
            >
              {backtests.map((r, i) => (
                <option key={i} value={i} className="bg-[#1a1f2e]">{r.strategy}</option>
              ))}
            </select>
            <button 
              onClick={handleRunBacktest}
              disabled={runningBacktest}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {runningBacktest ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run Backtest
                </>
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Strategy: {result.strategy}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            Period: {result.period}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Initial Capital: $100,000
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Walk-Forward: 6M train / 1M test
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-6 gap-3">
        {metricCards.map((card) => {
          const colors = colorClasses[card.color];
          return (
            <div key={card.label} className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-4 hover:scale-[1.02] transition-all cursor-pointer`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${colors.iconBg} ${colors.text}`}>{card.icon}</div>
              </div>
              <p className={`text-xl font-bold ${colors.text}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Equity Curve */}
      <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Equity Curve</h3>
            <p className="text-xs text-gray-500 mt-0.5">Portfolio value over time with {result.totalTrades} trades executed</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-emerald-400 rounded" />
              <span className="text-gray-400">Portfolio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-gray-600 rounded" />
              <span className="text-gray-400">$100K Baseline</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={result.equityCurve}>
            <defs>
              <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} interval={60} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              content={({ active, payload, label }) =>
                active && payload?.[0] ? (
                  <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-3 shadow-xl">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-semibold text-emerald-400">${Number(payload[0].value).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-gray-500">
                      P&L: {(((Number(payload[0].value) - 100000) / 100000) * 100).toFixed(1)}%
                    </p>
                  </div>
                ) : null
              }
            />
            <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} fill="url(#equityGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Trade Log */}
      <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTrades(!showTrades)}
          className="w-full p-5 flex items-center justify-between hover:bg-white/[0.02] transition-all"
        >
          <div>
            <h3 className="text-sm font-semibold text-white text-left">AI Trade Log with Reasoning</h3>
            <p className="text-xs text-gray-500 mt-0.5">Detailed breakdown of each trade with AI decision explanations</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{result.trades.length} trades</span>
            {showTrades ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </button>

        {showTrades && (
          <div className="border-t border-gray-800/60">
            {result.trades.map((trade, i) => (
              <div key={i} className="p-5 border-b border-gray-800/30 last:border-b-0 hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    trade.type === 'buy'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/15 text-red-400 border border-red-500/20'
                  }`}>
                    {trade.type.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{trade.date}</span>
                  <span className="text-sm text-gray-400">@ ${trade.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-400">× {trade.quantity} shares</span>
                  <span className={`ml-auto text-sm font-semibold flex items-center gap-1 ${
                    trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {trade.pnl >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white/[0.02] rounded-xl p-3 ml-8 border-l-2 border-cyan-500/30">
                  <p className="text-xs text-gray-500 mb-1 font-medium">🤖 AI Reasoning:</p>
                  <p className="text-sm text-gray-400">{trade.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
