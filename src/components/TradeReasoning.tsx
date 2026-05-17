import { Brain, TrendingUp, TrendingDown, MinusCircle, Clock, Target, Gauge, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAppStore } from '../store/appStore';

const actionConfig = {
  buy: { label: 'BUY', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', icon: <TrendingUp size={18} /> },
  sell: { label: 'SELL', color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', icon: <TrendingDown size={18} /> },
  hold: { label: 'HOLD', color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', icon: <MinusCircle size={18} /> },
};

export default function TradeReasoning() {
  const { reasonings, addNotification } = useAppStore();

  const handleFeedback = (_id: string, positive: boolean) => {
    addNotification({
      type: 'success',
      title: 'Feedback Recorded',
      message: `Thank you for your ${positive ? 'positive' : 'negative'} feedback. This helps improve our AI.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 rounded-xl border border-emerald-500/20">
            <Brain size={24} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">AI Trade Reasoning Engine</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              Transparent, explainable AI decisions with multi-factor analysis and confidence scoring
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
          <span>🧠 Multi-agent analysis pipeline</span>
          <span>📊 RAG-enhanced with 142K+ documents</span>
          <span>🔬 Time-series ML predictions</span>
          <span>📈 Real-time factor decomposition</span>
        </div>
      </div>

      {/* Reasoning Cards */}
      <div className="space-y-4">
        {reasonings.map((reasoning) => {
          const action = actionConfig[reasoning.action];
          return (
            <div key={reasoning.id} className="bg-[#0d1117] border border-gray-800/60 rounded-2xl overflow-hidden hover:border-gray-700/60 transition-all">
              {/* Top Bar */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800/40">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold ${action.color} ${action.bg} border ${action.border} flex items-center gap-2`}>
                    {action.icon}
                    {action.label} {reasoning.asset}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={12} />
                    <span className="text-xs">{formatDistanceToNow(reasoning.timestamp, { addSuffix: true })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Confidence</p>
                    <p className={`text-sm font-bold ${
                      reasoning.confidence >= 80 ? 'text-emerald-400' :
                      reasoning.confidence >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>{reasoning.confidence}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Expected Return</p>
                    <p className={`text-sm font-bold ${reasoning.expectedReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {reasoning.expectedReturn >= 0 ? '+' : ''}{reasoning.expectedReturn}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Time Horizon</p>
                    <p className="text-sm font-bold text-cyan-400">{reasoning.timeHorizon}</p>
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="px-6 py-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Brain size={12} className="text-purple-400" />
                  AI Analysis & Reasoning
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">{reasoning.reasoning}</p>
              </div>

              {/* Factors */}
              <div className="px-6 pb-5">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Gauge size={12} className="text-cyan-400" />
                  Decision Factors
                </h4>
                <div className="space-y-3">
                  {reasoning.factors.map((factor, i) => (
                    <div key={i} className="bg-white/[0.02] rounded-xl p-4 border border-gray-800/40 hover:border-gray-700/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            factor.impact === 'positive' ? 'bg-emerald-400' :
                            factor.impact === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                          }`} />
                          <span className="text-sm font-semibold text-white">{factor.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            factor.impact === 'positive' ? 'bg-emerald-500/10 text-emerald-400' :
                            factor.impact === 'negative' ? 'bg-red-500/10 text-red-400' :
                            'bg-gray-500/10 text-gray-400'
                          }`}>
                            {factor.impact.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Weight:</span>
                          <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                factor.impact === 'positive' ? 'bg-emerald-400' :
                                factor.impact === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                              }`}
                              style={{ width: `${factor.weight * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-400">{(factor.weight * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 ml-4">{factor.description}</p>
                    </div>
                  ))}
                </div>

                {/* Composite Score */}
                <div className="mt-4 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-xl p-4 border border-emerald-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-emerald-400" />
                      <span className="text-sm font-semibold text-white">Composite Signal Score</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            reasoning.confidence >= 80 ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' :
                            reasoning.confidence >= 60 ? 'bg-gradient-to-r from-amber-400 to-orange-400' :
                            'bg-gradient-to-r from-red-400 to-pink-400'
                          }`}
                          style={{ width: `${reasoning.confidence}%` }}
                        />
                      </div>
                      <span className={`text-lg font-bold ${
                        reasoning.confidence >= 80 ? 'text-emerald-400' :
                        reasoning.confidence >= 60 ? 'text-amber-400' : 'text-red-400'
                      }`}>{reasoning.confidence}/100</span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-800/40">
                  <span className="text-xs text-gray-500">Was this analysis helpful?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFeedback(reasoning.id, true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                    >
                      <ThumbsUp size={14} />
                      Yes
                    </button>
                    <button
                      onClick={() => handleFeedback(reasoning.id, false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <ThumbsDown size={14} />
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
