import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Palette, Database, CreditCard, Save, Loader2, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';

export default function Settings() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addNotification } = useAppStore();
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  
  // Settings state
  const [settings, setSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    notifications: {
      priceAlerts: true,
      newsDigest: true,
      reportReady: true,
      riskWarnings: true,
      weeklyDigest: false,
    },
    appearance: {
      theme: 'dark',
      compactMode: false,
      animations: true,
    },
    trading: {
      riskTolerance: 'moderate',
      autoTrade: false,
      paperTrading: true,
      maxPositionSize: 10,
    },
    api: {
      enableAPI: false,
      rateLimit: 100,
    },
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    setSaved(true);
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your preferences have been updated successfully.',
    });
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'trading', label: 'Trading', icon: <Shield size={18} /> },
    { id: 'api', label: 'API Access', icon: <Database size={18} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#070a12]">
      {/* Header */}
      <header className="bg-[#0d1117]/80 backdrop-blur-xl border-b border-gray-800/60 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl bg-white/5 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Settings</h1>
              <p className="text-sm text-gray-500">Manage your account preferences</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <Check size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 shrink-0">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-[#0d1117] border border-gray-800/60 rounded-2xl p-6">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                    {settings.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white/5 border border-gray-700/50 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="w-full bg-white/5 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-white/5 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <select className="w-full bg-white/5 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50">
                    <option value="utc">UTC</option>
                    <option value="est">Eastern Time (EST)</option>
                    <option value="pst">Pacific Time (PST)</option>
                    <option value="gmt">GMT</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                      <div>
                        <p className="text-sm font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-xs text-gray-500">Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                      </div>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, [key]: !value }
                        })}
                        className={`w-12 h-6 rounded-full transition-all ${value ? 'bg-emerald-500' : 'bg-gray-700'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-all ${value ? 'ml-6' : 'ml-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Appearance</h2>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Theme</label>
                  <div className="flex gap-3">
                    {['dark', 'light', 'system'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme } })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                          settings.appearance.theme === theme
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-gray-400 border border-gray-700/50 hover:bg-white/10'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                    <div>
                      <p className="text-sm font-medium text-white">Compact Mode</p>
                      <p className="text-xs text-gray-500">Reduce spacing and padding</p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, compactMode: !settings.appearance.compactMode }
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${settings.appearance.compactMode ? 'bg-emerald-500' : 'bg-gray-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${settings.appearance.compactMode ? 'ml-6' : 'ml-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                    <div>
                      <p className="text-sm font-medium text-white">Animations</p>
                      <p className="text-xs text-gray-500">Enable UI animations and transitions</p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, animations: !settings.appearance.animations }
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${settings.appearance.animations ? 'bg-emerald-500' : 'bg-gray-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${settings.appearance.animations ? 'ml-6' : 'ml-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'trading' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Trading Settings</h2>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Risk Tolerance</label>
                  <div className="flex gap-3">
                    {['conservative', 'moderate', 'aggressive'].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setSettings({ ...settings, trading: { ...settings.trading, riskTolerance: risk } })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                          settings.trading.riskTolerance === risk
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-gray-400 border border-gray-700/50 hover:bg-white/10'
                        }`}
                      >
                        {risk}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Position Size (%)</label>
                  <input
                    type="number"
                    value={settings.trading.maxPositionSize}
                    onChange={(e) => setSettings({ ...settings, trading: { ...settings.trading, maxPositionSize: Number(e.target.value) } })}
                    className="w-32 bg-white/5 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                    <div>
                      <p className="text-sm font-medium text-white">Paper Trading Mode</p>
                      <p className="text-xs text-gray-500">Simulate trades without real money</p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        trading: { ...settings.trading, paperTrading: !settings.trading.paperTrading }
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${settings.trading.paperTrading ? 'bg-emerald-500' : 'bg-gray-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${settings.trading.paperTrading ? 'ml-6' : 'ml-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                    <div>
                      <p className="text-sm font-medium text-white">Auto Trading</p>
                      <p className="text-xs text-amber-400">⚠️ Automatically execute AI recommendations</p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        trading: { ...settings.trading, autoTrade: !settings.trading.autoTrade }
                      })}
                      className={`w-12 h-6 rounded-full transition-all ${settings.trading.autoTrade ? 'bg-amber-500' : 'bg-gray-700'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${settings.trading.autoTrade ? 'ml-6' : 'ml-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">API Access</h2>
                
                <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                  <p className="text-sm text-cyan-400 mb-2">🔑 API Key</p>
                  <code className="text-xs text-gray-400 bg-black/30 px-3 py-2 rounded-lg block">
                    ae_live_••••••••••••••••••••••••
                  </code>
                  <button className="mt-3 text-xs text-cyan-400 hover:text-cyan-300">Regenerate Key</button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                  <div>
                    <p className="text-sm font-medium text-white">Enable API Access</p>
                    <p className="text-xs text-gray-500">Allow external applications to access your data</p>
                  </div>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      api: { ...settings.api, enableAPI: !settings.api.enableAPI }
                    })}
                    className={`w-12 h-6 rounded-full transition-all ${settings.api.enableAPI ? 'bg-emerald-500' : 'bg-gray-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${settings.api.enableAPI ? 'ml-6' : 'ml-0.5'}`} />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Rate Limit (requests/min)</label>
                  <input
                    type="number"
                    value={settings.api.rateLimit}
                    onChange={(e) => setSettings({ ...settings, api: { ...settings.api, rateLimit: Number(e.target.value) } })}
                    className="w-32 bg-white/5 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            )}

            {activeSection === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Billing & Subscription</h2>
                
                <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Current Plan</p>
                      <p className="text-2xl font-bold text-white">Pro</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">$49/month • Renews on Feb 1, 2025</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 border border-gray-700/50 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all">
                      Change Plan
                    </button>
                    <button className="px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-all">
                      Cancel Subscription
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-gray-800/40">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm text-white">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/26</p>
                    </div>
                    <button className="ml-auto text-xs text-emerald-400 hover:text-emerald-300">Update</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
