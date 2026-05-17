import { useState } from 'react';
import { FileText, TrendingUp, Shield, Clock, ChevronDown, ChevronUp, Target, AlertTriangle, CheckCircle2, Sparkles, Loader2, Download, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { ResearchReport } from '../types';
import { useAppStore } from '../store/appStore';

const ratingConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  strong_buy: { label: 'STRONG BUY', color: 'text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  buy: { label: 'BUY', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  hold: { label: 'HOLD', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  sell: { label: 'SELL', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  strong_sell: { label: 'STRONG SELL', color: 'text-red-300', bg: 'bg-red-500/15', border: 'border-red-500/30' },
};

const riskConfig: Record<string, { color: string; bg: string }> = {
  low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/10' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/10' },
  extreme: { color: 'text-red-400', bg: 'bg-red-500/10' },
};

function ReportCard({ report, onDownload, onShare }: { report: ResearchReport; onDownload: () => void; onShare: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const rating = ratingConfig[report.overallRating];
  const risk = riskConfig[report.riskLevel];
  const upside = ((report.targetPrice - report.currentPrice) / report.currentPrice * 100).toFixed(1);

  return (
    <div className="bg-[#0d1117] border border-gray-800/60 rounded-2xl overflow-hidden hover:border-gray-700/60 transition-all">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500/15 to-cyan-500/15 rounded-xl border border-purple-500/20">
              <FileText size={22} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{report.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Sparkles size={10} className="text-emerald-400" /> AI Generated
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={10} /> {formatDistanceToNow(report.generatedAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onDownload}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="Download PDF"
            >
              <Download size={16} />
            </button>
            <button 
              onClick={onShare}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="Share Report"
            >
              <Share2 size={16} />
            </button>
            <div className={`px-4 py-2 rounded-xl text-sm font-bold ${rating.color} ${rating.bg} border ${rating.border}`}>
              {rating.label}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">{report.summary}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/[0.03] rounded-xl p-3 border border-gray-800/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Target size={12} className="text-cyan-400" />
              <span className="text-xs text-gray-500">Target Price</span>
            </div>
            <p className="text-lg font-bold text-white">${report.targetPrice.toLocaleString()}</p>
            <p className={`text-xs font-semibold ${Number(upside) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {Number(upside) >= 0 ? '↑' : '↓'} {upside}% upside
            </p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 border border-gray-800/50">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={12} className="text-emerald-400" />
              <span className="text-xs text-gray-500">Current Price</span>
            </div>
            <p className="text-lg font-bold text-white">${report.currentPrice.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{report.asset}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 border border-gray-800/50">
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={12} className="text-purple-400" />
              <span className="text-xs text-gray-500">AI Confidence</span>
            </div>
            <p className="text-lg font-bold text-white">{report.confidence}%</p>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${report.confidence}%` }} />
            </div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 border border-gray-800/50">
            <div className="flex items-center gap-1.5 mb-1">
              <Shield size={12} className={risk.color} />
              <span className="text-xs text-gray-500">Risk Level</span>
            </div>
            <p className={`text-lg font-bold ${risk.color}`}>{report.riskLevel.toUpperCase()}</p>
            <div className={`text-xs ${risk.color} ${risk.bg} px-2 py-0.5 rounded inline-block mt-0.5`}>
              <AlertTriangle size={10} className="inline mr-1" />
              Assessed
            </div>
          </div>
        </div>
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 bg-white/[0.02] border-t border-gray-800/60 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
      >
        {expanded ? (
          <>
            <ChevronUp size={16} />
            Collapse Full Report
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            View Full Report
          </>
        )}
      </button>

      {/* Expanded Sections */}
      {expanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-gray-800/60">
          {report.sections.map((section, i) => (
            <div key={i} className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full" />
                {section.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed pl-3 border-l border-gray-800/60">{section.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResearchReports() {
  const { reports, generatingReport, generateReport, addNotification } = useAppStore();
  const [ticker, setTicker] = useState('');

  const handleGenerate = async () => {
    if (!ticker.trim()) {
      addNotification({
        type: 'error',
        title: 'Invalid Input',
        message: 'Please enter a valid ticker symbol.',
      });
      return;
    }
    
    await generateReport(ticker.toUpperCase());
    setTicker('');
  };

  const handleDownload = (report: ResearchReport) => {
    addNotification({
      type: 'success',
      title: 'Download Started',
      message: `${report.asset} report PDF is being generated.`,
    });
  };

  const handleShare = (report: ResearchReport) => {
    navigator.clipboard.writeText(`Check out this AI research report on ${report.asset}!`);
    addNotification({
      type: 'success',
      title: 'Link Copied',
      message: 'Share link has been copied to clipboard.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Generator Panel */}
      <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/15 rounded-xl">
              <Sparkles size={24} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Auto Research Report Generator</h3>
              <p className="text-sm text-gray-400 mt-0.5">Generate comprehensive AI-powered research reports for any asset</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Enter ticker (e.g., AAPL, BTC)"
              className="bg-white/5 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 w-56"
              disabled={generatingReport}
            />
            <button 
              onClick={handleGenerate}
              disabled={generatingReport}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {generatingReport ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-500">
          <span>📊 RAG retrieves from 142K+ financial documents</span>
          <span>🤖 Multi-agent analysis pipeline</span>
          <span>⏱️ Average generation time: ~45 seconds</span>
        </div>
      </div>

      {/* Reports */}
      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard 
            key={report.id} 
            report={report} 
            onDownload={() => handleDownload(report)}
            onShare={() => handleShare(report)}
          />
        ))}
      </div>
    </div>
  );
}
