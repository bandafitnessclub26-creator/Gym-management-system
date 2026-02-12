import { Link, useLocation } from 'react-router-dom';
import { Home, Users, CreditCard, LayoutDashboard } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/payment/add', icon: CreditCard, label: 'Payment' },
  ];

  // Don't show on home and login screens
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-zinc-800 px-6 pb-6 pt-3">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                ${active 
                  ? 'bg-gradient-to-br from-[#39FF14] to-[#2ECC40] shadow-lg shadow-[#39FF14]/20' 
                  : 'bg-zinc-900'
                }
              `}>
                <Icon 
                  className={`w-5 h-5 ${active ? 'text-black' : 'text-zinc-400'}`}
                />
              </div>
              <span className={`text-xs ${active ? 'text-[#39FF14]' : 'text-zinc-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
