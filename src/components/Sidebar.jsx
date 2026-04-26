import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  {
    group: 'Overview',
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        ),
      },
      {
        label: 'Companies',
        path: '/dashboard',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
        ),
        badge: '5',
      },
      {
        label: 'Map View',
        path: '/dashboard',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-10.498l4.875 2.437c.381.19.622.58.622 1.006V19.5a.75.75 0 01-.75.75H4.75a.75.75 0 01-.75-.75V7.125c0-.426.24-.816.622-1.006l4.875-2.437a1.5 1.5 0 011.256 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: 'Analytics',
    items: [
      {
        label: 'Analytics',
        path: '#',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        ),
        soon: true,
      },
      {
        label: 'Reports',
        path: '#',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        ),
        soon: true,
      },
      {
        label: 'Team',
        path: '#',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        ),
        soon: true,
      },
    ],
  },
  {
    group: 'Settings',
    items: [
      {
        label: 'Settings',
        path: '#',
        icon: (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        soon: true,
      },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`relative flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out select-none ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
      style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e293b 100%)' }}
    >
      <div className="absolute inset-y-0 right-0 w-px bg-white/5" />
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 h-[60px] border-b border-white/5 shrink-0 ${collapsed ? 'justify-center' : ''}`}>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6z" />
          </svg>
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white tracking-tight">Falcon CMS</p>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">Enterprise</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-slate-600 hover:text-white transition shrink-0 ml-auto"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />}
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navItems.map((group) => (
          <div key={group.group}>
            {!collapsed
              ? <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.15em] px-3 mb-1">{group.group}</p>
              : <div className="h-px bg-white/5 mx-1 mb-2" />
            }
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.path && item.path !== '#';
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => !item.soon && navigate(item.path)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-2.5 rounded-xl text-left transition-all duration-150 group relative
                        ${collapsed ? 'justify-center p-2' : 'px-3 py-2'}
                        ${active ? 'text-white' : item.soon ? 'text-slate-700 cursor-default' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                      style={active ? {
                        background: 'linear-gradient(135deg,rgba(99,102,241,.22),rgba(139,92,246,.12))',
                        border: '1px solid rgba(99,102,241,.18)',
                      } : {}}
                    >
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-indigo-400" />
                      )}
                      <span className={active ? 'text-indigo-300' : item.soon ? 'text-slate-700' : 'text-slate-600 group-hover:text-slate-300 transition'}>
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                      )}

                      {!collapsed && item.badge && (
                        <span className="text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}

                      {!collapsed && item.soon && (
                        <span className="text-[9px] font-semibold text-slate-600 border border-slate-700/60 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          Soon
                        </span>
                      )}


                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>



      {/* User profile */}
      <div className="p-2 border-t border-white/5 shrink-0">
        {!collapsed ? (
          <div className="group flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition cursor-default">
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate leading-tight">{user?.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-700 hover:text-red-400 hover:bg-red-500/10 transition opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              title={user?.name}
            >
              {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-700 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
