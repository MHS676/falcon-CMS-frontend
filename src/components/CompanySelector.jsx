import { useState, useRef, useEffect } from 'react';
import { companies } from '../data/companies';

export default function CompanySelector({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-indigo-300 hover:bg-white transition shadow-sm"
      >
        <span className="flex items-center gap-2 truncate">
          {selected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="truncate font-medium">{selected.name}</span>
            </>
          ) : (
            <span className="text-slate-400">Choose a company…</span>
          )}
        </span>
        <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="max-h-56 overflow-y-auto">
            <button
              onClick={() => { onSelect(null); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-xs text-slate-400 hover:bg-slate-50 transition border-b border-slate-100 font-medium"
            >
              Clear selection
            </button>
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => { onSelect(c); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-3 hover:bg-slate-50 ${selected?.id === c.id ? 'bg-indigo-50/60' : ''}`}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-700 text-xs leading-tight truncate">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.industry}</p>
                </div>
                {selected?.id === c.id && (
                  <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
