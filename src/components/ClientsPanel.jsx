import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchClients, fetchClientLocations } from '../api/clients';

// ── icons ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
);
const PersonIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M2.25 6.338c0-1.074.8-1.965 1.87-2.044a48.4 48.4 0 0116.76 0c1.07.079 1.87.97 1.87 2.044v10.324c0 1.074-.8 1.965-1.87 2.044a48.4 48.4 0 01-16.76 0c-1.07-.079-1.87-.97-1.87-2.044V6.338z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M3.75 21h16.5M4.5 3h15l.75 18H3.75L4.5 3zM9 3v18M15 3v18M9 9h.008M9 12h.008M9 15h.008M15 9h.008M15 12h.008M15 15h.008"/>
  </svg>
);

// ── detail view ───────────────────────────────────────────────────
function ClientDetail({ client, onBack, T }) {
  return (
    <motion.div className="flex flex-col h-full"
      initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>

      {/* Back bar */}
      <div className="px-4 py-3.5 shrink-0 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <button onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors group"
          style={{ color: T.textSecondary }}
          onMouseEnter={e => e.currentTarget.style.color = '#818cf8'}
          onMouseLeave={e => e.currentTarget.style.color = T.textSecondary}>
          <span className="transition-transform group-hover:-translate-x-0.5"><ArrowLeftIcon /></span>
          Back to list
        </button>
        <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }}>
          #{client.slNo}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {/* Hero */}
        <div className="relative rounded-xl p-4 overflow-hidden"
          style={{ background: T.heroGradient, border: `1px solid ${T.heroBorder}` }}>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
            style={{ background: 'rgba(99,102,241,0.08)' }} />
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)' }}>
              <span style={{ color: '#818cf8' }}><BuildingIcon /></span>
            </div>
            <h2 className="text-base font-extrabold leading-tight" style={{ color: T.textPrimary }}>{client.name}</h2>
            {client.location && (
              <div className="flex items-center gap-1.5 mt-2">
                <span style={{ color: '#818cf8' }}><MapPinIcon /></span>
                <span className="text-xs font-semibold" style={{ color: '#a5b4fc' }}>{client.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        {client.address && (
          <div className="rounded-xl p-3" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-[9px] font-bold uppercase tracking-wider mb-1.5" style={{ color: T.textMuted }}>Address</p>
            <p className="text-xs leading-relaxed" style={{ color: T.textSecondary }}>{client.address}</p>
          </div>
        )}

        {/* Contact */}
        {(client.contactPerson || client.contactNo) && (
          <div className="rounded-xl p-3 space-y-2.5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: T.textMuted }}>Contact</p>
            {client.contactPerson && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                  <span style={{ color: '#818cf8' }}><PersonIcon /></span>
                </div>
                <span className="text-xs font-semibold" style={{ color: T.textPrimary }}>{client.contactPerson}</span>
              </div>
            )}
            {client.contactNo && (
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.25)' }}>
                  <span style={{ color: '#34d399' }}><PhoneIcon /></span>
                </div>
                <a href={`tel:${client.contactNo}`} className="text-xs font-mono font-semibold"
                  style={{ color: '#34d399' }}>{client.contactNo}</a>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── list view ─────────────────────────────────────────────────────
function ClientList({ data, loading, meta, page, onPageChange, search, onSearch, location, locations, onLocation, onSelect, selectedId, T }) {
  return (
    <motion.div className="flex flex-col h-full"
      initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>

      {/* Search + filter */}
      <div className="px-4 pt-4 pb-3 space-y-2 shrink-0"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.textMuted }}><SearchIcon /></span>
          <input type="text" placeholder="Search client, address…"
            value={search} onChange={e => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl outline-none transition-all"
            style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputColor }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
            onBlur={e => e.target.style.borderColor = T.inputBorder} />
        </div>
        <select value={location} onChange={e => onLocation(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl outline-none transition-all"
          style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary }}>
          <option value="" style={{ background: T.selectBg }}>All Locations ({meta.total})</option>
          {locations.map(l => <option key={l} value={l} style={{ background: T.selectBg }}>{l}</option>)}
        </select>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {loading ? (
          <div className="flex items-center justify-center h-32 gap-2" style={{ color: T.textMuted }}>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            <span className="text-xs">Loading…</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-xs" style={{ color: T.textMuted }}>No results found.</div>
        ) : (
          <div>
            {data.map(client => {
              const isActive = selectedId === client.id;
              return (
                <button key={client.id} onClick={() => onSelect(client)}
                  className="w-full text-left px-4 py-3 flex items-start gap-3 transition-all"
                  style={{
                    borderBottom: `1px solid ${T.rowBorder}`,
                    background: isActive ? T.rowActive : 'transparent',
                    borderLeft: isActive ? '2px solid #818cf8' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = T.rowHover; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: isActive ? 'rgba(99,102,241,0.2)' : T.cardBg, border: `1px solid ${isActive ? 'rgba(99,102,241,0.35)' : T.cardBorder}` }}>
                    <span style={{ color: isActive ? '#818cf8' : T.textMuted }}><BuildingIcon /></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: isActive ? '#a5b4fc' : T.textPrimary }}>{client.name}</p>
                    {client.location && (
                      <p className="text-[10px] font-semibold mt-0.5" style={{ color: T.textSecondary }}>{client.location}</p>
                    )}
                    {client.address && (
                      <p className="text-[10px] mt-0.5 truncate" style={{ color: T.textMuted }}>{client.address}</p>
                    )}
                    {client.contactNo && (
                      <p className="text-[10px] font-mono mt-1" style={{ color: '#34d399' }}>{client.contactNo}</p>
                    )}
                  </div>
                  <svg width="12" height="12" className="mt-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: T.textMuted }}>
                    <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                  </svg>
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
              className="px-2.5 py-1 text-[10px] rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: T.paginBg, border: `1px solid ${T.paginBorder}`, color: T.paginColor }}>← Prev</button>
            <button disabled={page === meta.totalPages} onClick={() => onPageChange(page + 1)}
              className="px-2.5 py-1 text-[10px] rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: T.paginBg, border: `1px solid ${T.paginBorder}`, color: T.paginColor }}>Next →</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── main export ───────────────────────────────────────────────────
export default function ClientsPanel({ T, isDark, selectedClient, onSelectClient }) {
  const [data,      setData]      = useState([]);
  const [meta,      setMeta]      = useState({ total: 0, totalPages: 1 });
  const [locations, setLocations] = useState([]);
  const [search,    setSearch]    = useState('');
  const [location,  setLocation]  = useState('');
  const [page,      setPage]      = useState(1);
  const [loading,   setLoading]   = useState(true);

  const selected = selectedClient;
  const setSelected = onSelectClient;

  // load locations once
  useEffect(() => {
    fetchClientLocations().then(setLocations).catch(console.error);
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    fetchClients({ search, location, page, limit: 20 })
      .then(res => { setData(res.data); setMeta(res.meta); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, location, page]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Panel header */}
      <div className="px-4 py-3.5 shrink-0 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${T.sectionBorder}` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.35)', boxShadow: '0 0 10px rgba(52,211,153,0.2)' }}>
          <span style={{ color: '#34d399' }}><BuildingIcon /></span>
        </div>
        <div>
          <p className="text-xs font-bold leading-none" style={{ color: T.textPrimary }}>Client Directory</p>
          <p className="text-[9px] font-medium mt-0.5" style={{ color: T.textMuted }}>Falcon Security Clients</p>
        </div>
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}>
          {meta.total} clients
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {selected ? (
            <div key="detail" className="absolute inset-0">
              <ClientDetail client={selected} onBack={() => setSelected(null)} T={T} />
            </div>
          ) : (
            <div key="list" className="absolute inset-0">
              <ClientList
                data={data} loading={loading} meta={meta} page={page}
                onPageChange={p => setPage(p)}
                search={search} onSearch={v => { setSearch(v); setPage(1); }}
                location={location} locations={locations}
                onLocation={v => { setLocation(v); setPage(1); }}
                onSelect={setSelected} selectedId={selected?.id}
                T={T}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
