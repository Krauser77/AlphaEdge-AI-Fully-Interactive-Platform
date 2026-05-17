import type { Asset, NewsItem, ResearchReport, BacktestResult, TradeReasoning, RiskMetric, AgentLog } from '../types';

const generateSparkline = (base: number, volatility: number, points = 24): number[] => {
  const data: number[] = [];
  let current = base;
  for (let i = 0; i < points; i++) {
    current += (Math.random() - 0.48) * volatility;
    data.push(Math.round(current * 100) / 100);
  }
  return data;
};

export const assets: Asset[] = [
  {
    id: '1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock',
    price: 198.45, change24h: 3.21, changePct24h: 1.64,
    marketCap: 3.08e12, volume24h: 54.2e9,
    sparkline: generateSparkline(195, 2),
    riskScore: 28, aiSentiment: 'bullish', aiConfidence: 87,
  },
  {
    id: '2', symbol: 'NVDA', name: 'NVIDIA Corp.', type: 'stock',
    price: 875.30, change24h: 22.15, changePct24h: 2.60,
    marketCap: 2.15e12, volume24h: 42.1e9,
    sparkline: generateSparkline(850, 15),
    riskScore: 45, aiSentiment: 'bullish', aiConfidence: 92,
  },
  {
    id: '3', symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock',
    price: 242.68, change24h: -5.32, changePct24h: -2.14,
    marketCap: 771e9, volume24h: 28.3e9,
    sparkline: generateSparkline(248, 5),
    riskScore: 72, aiSentiment: 'bearish', aiConfidence: 68,
  },
  {
    id: '4', symbol: 'BTC', name: 'Bitcoin', type: 'crypto',
    price: 67432.18, change24h: 1245.30, changePct24h: 1.88,
    marketCap: 1.32e12, volume24h: 32.1e9,
    sparkline: generateSparkline(66000, 800),
    riskScore: 55, aiSentiment: 'bullish', aiConfidence: 78,
  },
  {
    id: '5', symbol: 'ETH', name: 'Ethereum', type: 'crypto',
    price: 3521.44, change24h: -42.18, changePct24h: -1.18,
    marketCap: 423e9, volume24h: 15.4e9,
    sparkline: generateSparkline(3550, 40),
    riskScore: 60, aiSentiment: 'neutral', aiConfidence: 65,
  },
  {
    id: '6', symbol: 'SOL', name: 'Solana', type: 'crypto',
    price: 148.92, change24h: 8.45, changePct24h: 6.01,
    marketCap: 65e9, volume24h: 4.2e9,
    sparkline: generateSparkline(140, 6),
    riskScore: 78, aiSentiment: 'bullish', aiConfidence: 71,
  },
  {
    id: '7', symbol: 'MSFT', name: 'Microsoft Corp.', type: 'stock',
    price: 415.80, change24h: 1.92, changePct24h: 0.46,
    marketCap: 3.09e12, volume24h: 22.1e9,
    sparkline: generateSparkline(414, 3),
    riskScore: 22, aiSentiment: 'bullish', aiConfidence: 90,
  },
  {
    id: '8', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock',
    price: 185.60, change24h: -1.24, changePct24h: -0.66,
    marketCap: 1.93e12, volume24h: 35.6e9,
    sparkline: generateSparkline(186, 2),
    riskScore: 35, aiSentiment: 'neutral', aiConfidence: 72,
  },
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Reports Record Q4 Revenue Driven by AI Chip Demand',
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    summary: 'NVIDIA\'s quarterly revenue surged 265% year-over-year to $22.1 billion, beating analyst expectations by $1.5B. Data center revenue alone grew 409% as hyperscalers continue massive AI infrastructure buildouts. CEO Jensen Huang highlighted the "tipping point" of generative AI adoption across industries. The company also announced expanded partnerships with major cloud providers.',
    sentiment: 'positive',
    sentimentScore: 0.92,
    relatedAssets: ['NVDA'],
    category: 'Earnings',
  },
  {
    id: '2',
    title: 'Bitcoin ETF Inflows Hit $1.2B in Single Day, Setting New Record',
    source: 'CoinDesk',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    summary: 'Spot Bitcoin ETFs recorded their highest single-day inflow of $1.2 billion, with BlackRock\'s IBIT leading at $612 million. Total cumulative inflows have now exceeded $15 billion since launch. Analysts suggest this signals growing institutional adoption and could push BTC above $70K in the near term. Trading volumes across major exchanges also spiked 40%.',
    sentiment: 'positive',
    sentimentScore: 0.88,
    relatedAssets: ['BTC'],
    category: 'Market Flow',
  },
  {
    id: '3',
    title: 'Tesla Faces Headwinds as China EV Competition Intensifies',
    source: 'Reuters',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    summary: 'Tesla\'s market share in China dropped to 7.8% from 10.2% as domestic competitors BYD, NIO, and Xiaomi gain ground with aggressive pricing and advanced features. BYD\'s new models undercut Tesla by 20-30% while offering comparable range. Analysts at Morgan Stanley downgraded their China delivery forecast by 15%, citing increased competitive pressure and potential margin compression.',
    sentiment: 'negative',
    sentimentScore: -0.75,
    relatedAssets: ['TSLA'],
    category: 'Competition',
  },
  {
    id: '4',
    title: 'Federal Reserve Signals Potential Rate Cuts in H2 2024',
    source: 'CNBC',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    summary: 'Fed Chair Powell indicated that inflation data has shown "encouraging progress" and the committee is prepared to begin easing monetary policy if trends continue. Markets now price in a 78% probability of a June rate cut. The shift in tone boosted tech stocks and risk assets broadly, with the Nasdaq rallying 2.1% on the news.',
    sentiment: 'positive',
    sentimentScore: 0.82,
    relatedAssets: ['AAPL', 'MSFT', 'NVDA', 'BTC', 'ETH'],
    category: 'Macro',
  },
  {
    id: '5',
    title: 'Solana Network Activity Surges to All-Time High',
    source: 'The Block',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    summary: 'Solana processed over 65 million transactions in 24 hours, surpassing its previous record by 23%. The surge is attributed to growing DeFi activity, memecoin trading on Jupiter DEX, and increasing NFT volume on Tensor. Total Value Locked (TVL) crossed $5.2 billion, a 340% increase year-over-year. Network uptime has been maintained at 99.8% over the past 90 days.',
    sentiment: 'positive',
    sentimentScore: 0.79,
    relatedAssets: ['SOL'],
    category: 'On-Chain',
  },
  {
    id: '6',
    title: 'Apple Vision Pro Enterprise Adoption Exceeds Expectations',
    source: 'TechCrunch',
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    summary: 'Apple reported that over 2,000 enterprise customers have deployed Vision Pro, with SAP, Siemens, and Boeing leading adoption. Enterprise revenue from spatial computing is projected to reach $4B annually by 2026. The device is finding unexpected traction in healthcare, manufacturing, and architectural design verticals.',
    sentiment: 'positive',
    sentimentScore: 0.71,
    relatedAssets: ['AAPL'],
    category: 'Product',
  },
  {
    id: '7',
    title: 'Ethereum Layer-2 Activity Faces Scrutiny Over Centralization',
    source: 'DeFi Pulse',
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    summary: 'A new report from the Ethereum Foundation raises concerns about centralization risks in major Layer-2 solutions. Arbitrum and Optimism together control 82% of L2 TVL, and sequencer centralization remains unaddressed. The report could impact ETH\'s narrative as the leading smart contract platform and raise regulatory questions.',
    sentiment: 'negative',
    sentimentScore: -0.52,
    relatedAssets: ['ETH'],
    category: 'Research',
  },
  {
    id: '8',
    title: 'Amazon Web Services Announces Custom AI Chips, Challenging NVIDIA',
    source: 'Wall Street Journal',
    timestamp: new Date(Date.now() - 1000 * 60 * 600),
    summary: 'AWS unveiled its next-generation Trainium3 AI training chip, claiming 4x performance improvement over the previous generation at 40% lower cost per training hour. While still behind NVIDIA\'s H100 in raw performance, the cost advantage could attract price-sensitive enterprise customers. AWS commits to spending $12B on custom silicon over the next 3 years.',
    sentiment: 'neutral',
    sentimentScore: 0.15,
    relatedAssets: ['AMZN', 'NVDA'],
    category: 'Technology',
  },
];

