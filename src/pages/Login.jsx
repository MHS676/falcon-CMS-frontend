import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid credentials. Try admin@falcon.com / admin123');
  };

  const bg      = isDark ? '#020817' : '#f1f5f9';
  const panelBg = isDark ? 'linear-gradient(160deg,#0f172a 0%,#1e293b 100%)' : 'linear-gradient(160deg,#1e293b 0%,#334155 100%)';
  const formBg  = isDark ? '#0f172a' : '#ffffff';
  const inputCls = isDark
    ? 'w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition'
    : 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition shadow-sm';
  const labelColor = isDark ? '#94a3b8' : '#475569';
  const titleColor = isDark ? '#f1f5f9' : '#0f172a';
  const subtitleColor = isDark ? '#64748b' : '#64748b';

  return (
    <div className="min-h-screen flex transition-colors duration-300" style={{ background: bg }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] p-12 shrink-0"
        style={{ background: panelBg }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Falcon CMS</p>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Enterprise</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            Monitor your<br />BTS sites smarter.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A unified platform to track Robi &amp; Airtel BTS sites, monitor guards on duty,
            and manage your Bangladesh network — all in one command center.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            {['338 BTS sites across 47 districts', 'Real-time guard deployment tracking', 'Interactive dark-map command center'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-300 text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Falcon CMS. All rights reserved.</p>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Theme toggle */}
        <button onClick={toggle}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)' }}>
          {isDark ? (
            <svg className="w-4 h-4" fill="none" stroke="#fbbf24" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="#6366f1" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>

        <div className="w-full max-w-[380px]">
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6z" />
              </svg>
            </div>
            <span className="font-bold" style={{ color: titleColor }}>Falcon CMS</span>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: titleColor }}>Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: subtitleColor }}>Sign in to your dashboard to continue</p>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c-.866 1.5.217 3.374 1.948 3.374H4.75c-1.73 0-2.813-1.874-1.948-3.374L10.05 3.378c.866-1.5 3.032-1.5 3.898 0L21.303 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: labelColor }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="admin@falcon.com" className={inputCls} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: labelColor }}>Password</label>
                <button type="button" className="text-[11px] text-indigo-500 hover:text-indigo-400 font-medium transition">Forgot password?</button>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••" className={inputCls} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 px-4 text-white font-semibold rounded-xl text-sm transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 4px 20px rgba(99,102,241,.4)' }}>
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Signing in…</>
              ) : 'Sign In →'}
            </button>
          </form>

          <div className="mt-6 p-3.5 rounded-xl" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0' }}>
            <p className="text-xs text-center" style={{ color: subtitleColor }}>
              Demo: <span className="font-semibold" style={{ color: titleColor }}>admin@falcon.com</span>
              {' / '}
              <span className="font-semibold" style={{ color: titleColor }}>admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
