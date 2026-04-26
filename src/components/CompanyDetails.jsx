export default function CompanyDetails({ company }) {
  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-10 py-16">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-400">No company selected</p>
        <p className="text-xs text-slate-300 mt-1">Choose a company from the dropdown above</p>
      </div>
    );
  }

  return (
    <div className="px-1 pb-4 space-y-3">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center text-base font-bold text-indigo-500 shrink-0">
            {company.name.charAt(0)}
          </div>
          <span className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${company.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-500 border border-red-200'}`}>
            ● {company.status}
          </span>
        </div>
        <h2 className="text-sm font-bold text-slate-800 leading-tight">{company.name}</h2>
        <p className="text-xs text-indigo-500 font-medium mt-0.5">{company.industry}</p>
        <p className="text-xs text-slate-500 leading-relaxed mt-2">{company.description}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Employees', value: company.employees.toLocaleString(), color: 'from-blue-50 to-indigo-50', text: 'text-blue-600', border: 'border-blue-100' },
          { label: 'Revenue', value: company.revenue, color: 'from-emerald-50 to-teal-50', text: 'text-emerald-600', border: 'border-emerald-100' },
          { label: 'Founded', value: String(company.founded), color: 'from-amber-50 to-orange-50', text: 'text-amber-600', border: 'border-amber-100' },
          { label: 'CEO', value: company.ceo.split(' ')[0], color: 'from-violet-50 to-purple-50', text: 'text-violet-600', border: 'border-violet-100' },
        ].map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-xl p-3`}>
            <p className={`text-[10px] font-semibold uppercase tracking-wide ${s.text} mb-0.5`}>{s.label}</p>
            <p className="text-sm font-bold text-slate-700 truncate">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
        </div>
        <p className="text-xs font-medium text-slate-700">{company.address}</p>
        <p className="text-[10px] text-slate-400 mt-1 font-mono">{company.lat.toFixed(4)}°N · {company.lng.toFixed(4)}°E</p>
      </div>

      {/* Website */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Website</p>
        </div>
        <p className="text-xs font-medium text-indigo-500">{company.website}</p>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Key Contacts</p>
        <div className="space-y-2.5">
          {company.contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ background: i === 0 ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'linear-gradient(135deg,#0ea5e9,#6366f1)' }}
              >
                {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate leading-tight">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.role} · {c.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

