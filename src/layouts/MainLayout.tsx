import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toast from '../components/Toast';
import Dashboard from '../components/Dashboard';
import NewsFeed from '../components/NewsFeed';
import ResearchReports from '../components/ResearchReports';
import Backtesting from '../components/Backtesting';
import TradeReasoning from '../components/TradeReasoning';
import AgentMonitor from '../components/AgentMonitor';
import type { TabId } from '../types';

interface MainLayoutProps {
  tab: TabId;
}

const headerConfig: Record<TabId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Command Center', subtitle: 'Real-time portfolio analytics, AI signals, and risk monitoring' },
  news: { title: 'AI News Intelligence', subtitle: 'RAG-powered news analysis with FinBERT sentiment scoring' },
  research: { title: 'Research Reports', subtitle: 'Auto-generated deep-dive analysis powered by multi-agent AI' },
  backtest: { title: 'Backtesting Engine', subtitle: 'Walk-forward strategy optimization with ML-driven signals' },
  reasoning: { title: 'AI Trade Reasoning', subtitle: 'Explainable AI decisions with transparent factor decomposition' },
  agents: { title: 'Agent Operations', subtitle: 'Monitor and control the autonomous multi-agent research pipeline' },
};

export default function MainLayout({ tab }: MainLayoutProps) {
  const header = headerConfig[tab];

  const renderContent = () => {
    switch (tab) {
      case 'dashboard': return <Dashboard />;
      case 'news': return <NewsFeed />;
      case 'research': return <ResearchReports />;
      case 'backtest': return <Backtesting />;
      case 'reasoning': return <TradeReasoning />;
      case 'agents': return <AgentMonitor />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#070a12] overflow-hidden">
      <Sidebar activeTab={tab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={header.title} subtitle={header.subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto animate-fade-in-up" key={tab}>
            {renderContent()}
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}