export const researchReports: ResearchReport[] = [
  {
    id: '1',
    title: 'NVIDIA: AI Infrastructure Dominance — Deep Dive Analysis',
    asset: 'NVDA',
    generatedAt: new Date(Date.now() - 1000 * 60 * 30),
    summary: 'NVIDIA maintains a commanding 92% market share in AI training GPUs, with the upcoming B100/B200 Blackwell architecture poised to extend this lead. Our multi-factor analysis incorporating financial metrics, competitive moat assessment, and forward-looking demand projections yields a Strong Buy recommendation.',
    sections: [
      {
        title: 'Financial Analysis',
        content: 'Revenue CAGR of 126% over trailing 4 quarters. Gross margins expanded to 76.7% from 64.6% YoY, demonstrating exceptional pricing power. Free cash flow generation of $11.2B in Q4 alone provides significant capital allocation flexibility. R&D spending at 14.2% of revenue ensures continued technological leadership.',
        type: 'text',
      },
      {
        title: 'Competitive Moat',
        content: 'CUDA ecosystem lock-in with 4M+ developers represents the widest software moat in semiconductor history. Custom ASIC alternatives (Google TPU, AWS Trainium, AMD MI300X) collectively hold <8% of training workloads. Network effects from cuDNN, TensorRT, and NCCL libraries create multi-year switching costs estimated at $2-5M per enterprise customer.',
        type: 'text',
      },
      {
        title: 'Risk Factors',
        content: 'Key risks include: (1) US-China export restrictions limiting TAM by estimated $8-12B annually, (2) Customer concentration with top 5 hyperscalers representing 46% of data center revenue, (3) Potential demand normalization post-2025 as initial AI infrastructure buildout completes, (4) Regulatory scrutiny under proposed AI compute reporting requirements.',
        type: 'text',
      },
      {
        title: 'Valuation',
        content: 'Forward P/E of 32x on consensus 2025 EPS of $27.30 represents a discount to the stock\'s 5-year average forward P/E of 45x. Our DCF model using 25% terminal growth yields a fair value of $1,050, while our sum-of-parts analysis values the company at $980. We set our price target at $1,020 representing 16.5% upside.',
        type: 'text',
      },
    ],
    overallRating: 'strong_buy',
    targetPrice: 1020,
    currentPrice: 875.30,
    confidence: 92,
    riskLevel: 'medium',
  },
  {
    id: '2',
    title: 'Bitcoin: Macro-Cycle & On-Chain Positioning Report',
    asset: 'BTC',
    generatedAt: new Date(Date.now() - 1000 * 60 * 120),
    summary: 'Bitcoin is exhibiting strong accumulation patterns consistent with mid-cycle bull market behavior. On-chain metrics including MVRV ratio (2.1x), exchange reserve drawdown (-12% MTD), and long-term holder accumulation suggest continued upside potential toward $85K-95K within 6 months.',
    sections: [
      {
        title: 'On-Chain Analysis',
        content: 'Exchange reserves have declined to 2.3M BTC, the lowest since 2018, indicating strong holder conviction. The MVRV Z-Score at 2.1 is well below the cycle top threshold of 7+. Long-term holders (>155 days) have added 234K BTC in the past 30 days, while short-term holder supply ratio remains at a healthy 18.4%.',
        type: 'text',
      },
      {
        title: 'ETF Flow Analysis',
        content: 'Cumulative spot ETF inflows of $15.2B represent net buying pressure equivalent to 7.2 months of new BTC supply at current mining rates. BlackRock\'s IBIT alone holds 267K BTC ($18B AUM), making it the fastest-growing ETF launch in history. Estimated additional institutional demand pipeline: $25-40B over next 12 months.',
        type: 'text',
      },
      {
        title: 'Technical Structure',
        content: 'Price maintaining above both 50-day ($63,200) and 200-day ($52,800) moving averages. Weekly RSI at 62 provides room for continuation without overbought signals. Key support zone at $62K-64K with resistance at $69K (previous ATH) and $73K (Fibonacci extension). Volume profile shows strong value area between $58K-66K.',
        type: 'text',
      },
      {
        title: 'Halving Impact Model',
        content: 'Our supply-shock model incorporating historical halving cycles projects a price range of $85K-$120K within 12-18 months post-halving (April 2024). The model accounts for diminishing returns per cycle (currently projecting 3.2x from pre-halving price vs. 4.8x in 2020 and 12.4x in 2016).',
        type: 'text',
      },
    ],
    overallRating: 'buy',
    targetPrice: 92000,
    currentPrice: 67432.18,
    confidence: 78,
    riskLevel: 'high',
  },
];

