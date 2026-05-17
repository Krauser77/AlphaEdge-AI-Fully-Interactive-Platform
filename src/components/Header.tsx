import { Search, Bell, Settings, RefreshCw, LogOut, User, CheckCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { formatDistanceToNow } from 'date-fns';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { 
    searchQuery, setSearchQuery, searchResults,
    notifications, unreadCount, showNotifications, setShowNotifications,
    markAsRead, markAllAsRead, clearNotifications, addNotification
  } = useAppStore();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [setShowNotifications]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    addNotification({
      type: 'info',
      title: 'Data Refreshed',
      message: 'All market data has been updated.',
    });
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifTypeColors: Record<string, string> = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-cyan-500',
  };

  return (
    <header className="bg-[#0d1117]/80 backdrop-blur-xl border-b border-gray-800/60 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearch(true);
              }}
              onFocus={() => setShowSearch(true)}
              placeholder="Search assets, news..."
              className="bg-white/5 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 w-72 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">⌘K</kbd>
            
            {/* Search Results Dropdown */}
            {showSearch && searchQuery && (
              <div className="absolute top-full mt-2 w-96 bg-[#0d1117] border border-gray-800/60 rounded-xl shadow-2xl overflow-hidden">
                {searchResults.assets.length === 0 && searchResults.news.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500 text-center">No results found</div>
                ) : (
                  <>
                    {searchResults.assets.length > 0 && (
                      <div className="p-2">
                        <p className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Assets</p>
                        {searchResults.assets.slice(0, 3).map((asset) => (
                          <button
                            key={asset.id}
                            onClick={() => {
                              setShowSearch(false);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                              asset.type === 'crypto' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'
                            }`}>
                              {asset.symbol.slice(0, 2)}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-white">{asset.symbol}</p>
                              <p className="text-xs text-gray-500">{asset.name}</p>
                            </div>
                            <span className={`ml-auto text-sm font-medium ${asset.changePct24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                              {asset.changePct24h >= 0 ? '+' : ''}{asset.changePct24h.toFixed(2)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchResults.news.length > 0 && (
                      <div className="p-2 border-t border-gray-800/60">
                        <p className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">News</p>
                        {searchResults.news.slice(0, 2).map((news) => (
                          <button
                            key={news.id}
                            onClick={() => {
                              setShowSearch(false);
                              setSearchQuery('');
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <p className="text-sm text-white truncate">{news.title}</p>
                            <p className="text-xs text-gray-500">{news.source}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-white/5 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">{unreadCount}</span>
                </div>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-96 bg-[#0d1117] border border-gray-800/60 rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/60">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <CheckCheck size={12} />
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-gray-500 hover:text-gray-300"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`px-4 py-3 border-b border-gray-800/40 hover:bg-white/[0.02] cursor-pointer transition-colors ${
                          !notif.read ? 'bg-white/[0.01]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${notifTypeColors[notif.type]}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-white">{notif.title}</p>
                              {!notif.read && (
                                <span className="text-[10px] text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">NEW</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
                            <p className="text-[10px] text-gray-600 mt-1">
                              {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button 
            onClick={() => navigate('/settings')}
            className="p-2.5 rounded-xl bg-white/5 border border-gray-700/50 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Settings size={16} />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-xl bg-white/5 border border-gray-700/50 hover:bg-white/10 transition-all"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <span className="text-sm font-medium text-white">{user?.name?.split(' ')[0] || 'User'}</span>
            </button>
            
            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#0d1117] border border-gray-800/60 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-800/60">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <User size={16} />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <Settings size={16} />
                    Preferences
                  </button>
                  <hr className="my-2 border-gray-800/60" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
