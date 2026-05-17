import { useState } from 'react';
import { Clock, TrendingUp, TrendingDown, Minus, ExternalLink, Sparkles, Filter, Tag, Bookmark, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAppStore } from '../store/appStore';

export default function NewsFeed() {
  const { news, bookmarkedNews, toggleBookmarkNews, addNotification } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(news.map((n) => n.category)))];

  const filtered = news.filter((n) => {
    if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
    if (selectedSentiment !== 'all' && n.sentiment !== selectedSentiment) return false;
    return true;
  });

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(title);
    addNotification({
      type: 'success',
      title: 'Copied to Clipboard',
      message: 'Article title copied. Share it anywhere!',
    });
  };

  const positiveCount = news.filter(n => n.sentiment === 'positive').length;
  const neutralCount = news.filter(n => n.sentiment === 'neutral').length;
  const negativeCount = news.filter(n => n.sentiment === 'negative').length;

  return (
    <div className="space-y-6">
      {/* AI Summary Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500/15 rounded-xl">
            <Sparkles size={24} className="text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-2">AI Market Intelligence Summary</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-emerald-400 font-semibold">Overall Market Sentiment: Moderately Bullish (+0.23).</span>{' '}
              Key themes today: (1) NVIDIA earnings beat driving semiconductor rally, (2) Bitcoin ETF inflows hitting record levels suggesting institutional acceleration,
              (3) Fed dovish pivot benefiting risk assets broadly. Caution flags: Tesla competitive headwinds in China, Ethereum L2 centralization concerns.
              Our RAG system analyzed <span className="text-cyan-400 font-semibold">{news.length} articles</span> from 34 sources in the last 24 hours.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-gray-400">{positiveCount} Positive</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-xs text-gray-400">{neutralCount} Neutral</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs text-gray-400">{negativeCount} Negative</span>
              </div>
              <span className="text-xs text-gray-600 ml-auto">Powered by FinBERT + GPT-4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Tag size={14} className="text-gray-500" />
          <span className="text-xs text-gray-500 font-medium">Sentiment:</span>
          {['all', 'positive', 'neutral', 'negative'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSentiment(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedSentiment === s
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">
        Showing {filtered.length} of {news.length} articles
      </p>

      {/* News Cards */}
      <div className="space-y-3">
        {filtered.map((newsItem) => (
          <div
            key={newsItem.id}
            className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-5 hover:border-gray-700/60 transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Sentiment Indicator */}
              <div className={`mt-1 p-2.5 rounded-xl ${
                newsItem.sentiment === 'positive' ? 'bg-emerald-500/10' :
                newsItem.sentiment === 'negative' ? 'bg-red-500/10' :
                'bg-gray-500/10'
              }`}>
                {newsItem.sentiment === 'positive' ? <TrendingUp size={20} className="text-emerald-400" /> :
                 newsItem.sentiment === 'negative' ? <TrendingDown size={20} className="text-red-400" /> :
                 <Minus size={20} className="text-gray-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{newsItem.source}</span>
                  <span className="text-xs font-medium text-gray-600 bg-gray-800 px-2 py-0.5 rounded">{newsItem.category}</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock size={11} />
                    <span className="text-xs">{formatDistanceToNow(newsItem.timestamp, { addSuffix: true })}</span>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleBookmarkNews(newsItem.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        bookmarkedNews.includes(newsItem.id)
                          ? 'text-amber-400 bg-amber-500/15'
                          : 'text-gray-500 hover:text-amber-400 hover:bg-amber-500/10'
                      }`}
                    >
                      <Bookmark size={14} fill={bookmarkedNews.includes(newsItem.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                      onClick={() => handleShare(newsItem.title)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors cursor-pointer">
                  {newsItem.title}
                  <ExternalLink size={12} className="inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>

                <p className="text-sm text-gray-400 leading-relaxed mb-3">{newsItem.summary}</p>

                <div className="flex items-center gap-3">
                  {/* Sentiment Score */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Sentiment:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            newsItem.sentimentScore > 0 ? 'bg-emerald-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${Math.abs(newsItem.sentimentScore) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${
                        newsItem.sentimentScore > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {newsItem.sentimentScore > 0 ? '+' : ''}{(newsItem.sentimentScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Related Assets */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-xs text-gray-600">Related:</span>
                    {newsItem.relatedAssets.map((asset) => (
                      <span key={asset} className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 cursor-pointer hover:bg-blue-500/20 transition-colors">
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
