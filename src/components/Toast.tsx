import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Toast() {
  const { notifications, markAsRead } = useAppStore();
  const [visibleToasts, setVisibleToasts] = useState<string[]>([]);

  useEffect(() => {
    const unreadNotifs = notifications.filter(n => !n.read).slice(0, 3);
    const newIds = unreadNotifs.map(n => n.id).filter(id => !visibleToasts.includes(id));
    
    if (newIds.length > 0) {
      setVisibleToasts(prev => [...prev, ...newIds]);
      
      // Auto-hide after 5 seconds
      newIds.forEach(id => {
        setTimeout(() => {
          setVisibleToasts(prev => prev.filter(i => i !== id));
          markAsRead(id);
        }, 5000);
      });
    }
  }, [notifications, markAsRead, visibleToasts]);

  const iconMap = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-red-400" />,
    warning: <AlertTriangle size={18} className="text-amber-400" />,
    info: <Info size={18} className="text-cyan-400" />,
  };

  const borderMap = {
    success: 'border-emerald-500/30',
    error: 'border-red-500/30',
    warning: 'border-amber-500/30',
    info: 'border-cyan-500/30',
  };

  const toastsToShow = notifications.filter(n => visibleToasts.includes(n.id));

  if (toastsToShow.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      {toastsToShow.map((notif) => (
        <div
          key={notif.id}
          className={`flex items-start gap-3 px-4 py-3 bg-[#0d1117]/95 backdrop-blur border ${borderMap[notif.type]} rounded-xl shadow-2xl animate-fade-in-up min-w-[300px] max-w-[400px]`}
        >
          {iconMap[notif.type]}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">{notif.title}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{notif.message}</p>
          </div>
          <button
            onClick={() => {
              setVisibleToasts(prev => prev.filter(id => id !== notif.id));
              markAsRead(notif.id);
            }}
            className="p-1 text-gray-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
