import { create } from 'zustand';
import type { Asset, NewsItem, ResearchReport, BacktestResult, TradeReasoning, AgentLog } from '../types';
import { assets as initialAssets, newsItems as initialNews, researchReports as initialReports, backtestResults as initialBacktests, tradeReasonings as initialReasonings, agentLogs as initialAgentLogs } from '../data/mockData';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AppState {
  // Assets
  assets: Asset[];
  watchlist: string[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  
  // News
  news: NewsItem[];
  bookmarkedNews: string[];
  toggleBookmarkNews: (id: string) => void;
  
  // Reports
  reports: ResearchReport[];
  generatingReport: boolean;
  generateReport: (ticker: string) => Promise<ResearchReport | null>;
  
  // Backtests
  backtests: BacktestResult[];
  runningBacktest: boolean;
  runBacktest: (strategy: string) => Promise<void>;
  
  // Reasonings
  reasonings: TradeReasoning[];
  
  // Agents
  agentLogs: AgentLog[];
  addAgentLog: (log: Omit<AgentLog, 'id' | 'timestamp'>) => void;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: { assets: Asset[]; news: NewsItem[] };
  
  // UI State
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useAppStore = create<AppState>((set, get) => ({
  // Assets
  assets: initialAssets,
  watchlist: ['AAPL', 'NVDA', 'BTC', 'ETH'],
  addToWatchlist: (symbol) => {
    const { watchlist, addNotification } = get();
    if (!watchlist.includes(symbol)) {
      set({ watchlist: [...watchlist, symbol] });
      addNotification({
        type: 'success',
        title: 'Added to Watchlist',
        message: `${symbol} has been added to your watchlist.`,
      });
    }
  },
  removeFromWatchlist: (symbol) => {
    const { watchlist, addNotification } = get();
    set({ watchlist: watchlist.filter(s => s !== symbol) });
    addNotification({
      type: 'info',
      title: 'Removed from Watchlist',
      message: `${symbol} has been removed from your watchlist.`,
    });
  },
  
  // News
  news: initialNews,
  bookmarkedNews: [],
  toggleBookmarkNews: (id) => {
    const { bookmarkedNews, addNotification } = get();
    if (bookmarkedNews.includes(id)) {
      set({ bookmarkedNews: bookmarkedNews.filter(n => n !== id) });
    } else {
      set({ bookmarkedNews: [...bookmarkedNews, id] });
      addNotification({
        type: 'success',
        title: 'Article Bookmarked',
        message: 'Article saved to your reading list.',
      });
    }
  },
  
  // Reports
  reports: initialReports,
  generatingReport: false,
  generateReport: async (ticker) => {
    const { addNotification, addAgentLog, reports } = get();
    set({ generatingReport: true });
    
    addAgentLog({
      agent: 'Report Generator',
      action: `Generating comprehensive research report for ${ticker}`,
      status: 'running',
      details: `RAG retrieval initiated. Searching 142K+ documents for ${ticker} related content.`,
    });
    
    addNotification({
      type: 'info',
      title: 'Report Generation Started',
      message: `AI is analyzing ${ticker}. This may take 30-60 seconds.`,
    });
    
    await delay(3000);
    
    const newReport: ResearchReport = {
      id: crypto.randomUUID(),
      title: `${ticker}: AI-Generated Deep Dive Analysis`,
      asset: ticker,
      generatedAt: new Date(),
      summary: `Comprehensive analysis of ${ticker} based on RAG retrieval from 847 financial documents, real-time market data, and multi-agent AI analysis. Our models have identified key trends and risk factors that inform our investment thesis.`,
      sections: [
        {
          title: 'Executive Summary',
          content: `${ticker} presents a compelling risk/reward profile based on current market conditions. Our multi-factor analysis incorporates technical indicators, fundamental metrics, sentiment analysis, and on-chain data (where applicable) to generate this recommendation.`,
          type: 'text',
        },
        {
          title: 'Technical Analysis',
          content: `Price action shows consolidation above key support levels. RSI at 58 indicates neutral momentum with room for upside. MACD histogram turning positive suggests potential bullish crossover. Volume profile supports current price levels.`,
          type: 'text',
        },
        {
          title: 'Fundamental Metrics',
          content: `Valuation metrics are within historical ranges. Growth trajectory remains intact based on forward estimates. Cash flow generation supports continued operations and potential shareholder returns.`,
          type: 'text',
        },
        {
          title: 'Risk Assessment',
          content: `Key risks include: market-wide volatility, sector-specific headwinds, and execution risk. Mitigation strategies include position sizing and stop-loss placement at identified support levels.`,
          type: 'text',
        },
      ],
      overallRating: 'buy',
      targetPrice: 100 + Math.random() * 50,
      currentPrice: 100,
      confidence: 70 + Math.floor(Math.random() * 20),
      riskLevel: 'medium',
    };
    
    set({ 
      reports: [newReport, ...reports],
      generatingReport: false,
    });
    
    addAgentLog({
      agent: 'Report Generator',
      action: `Completed research report for ${ticker}`,
      status: 'completed',
      details: `Report generated successfully. 4 sections, confidence: ${newReport.confidence}%, rating: ${newReport.overallRating.toUpperCase()}`,
    });
    
    addNotification({
      type: 'success',
      title: 'Report Generated',
      message: `AI research report for ${ticker} is ready to view.`,
    });
    
    return newReport;
  },
  
  // Backtests
  backtests: initialBacktests,
  runningBacktest: false,
  runBacktest: async (strategy) => {
    const { addNotification, addAgentLog } = get();
    set({ runningBacktest: true });
    
    addAgentLog({
      agent: 'Backtest Engine',
      action: `Running walk-forward optimization for "${strategy}"`,
      status: 'running',
      details: 'Initializing backtest with 10,000 Monte Carlo simulations...',
    });
    
    addNotification({
      type: 'info',
      title: 'Backtest Started',
      message: `Running ${strategy} backtest. This may take a moment.`,
    });
    
    await delay(4000);
    
    set({ runningBacktest: false });
    
    addAgentLog({
      agent: 'Backtest Engine',
      action: `Completed backtest for "${strategy}"`,
      status: 'completed',
      details: 'Walk-forward optimization complete. Results updated in dashboard.',
    });
    
    addNotification({
      type: 'success',
      title: 'Backtest Complete',
      message: `${strategy} backtest finished successfully.`,
    });
  },
  
  // Reasonings
  reasonings: initialReasonings,
  
  // Agents
  agentLogs: initialAgentLogs,
  addAgentLog: (log) => {
    const { agentLogs } = get();
    const newLog: AgentLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    set({ agentLogs: [newLog, ...agentLogs].slice(0, 50) });
  },
  
  // Notifications
  notifications: [
    {
      id: '1',
      type: 'success',
      title: 'NVDA Alert Triggered',
      message: 'NVDA crossed above $875 target price.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Risk Level Elevated',
      message: 'Portfolio tail risk score has increased to 7.8/10.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'New Research Available',
      message: 'AI has generated a new report for BTC.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
  ],
  unreadCount: 3,
  addNotification: (notification) => {
    const { notifications, unreadCount } = get();
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    set({ 
      notifications: [newNotification, ...notifications].slice(0, 20),
      unreadCount: unreadCount + 1,
    });
  },
  markAsRead: (id) => {
    const { notifications, unreadCount } = get();
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      set({
        notifications: notifications.map(n => n.id === id ? { ...n, read: true } : n),
        unreadCount: Math.max(0, unreadCount - 1),
      });
    }
  },
  markAllAsRead: () => {
    const { notifications } = get();
    set({
      notifications: notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    });
  },
  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  },
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => {
    const { assets, news } = get();
    const lowerQuery = query.toLowerCase();
    
    const searchResults = {
      assets: query ? assets.filter(a => 
        a.symbol.toLowerCase().includes(lowerQuery) || 
        a.name.toLowerCase().includes(lowerQuery)
      ) : [],
      news: query ? news.filter(n => 
        n.title.toLowerCase().includes(lowerQuery) ||
        n.summary.toLowerCase().includes(lowerQuery)
      ) : [],
    };
    
    set({ searchQuery: query, searchResults });
  },
  searchResults: { assets: [], news: [] },
  
  // UI State
  showNotifications: false,
  setShowNotifications: (show) => set({ showNotifications: show }),
  showSettings: false,
  setShowSettings: (show) => set({ showSettings: show }),
}));