const generateEquityCurve = (): { date: string; value: number }[] => {
  const data: { date: string; value: number }[] = [];
  let value = 100000;
  const startDate = new Date('2023-01-01');
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    value += (Math.random() - 0.42) * 800;
    value = Math.max(value, 70000);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
};

export const backtestResults: BacktestResult[] = [
  {
    strategy: 'AI Momentum + Sentiment Alpha',
    period: 'Jan 2023 — Dec 2023',
    totalReturn: 47.2,
    annualizedReturn: 47.2,
    sharpeRatio: 2.14,
    maxDrawdown: -12.8,
    winRate: 64.3,
    totalTrades: 284,
    profitFactor: 2.31,
    equityCurve: generateEquityCurve(),
    trades: [
      { date: '2023-01-15', type: 'buy', price: 142.50, quantity: 100, pnl: 1250, reasoning: 'Positive sentiment shift detected across 12 news sources. RSI oversold at 28. ML model confidence: 84%.' },
      { date: '2023-02-02', type: 'sell', price: 155.20, quantity: 100, pnl: 1270, reasoning: 'Target price reached. Sentiment deteriorating with 3 negative analyst revisions. Taking profit at +8.9%.' },
      { date: '2023-03-10', type: 'buy', price: 148.30, quantity: 150, pnl: 2175, reasoning: 'Support level held at $147. Volume spike of 2.3x average. Earnings estimate revisions positive.' },
      { date: '2023-04-22', type: 'sell', price: 162.80, quantity: 150, pnl: 2175, reasoning: 'Overbought conditions. RSI at 78. Sector rotation signals detected. Risk/reward no longer favorable.' },
      { date: '2023-06-15', type: 'buy', price: 175.40, quantity: 120, pnl: 3120, reasoning: 'Breakout above 200-day MA confirmed. AI model detects institutional accumulation pattern. Confidence: 91%.' },
      { date: '2023-08-01', type: 'sell', price: 201.40, quantity: 120, pnl: 3120, reasoning: 'Market-wide risk indicators elevated. VIX term structure inverted. Reducing exposure ahead of FOMC.' },
    ],
  },
  {
    strategy: 'Mean Reversion + NLP Signals',
    period: 'Jan 2023 — Dec 2023',
    totalReturn: 31.8,
    annualizedReturn: 31.8,
    sharpeRatio: 1.87,
    maxDrawdown: -8.4,
    winRate: 71.2,
    totalTrades: 156,
    profitFactor: 1.95,
    equityCurve: generateEquityCurve(),
    trades: [
      { date: '2023-02-10', type: 'buy', price: 234.50, quantity: 50, pnl: 875, reasoning: 'Price 2.1 std devs below 20-day VWAP. Contrarian NLP signal from earnings call analysis.' },
      { date: '2023-02-28', type: 'sell', price: 252.00, quantity: 50, pnl: 875, reasoning: 'Mean reversion target achieved. Price returned to VWAP. Risk-adjusted return exceeded threshold.' },
    ],
  },
];

