import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Shield, Brain, BarChart3, Bot, ArrowRight, CheckCircle2, Play } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: <Brain size={24} />,
      title: 'AI News Summarizer',
      description: 'RAG-powered analysis of 2,800+ daily articles with FinBERT sentiment scoring.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Risk Prediction Dashboard',
      description: 'Real-time VaR, correlation analysis, and tail risk monitoring.',
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Auto Research Reports',
      description: 'Generate comprehensive investment reports for any asset in seconds.',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Backtesting Engine',
      description: 'Walk-forward optimization with ML-driven signal generation.',
    },
    {
      icon: <Bot size={24} />,
      title: 'Multi-Agent AI',
      description: '10 autonomous agents working 24/7 on market research.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Trade Reasoning',
      description: 'Transparent, explainable AI decisions with factor decomposition.',
    },
  ];

  const stats = [
    { value: '142K+', label: 'Documents Indexed' },
    { value: '2,800+', label: 'Daily Articles' },
    { value: '10', label: 'AI Agents' },
    { value: '47.2%', label: 'YTD Return' },
  ];

  return (
    <div className="min-h-screen bg-[#070a12]">
      {/* Header */}
      <header className="border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AlphaEdge</h1>
              <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">AI Research</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400">Now with 10 Autonomous AI Agents</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Autonomous Stock & Crypto<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Research Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Harness the power of multi-agent AI systems for institutional-grade market analysis. 
            RAG-powered research, ML predictions, and autonomous trading insights — all in one platform.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/signup"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-gray-700/50 text-white text-lg font-medium rounded-xl hover:bg-white/10 transition-all">
              <Play size={20} />
              Watch Demo
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800/60 bg-[#0a0e1a]/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful AI-Driven Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to make data-driven investment decisions, powered by cutting-edge AI technology.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-[#0d1117] border border-gray-800/60 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Research?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of traders and investors using AlphaEdge AI to gain an edge in the markets.
          </p>
          <Link 
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-400">© 2024 AlphaEdge AI. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
