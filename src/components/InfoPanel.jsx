import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, MapPin, Shield, Users, Phone, Calendar, Building2, ChevronRight, Search } from 'lucide-react';

const SERVICE_COLOR = {
  '24 Hrs SG':  { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.35)', text: '#34d399' },
  '12 Hrs SG':  { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.35)', text: '#818cf8' },
  '12 Hrs 2SG': { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.35)', text: '#a78bfa' },
};

function ServiceBadge({ type }) {
  const c = SERVICE_COLOR[type] || { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' };
  return (
    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
      {type || 'N/A'}
    </span>
  );
}

function PulsingDot({ type }) {
  const color = type === '24 Hrs SG' ? '#34d399' : type === '12 Hrs SG' ? '#818cf8' : '#a78bfa';
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
    </span>
  );
}

function DetailView({ site, onBack, onEdit, isDark, T }) {
  const guards = site.guardNames ? site.guardNames.split('\n').map(g => g.trim()).filter(Boolean) : [];
  const supervisors = site.inchargeNames ? site.inchargeNames.split('\n').map(s => s.trim()).filter(Boolean) : [];

  return (
    <motion.div className="flex flex-col h-full"
      initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <div className="px-4 py-3.5 flex items-center gap-2 shrink-0"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors group"
          style={{ color: T.textSecondary }}
          onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
          onMouseLeave={e => e.currentTarget.style.color = T.textSecondary}>
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to list
        </button>
        {onEdit && (
          <button onClick={() => onEdit(site)}
            className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all"
            style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', cursor: 'pointer' }}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.032 2.032 0 112.872 2.872L7.5 19.613l-4 1 1-4 12.362-12.126z" />
            </svg>
            Edit
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {/* Hero */}
        <div className="relative rounded-xl p-4 overflow-hidden"
          style={{ background: T.heroGradient, border: `1px solid ${T.heroBorder}` }}>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: 'rgba(139,92,246,0.06)' }} />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: '#818cf8' }}>Airtel / Robi Code</p>
                <h2 className="text-xl font-extrabold tracking-tight leading-none" style={{ color: T.textPrimary }}>{site.airtelCode || '—'}</h2>
                <p className="text-sm font-semibold mt-0.5" style={{ color: '#a78bfa' }}>{site.robiCode || '—'}</p>
              </div>
              <ServiceBadge type={site.serviceType} />
            </div>
            <div className="pt-3" style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.15)'}` }}>
              <div className="flex items-start gap-2">
                <MapPin size={12} className="mt-0.5 shrink-0" style={{ color: '#818cf8' }} />
                <div>
                  <p className="text-xs font-bold" style={{ color: T.textPrimary }}>{site.district}{site.thana ? ` · ${site.thana}` : ''}</p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: T.textSecondary }}>{site.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Site Type', value: site.siteType || '—', icon: Building2, color: '#60a5fa' },
            { label: 'Posts',     value: site.posts ?? '—',    icon: MapPin,    color: '#818cf8' },
            { label: 'Guards',    value: site.persons ?? '—',  icon: Users,     color: '#34d399' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl p-3 text-center"
              style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
              <Icon size={14} className="mx-auto mb-1" style={{ color }} />
              <p className="text-sm font-bold" style={{ color: T.textPrimary }}>{value}</p>
              <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: T.textMuted }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Vendor */}
        <div className="rounded-xl p-3 flex items-center gap-3"
          style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Shield size={14} style={{ color: '#818cf8' }} />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: T.textMuted }}>Security Vendor</p>
            <p className="text-xs font-semibold mt-0.5" style={{ color: T.textPrimary }}>{site.securityVendor || 'N/A'}</p>
          </div>
        </div>

        {/* Date */}
        {site.deploymentDate && (
          <div className="rounded-xl p-3 flex items-center gap-3"
            style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)' }}>
              <Calendar size={14} style={{ color: '#fbbf24' }} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: T.textMuted }}>Deployment Date</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: T.textPrimary }}>{site.deploymentDate}</p>
            </div>
          </div>
        )}

        {/* Guards */}
        {guards.length > 0 && (
          <div className="rounded-xl p-3" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-2.5" style={{ color: T.textMuted }}>On-Duty Guards</p>
            <div className="space-y-2">
              {guards.map((g, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <Phone size={10} style={{ color: '#34d399' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: T.textSecondary }}>{g}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supervisors */}
        {supervisors.length > 0 && (
          <div className="rounded-xl p-3" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-2.5" style={{ color: T.textMuted }}>Supervisor / Incharge</p>
            <div className="space-y-2">
              {supervisors.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                    <Shield size={10} style={{ color: '#818cf8' }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: T.textSecondary }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Remarks */}
        {site.remarks && (
          <div className="rounded-xl p-3"
            style={{ background: isDark ? 'rgba(251,191,36,0.07)' : 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: '#d97706' }}>Remarks</p>
            <p className="text-xs leading-relaxed" style={{ color: isDark ? '#d97706' : '#92400e' }}>{site.remarks}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ListView({ data, loading, meta, page, onPageChange, selectedSite, onSelect, search, onSearchChange, district, districts, onDistrictChange, isDark, T }) {
  return (
    <motion.div className="flex flex-col h-full"
      initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>

      {/* Search + filter */}
      <div className="px-4 pt-4 pb-3 space-y-2 shrink-0"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.textMuted }} />
          <input type="text" placeholder="Search code, address, district…"
            value={search} onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl outline-none transition-all"
            style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputColor }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
            onBlur={e => e.target.style.borderColor = T.inputBorder} />
        </div>
        <select value={district} onChange={e => onDistrictChange(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl outline-none transition-all"
          style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary }}>
          <option value="" style={{ background: T.selectBg }}>All Districts ({meta.total})</option>
          {districts.map(d => <option key={d} value={d} style={{ background: T.selectBg }}>{d}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="flex items-center justify-center h-32 gap-2" style={{ color: T.textMuted }}>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-xs">Loading…</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs" style={{ color: T.textMuted }}>No results found.</div>
        ) : (
          <div>
            {data.map(site => {
              const isActive = selectedSite?.id === site.id;
              return (
                <button key={site.id} onClick={() => onSelect(site)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 transition-all"
                  style={{
                    borderBottom: `1px solid ${T.rowBorder}`,
                    background: isActive ? T.rowActive : 'transparent',
                    borderLeft: isActive ? '2px solid #818cf8' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.rowHover; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                  <div className="mt-1 shrink-0"><PulsingDot type={site.serviceType} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold truncate" style={{ color: isActive ? '#a5b4fc' : T.textPrimary }}>
                        {site.airtelCode || site.robiCode || `BTS #${site.slNo}`}
                      </span>
                      <ServiceBadge type={site.serviceType} />
                    </div>
                    <p className="text-[10px] font-semibold mt-0.5" style={{ color: T.textSecondary }}>
                      {site.district}{site.thana ? ` · ${site.thana}` : ''}
                    </p>
                    <p className="text-[10px] mt-0.5 truncate leading-relaxed" style={{ color: T.textMuted }}>{site.address}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Users size={9} style={{ color: '#34d399' }} />
                      <span className="text-[9px] font-medium" style={{ color: T.textMuted }}>{site.persons ?? 0} on duty</span>
                    </div>
                  </div>
                  <ChevronRight size={12} className="mt-1 shrink-0" style={{ color: T.textMuted }} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && meta.totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between shrink-0"
          style={{ borderTop: `1px solid ${T.sectionBorder}` }}>
          <span className="text-[10px] font-medium" style={{ color: T.textMuted }}>
            Page {page} / {meta.totalPages}
          </span>
          <div className="flex gap-1.5">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
              className="px-2.5 py-1 text-[10px] rounded-lg font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: T.paginBg, border: `1px solid ${T.paginBorder}`, color: T.paginColor }}>← Prev</button>
            <button disabled={page === meta.totalPages} onClick={() => onPageChange(page + 1)}
              className="px-2.5 py-1 text-[10px] rounded-lg font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: T.paginBg, border: `1px solid ${T.paginBorder}`, color: T.paginColor }}>Next →</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function InfoPanel(props) {
  const { selectedSite, onSelect, isDark, T } = props;
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3.5 shrink-0 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', boxShadow: '0 0 10px rgba(99,102,241,0.25)' }}>
          <MapPin size={13} style={{ color: '#818cf8' }} />
        </div>
        <div>
          <p className="text-xs font-bold leading-none" style={{ color: T.textPrimary }}>Security Sites</p>
          <p className="text-[9px] font-medium mt-0.5" style={{ color: T.textMuted }}>Robi / Airtel BTS Network</p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {selectedSite ? (
            <div key="detail" className="absolute inset-0">
              <DetailView site={selectedSite} onBack={() => onSelect(null)} onEdit={props.onEdit} isDark={isDark} T={T} />
            </div>
          ) : (
            <div key="list" className="absolute inset-0">
              <ListView {...props} isDark={isDark} T={T} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