export const tradeReasonings: TradeReasoning[] = [
  {
    id: '1',
    asset: 'NVDA',
    action: 'buy',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    reasoning: 'Multi-factor AI analysis identifies NVIDIA as having the highest alpha opportunity in the current market environment. The convergence of record earnings, expanding TAM in AI infrastructure, and technical breakout above the $850 resistance level creates a compelling entry point. Our RAG system analyzed 847 financial documents and identified a 92% correlation between current conditions and previous high-return entry points.',
    factors: [
      { name: 'Earnings Momentum', impact: 'positive', weight: 0.30, description: 'Q4 revenue beat by 7.2%. Forward guidance raised 15% above consensus.' },
      { name: 'Technical Breakout', impact: 'positive', weight: 0.25, description: 'Price broke above $850 resistance with 2.8x average volume. MACD bullish crossover confirmed.' },
      { name: 'Sentiment Analysis', impact: 'positive', weight: 0.20, description: 'NLP analysis of 234 analyst reports shows 89% positive sentiment. Social media mentions up 340% with 78% positive tone.' },
      { name: 'Macro Environment', impact: 'positive', weight: 0.15, description: 'Fed dovish pivot benefits growth stocks. Real rates declining. Dollar weakening supports multinational earnings.' },
      { name: 'Valuation', impact: 'neutral', weight: 0.10, description: 'Forward P/E of 32x is elevated but justified by 80%+ earnings growth. PEG ratio of 0.4 suggests undervaluation relative to growth.' },
    ],
    confidence: 92,
    expectedReturn: 16.5,
    timeHorizon: '3-6 months',
  },
  {
    id: '2',
    asset: 'TSLA',
    action: 'sell',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    reasoning: 'Deteriorating competitive position in China, the world\'s largest EV market, combined with margin pressure from price cuts creates a negative asymmetric risk/reward profile. Our time-series model projects continued market share erosion, while the agent-based analysis identifies 7 out of 10 risk factors as elevated.',
    factors: [
      { name: 'Market Share Decline', impact: 'negative', weight: 0.35, description: 'China market share fell from 10.2% to 7.8%. BYD surpassed Tesla in global EV deliveries.' },
      { name: 'Margin Compression', impact: 'negative', weight: 0.25, description: 'Automotive gross margins declined to 17.6% from 25.1% YoY due to aggressive pricing strategy.' },
      { name: 'Valuation Stretch', impact: 'negative', weight: 0.20, description: 'Trading at 62x forward earnings vs. sector average of 15x. Growth premium difficult to justify with decelerating delivery growth.' },
      { name: 'FSD Progress', impact: 'positive', weight: 0.12, description: 'Full Self-Driving V12 showing promising results. Potential revenue recognition of $2.4B in deferred FSD revenue.' },
      { name: 'Energy Business', impact: 'positive', weight: 0.08, description: 'Energy storage deployments grew 125% YoY. Megapack backlog extends to 2026.' },
    ],
    confidence: 68,
    expectedReturn: -18.2,
    timeHorizon: '3-6 months',
  },
  {
    id: '3',
    asset: 'BTC',
    action: 'buy',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    reasoning: 'Post-halving supply dynamics combined with unprecedented institutional demand via spot ETFs create a structurally bullish setup. Our on-chain analysis agent identified accumulation patterns matching 87% similarity to the 2020 pre-rally phase. The macro agent confirms favorable conditions with declining real yields and increasing M2 money supply.',
    factors: [
      { name: 'Supply Shock', impact: 'positive', weight: 0.30, description: 'Post-halving daily issuance reduced to 450 BTC. ETF daily demand averaging 4,500 BTC — 10x new supply.' },
      { name: 'Institutional Adoption', impact: 'positive', weight: 0.25, description: 'Cumulative ETF inflows of $15.2B. Major pension funds and endowments initiating 1-3% BTC allocations.' },
      { name: 'On-Chain Metrics', impact: 'positive', weight: 0.20, description: 'Exchange reserves at 5-year low. MVRV at 2.1x well below cycle top of 7x+. Long-term holder supply increasing.' },
      { name: 'Macro Tailwinds', impact: 'positive', weight: 0.15, description: 'Fed rate cuts imminent. Global liquidity cycle turning positive. BTC correlation with real yields at -0.72.' },
      { name: 'Regulatory Clarity', impact: 'neutral', weight: 0.10, description: 'ETF approval provides regulatory framework. Pending stablecoin legislation could further legitimize crypto markets.' },
    ],
    confidence: 78,
    expectedReturn: 36.4,
    timeHorizon: '6-12 months',
  },
];

