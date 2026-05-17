import { TrendingUp, TrendingDown, DollarSign, Activity, Shield, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { portfolioAllocation, performanceData, marketSentimentHistory, riskMetrics } from '../data/mockData';
import { useAppStore } from '../store/appStore';

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toFixed(0)}`;
};

const formatPrice = (value: number): string => {
  if (value >= 1000) return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toFixed(2)}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: ${Number(entry.value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { assets, watchlist, addToWatchlist, removeFromWatchlist, addNotification } = useAppStore();
  
  const totalValue = 1247832.45;
  const dailyChange = 18432.12;
  const dailyChangePct = 1.5;

  const statCards = [
    { label: 'Portfolio Value', value: `$${totalValue.toLocaleString()}`, change: `+${dailyChangePct}%`, icon: <DollarSign size={20} />, positive: true, color: 'emerald' },
    { label: 'Daily P&L', value: `+$${dailyChange.toLocaleString()}`, change: '+1.5%', icon: <TrendingUp size={20} />, positive: true, color: 'cyan' },
    { label: 'Active Positions', value: '8', change: '2 new today', icon: <Activity size={20} />, positive: true, color: 'purple' },
    { label: 'Risk Score', value: '42/100', change: 'Moderate', icon: <Shield size={20} />, positive: false, color: 'amber' },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500/15 to-emerald-500/5 border-emerald-500/20',
    cyan: 'from-cyan-500/15 to-cyan-500/5 border-cyan-500/20',
    purple: 'from-purple-500/15 to-purple-500/5 border-purple-500/20',
    amber: 'from-amber-500/15 to-amber-500/5 border-amber-500/20',
  };

  const iconColorMap: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/15',
    cyan: 'text-cyan-400 bg-cyan-500/15',
    purple: 'text-purple-400 bg-purple-500/15',
    amber: 'text-amber-400 bg-amber-500/15',
  };

  const handleWatchlistToggle = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${colorMap[card.color]} border rounded-2xl p-5 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer`}
            onClick={() => addNotification({ type: 'info', title: card.label, message: `Current value: ${card.value}` })}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{card.label}</span>
              <div className={`p-2 rounded-xl ${iconColorMap[card.color]}`}>{card.icon}</div>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {card.positive ? <ArrowUpRight size={14} className="text-emerald-400" /> : <ArrowDownRight size={14} className="text-amber-400" />}
              <span className={`text-sm font-medium ${card.positive ? 'text-emerald-400' : 'text-amber-400'}`}>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Performance Chart */}
        <div className="col-span-2 bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Portfolio Performance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Portfolio vs S&P 500 benchmark</p>
            </div>
            <div className="flex gap-2">
              {['1W', '1M', '3M', 'YTD', '1Y'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    period === '3M'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} interval={14} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} domain={['dataMin - 2000', 'dataMax + 2000']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="portfolio" stroke="#22c55e" strokeWidth={2} fill="url(#portfolioGrad)" name="Portfolio" />
              <Area type="monotone" dataKey="benchmark" stroke="#6366f1" strokeWidth={1.5} fill="url(#benchmarkGrad)" name="S&P 500" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Allocation */}
        <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Portfolio Allocation</h3>
          <p className="text-xs text-gray-500 mb-4">Current weight distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={portfolioAllocation}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioAllocation.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-2 shadow-xl">
                      <p className="text-xs font-semibold text-white">{payload[0].name}: {payload[0].value}%</p>
                    </div>
                  ) : null
                }
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {portfolioAllocation.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-400">{item.name}</span>
                <span className="text-xs text-gray-300 ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Table + Risk + Sentiment */}
      <div className="grid grid-cols-3 gap-4">
        {/* Asset Watchlist */}
        <div className="col-span-2 bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">AI-Monitored Assets</h3>
              <p className="text-xs text-gray-500 mt-0.5">Click ★ to add to watchlist</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">All</span>
              <span className="px-2.5 py-1 rounded-lg text-gray-500 text-xs font-medium hover:bg-white/5 cursor-pointer">Stocks</span>
              <span className="px-2.5 py-1 rounded-lg text-gray-500 text-xs font-medium hover:bg-white/5 cursor-pointer">Crypto</span>
            </div>
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800/60">
                  <th className="text-left text-xs font-medium text-gray-500 pb-3 pl-2">Asset</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-3">Price</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-3">24h Change</th>
                  <th className="text-right text-xs font-medium text-gray-500 pb-3">Market Cap</th>
                  <th className="text-center text-xs font-medium text-gray-500 pb-3">AI Signal</th>
                  <th className="text-center text-xs font-medium text-gray-500 pb-3">Watch</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-800/30 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          asset.type === 'crypto' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'
                        }`}>
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{asset.symbol}</p>
                          <p className="text-xs text-gray-500">{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm font-semibold text-white">{formatPrice(asset.price)}</span>
                    </td>
                    <td className="py-3 text-right">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg ${
                        asset.changePct24h >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {asset.changePct24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        <span className="text-xs font-semibold">{asset.changePct24h >= 0 ? '+' : ''}{asset.changePct24h.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-gray-400">{formatMarketCap(asset.marketCap)}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        asset.aiSentiment === 'bullish' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        asset.aiSentiment === 'bearish' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {asset.aiSentiment.toUpperCase()} {asset.aiConfidence}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() => handleWatchlistToggle(asset.symbol)}
                        className={`p-1.5 rounded-lg transition-all ${
                          watchlist.includes(asset.symbol)
                            ? 'text-amber-400 bg-amber-500/15'
                            : 'text-gray-600 hover:text-amber-400 hover:bg-amber-500/10'
                        }`}
                      >
                        <Star size={14} fill={watchlist.includes(asset.symbol) ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk & Sentiment Column */}
        <div className="space-y-4">
          {/* Market Sentiment */}
          <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Market Sentiment</h3>
            <p className="text-xs text-gray-500 mb-4">30-day AI sentiment analysis</p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={marketSentimentHistory.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis tick={{ fontSize: 9, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip content={({ active, payload, label }) =>
                  active && payload ? (
                    <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-2 shadow-xl">
                      <p className="text-xs text-gray-400 mb-1">{label}</p>
                      {payload.map((p: any, i: number) => (
                        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {Number(p.value).toFixed(1)}%</p>
                      ))}
                    </div>
                  ) : null
                } />
                <Bar dataKey="bullish" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} name="Bullish" />
                <Bar dataKey="neutral" stackId="a" fill="#6b7280" radius={[0, 0, 0, 0]} name="Neutral" />
                <Bar dataKey="bearish" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} name="Bearish" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Metrics */}
          <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-1">Risk Overview</h3>
            <p className="text-xs text-gray-500 mb-3">Key portfolio risk indicators</p>
            <div className="space-y-3">
              {riskMetrics.slice(0, 5).map((metric) => (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{metric.name}</span>
                    <span className={`text-xs font-semibold ${
                      metric.status === 'safe' ? 'text-emerald-400' :
                      metric.status === 'warning' ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {metric.value}{metric.name.includes('%') || metric.name.includes('VaR') ? '%' : ''}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        metric.status === 'safe' ? 'bg-emerald-400' :
                        metric.status === 'warning' ? 'bg-amber-400' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
