export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto';
  price: number;
  change24h: number;
  changePct24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  riskScore: number;
  aiSentiment: 'bullish' | 'bearish' | 'neutral';
  aiConfidence: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: Date;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  relatedAssets: string[];
  category: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  asset: string;
  generatedAt: Date;
  summary: string;
  sections: ReportSection[];
  overallRating: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
  targetPrice: number;
  currentPrice: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface ReportSection {
  title: string;
  content: string;
  type: 'text' | 'metric' | 'chart';
}

export interface BacktestResult {
  strategy: string;
  period: string;
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  equityCurve: { date: string; value: number }[];
  trades: BacktestTrade[];
}

export interface BacktestTrade {
  date: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  pnl: number;
  reasoning: string;
}

export interface TradeReasoning {
  id: string;
  asset: string;
  action: 'buy' | 'sell' | 'hold';
  timestamp: Date;
  reasoning: string;
  factors: ReasoningFactor[];
  confidence: number;
  expectedReturn: number;
  timeHorizon: string;
}

export interface ReasoningFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

export interface RiskMetric {
  name: string;
  value: number;
  maxValue: number;
  status: 'safe' | 'warning' | 'danger';
  description: string;
}

export interface AgentLog {
  id: string;
  agent: string;
  action: string;
  timestamp: Date;
  status: 'running' | 'completed' | 'error';
  details: string;
}

export type TabId = 'dashboard' | 'news' | 'research' | 'backtest' | 'reasoning' | 'agents';