export const riskMetrics: RiskMetric[] = [
  { name: 'Portfolio VaR (95%)', value: 3.2, maxValue: 10, status: 'safe', description: 'Maximum expected loss at 95% confidence over 1 day' },
  { name: 'Beta Exposure', value: 1.15, maxValue: 2, status: 'warning', description: 'Portfolio sensitivity to market movements' },
  { name: 'Concentration Risk', value: 42, maxValue: 100, status: 'warning', description: 'Top 3 positions as % of portfolio' },
  { name: 'Correlation Risk', value: 0.68, maxValue: 1, status: 'warning', description: 'Average pairwise correlation between holdings' },
  { name: 'Liquidity Score', value: 92, maxValue: 100, status: 'safe', description: 'Ability to exit positions within 24 hours' },
  { name: 'Volatility Index', value: 24.5, maxValue: 50, status: 'safe', description: 'Portfolio-weighted implied volatility' },
  { name: 'Drawdown Risk', value: 15.2, maxValue: 30, status: 'warning', description: 'Estimated max drawdown from current levels' },
  { name: 'Tail Risk Score', value: 7.8, maxValue: 10, status: 'danger', description: 'Probability of extreme loss event (>3 sigma)' },
];

export const agentLogs: AgentLog[] = [
  { id: '1', agent: 'News Crawler', action: 'Scraped 2,847 articles from 34 financial sources', timestamp: new Date(Date.now() - 1000 * 60 * 2), status: 'completed', details: 'Sources: Bloomberg, Reuters, CNBC, CoinDesk, The Block, WSJ, FT. Processed in 4.2s using parallel workers.' },
  { id: '2', agent: 'Sentiment Analyzer', action: 'Processed sentiment for 2,847 articles using FinBERT', timestamp: new Date(Date.now() - 1000 * 60 * 3), status: 'completed', details: 'Average sentiment: +0.23 (slightly bullish). 1,421 positive, 892 neutral, 534 negative. Cross-validated with GPT-4 on 10% sample — 94% agreement.' },
  { id: '3', agent: 'RAG Indexer', action: 'Updated vector store with 2,847 new embeddings', timestamp: new Date(Date.now() - 1000 * 60 * 4), status: 'completed', details: 'ChromaDB collection size: 142,384 documents. Using text-embedding-3-large (3072 dims). Chunk size: 512 tokens with 64 token overlap.' },
  { id: '4', agent: 'Price Predictor', action: 'Running LSTM + Transformer ensemble on 8 assets', timestamp: new Date(Date.now() - 1000 * 60 * 1), status: 'running', details: 'Ensemble of 3 LSTM (lookback: 60/120/240 days) + 2 Transformer models. Feature set: OHLCV, on-chain metrics, sentiment scores, macro indicators.' },
  { id: '5', agent: 'Risk Monitor', action: 'Updated VaR calculations across all positions', timestamp: new Date(Date.now() - 1000 * 60 * 5), status: 'completed', details: 'Monte Carlo simulation with 10,000 paths. Historical VaR, Parametric VaR, and Cornish-Fisher expansion all within acceptable bounds.' },
  { id: '6', agent: 'Report Generator', action: 'Generating comprehensive research report for NVDA', timestamp: new Date(Date.now() - 1000 * 60 * 1), status: 'running', details: 'RAG retrieval: 47 relevant documents. Using GPT-4 with structured output. Sections: Financial, Technical, Competitive, Valuation.' },
  { id: '7', agent: 'Backtest Engine', action: 'Completed walk-forward optimization for 3 strategies', timestamp: new Date(Date.now() - 1000 * 60 * 8), status: 'completed', details: 'Walk-forward: 6-month train, 1-month test, 12 iterations. Parameter space: 2,400 combinations. Best Sharpe: 2.14 (AI Momentum + Sentiment Alpha).' },
  { id: '8', agent: 'On-Chain Analyzer', action: 'Error connecting to Ethereum node', timestamp: new Date(Date.now() - 1000 * 60 * 6), status: 'error', details: 'RPC endpoint timeout after 30s. Failover to Alchemy backup node initiated. Retrying in 60s. Last successful sync: 2 minutes ago.' },
  { id: '9', agent: 'Trade Executor', action: 'Awaiting confirmation on 2 pending orders', timestamp: new Date(Date.now() - 1000 * 60 * 0.5), status: 'running', details: 'Order 1: BUY 50 NVDA @ $875.30 (limit). Order 2: SELL 200 TSLA @ $242.68 (market). Slippage estimate: 0.02%.' },
  { id: '10', agent: 'Portfolio Optimizer', action: 'Rebalancing recommendation generated', timestamp: new Date(Date.now() - 1000 * 60 * 7), status: 'completed', details: 'Mean-variance optimization suggests: Increase NVDA by 3.2%, Decrease TSLA by 5.1%, Add SOL position at 2.8% weight. Expected Sharpe improvement: +0.15.' },
];

export const portfolioAllocation = [
  { name: 'NVDA', value: 24.5, color: '#22c55e' },
  { name: 'AAPL', value: 18.2, color: '#3b82f6' },
  { name: 'BTC', value: 15.8, color: '#f59e0b' },
  { name: 'MSFT', value: 14.1, color: '#8b5cf6' },
  { name: 'ETH', value: 8.4, color: '#6366f1' },
  { name: 'SOL', value: 6.2, color: '#ec4899' },
  { name: 'AMZN', value: 7.6, color: '#14b8a6' },
  { name: 'TSLA', value: 5.2, color: '#ef4444' },
];

export const marketSentimentHistory = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  bullish: 45 + Math.random() * 30,
  bearish: 15 + Math.random() * 20,
  neutral: 20 + Math.random() * 15,
}));

export const performanceData = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000);
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    portfolio: 100000 + (i * 450) + (Math.random() - 0.4) * 2000,
    benchmark: 100000 + (i * 280) + (Math.random() - 0.45) * 1500,
  };
});
