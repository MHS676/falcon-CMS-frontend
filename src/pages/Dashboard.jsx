import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, DARK, LIGHT } from '../context/ThemeContext';
import InfoPanel from '../components/InfoPanel';
import BangladeshMap from '../components/BangladeshMap';
import SiteFormModal from '../components/SiteFormModal';
import ClientsPanel from '../components/ClientsPanel';
import { fetchStats, fetchBts, fetchDistricts } from '../api/bts';
import { fetchAllClients } from '../api/clients';

const STAT_CARDS = [
  { key: 'totalSites',     label: 'Total Sites',    color: '#818cf8', glow: 'rgba(99,102,241,0.25)',  iconPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
  { key: 'totalPersons',   label: 'Guards On Duty', color: '#34d399', glow: 'rgba(16,185,129,0.25)',  iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
  { key: 'totalDistricts', label: 'Districts',      color: '#60a5fa', glow: 'rgba(59,130,246,0.25)',  iconPath: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z' },
  { key: 'activeSites',    label: '24-Hr Security', color: '#fbbf24', glow: 'rgba(245,158,11,0.25)',  iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function Dashboard() {
  const { isDark, toggle } = useTheme();
  const T = isDark ? DARK : LIGHT;

  const [apiStats,         setApiStats]         = useState(null);
  const [listData,         setListData]         = useState([]);
  const [mapData,          setMapData]          = useState([]);
  const [listMeta,         setListMeta]         = useState({ total: 0, totalPages: 1 });
  const [districts,        setDistricts]        = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [search,           setSearch]           = useState('');
  const [page,             setPage]             = useState(1);
  const [loading,          setLoading]          = useState(true);
  const [selectedSite,     setSelectedSite]     = useState(null);
  const [modalSite,        setModalSite]        = useState(null);
  const [showClients,      setShowClients]      = useState(false);
  const [clientMapData,    setClientMapData]    = useState([]);

  const toggleClients = useCallback(() => {
    setShowClients(p => {
      if (!p) fetchAllClients().then(setClientMapData).catch(console.error);
      else    setClientMapData([]);
      return !p;
    });
  }, []);

  const refreshMap = useCallback(() => {
    fetchStats().then(setApiStats).catch(console.error);
    fetchBts({ limit: 500 }).then(res => setMapData(res.data)).catch(console.error);
  }, []);

  const refreshList = useCallback(() => {
    setLoading(true);
    fetchBts({ district: selectedDistrict, search, page, limit: 20 })
      .then(res => { setListData(res.data); setListMeta(res.meta); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedDistrict, search, page]);

  const handleSaved = useCallback((site, action) => {
    setModalSite(null);
    refreshMap();
    refreshList();
    if (action !== 'delete') setSelectedSite(site);
    else setSelectedSite(null);
  }, [refreshMap, refreshList]);

  // One-time: fetch ALL records for map markers + stats + districts
  useEffect(() => {
    fetchDistricts().then(setDistricts).catch(console.error);
    refreshMap();
  }, [refreshMap]);

  // Paginated fetch for the list panel (20 per page)
  useEffect(() => { refreshList(); }, [refreshList]);

  const statValues = {
    totalSites:     apiStats?.totalSites     ?? '—',
    totalPersons:   apiStats?.totalPersons   ?? '—',
    totalDistricts: apiStats?.totalDistricts ?? '—',
    activeSites:    apiStats?.byServiceType?.find(s => s.type === '24 Hrs SG')?.count ?? '—',
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative transition-colors duration-300"
      style={{ background: T.bgBase }}>

      {/* Full-screen map */}
      <div className="absolute inset-0 z-0">
        <BangladeshMap data={showClients ? [] : mapData} clientData={clientMapData} selectedNode={selectedSite} onSelectNode={setSelectedSite} isDark={isDark} />
      </div>

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-36 z-[1] pointer-events-none"
        style={{ background: T.vignette }} />

      {/* Brand bar — top left */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: T.logoGlow, border: T.logoBorder, boxShadow: T.logoShadow }}>
          <svg className="w-4 h-4" fill="none" stroke="#818cf8" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight leading-none" style={{ color: T.textPrimary }}>Falcon Site Monitor</p>
          <p className="text-[10px] font-medium mt-0.5" style={{ color: T.brandSubtitle }}>Robi · Airtel BTS Network</p>
        </div>
      </div>

      {/* Stat cards + theme toggle — top right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5">
        {STAT_CARDS.map(({ key, label, color, glow, iconPath }) => (
          <div key={key} className="px-3.5 py-2.5 rounded-xl flex items-center gap-2.5"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              background: T.statBg, border: `1px solid ${T.statBorder}`, boxShadow: T.statShadow }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: glow, border: `1px solid ${color}40` }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-extrabold tabular-nums leading-none" style={{ color }}>{statValues[key]}</p>
              <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: T.textMuted }}>{label}</p>
            </div>
          </div>
        ))}

        {/* Clients toggle button */}
        <button
          onClick={toggleClients}
          className="flex items-center gap-1.5 px-3.5 h-9 rounded-xl text-xs font-bold transition-all"
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            background: showClients ? 'rgba(52,211,153,0.25)' : 'rgba(52,211,153,0.10)',
            border: `1px solid ${showClients ? 'rgba(52,211,153,0.6)' : 'rgba(52,211,153,0.3)'}`,
            boxShadow: showClients ? '0 0 12px rgba(52,211,153,0.3)' : 'none',
            color: '#34d399' }}
          title="Toggle Client Directory"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M3.75 21h16.5M4.5 3h15l.75 18H3.75L4.5 3zM9 3v18M15 3v18"/>
          </svg>
          Clients
        </button>

        {/* Add Site button */}
        <button
          onClick={() => setModalSite({})}
          className="flex items-center gap-1.5 px-3.5 h-9 rounded-xl text-xs font-bold transition-all"
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(99,102,241,0.20)', border: '1px solid rgba(99,102,241,0.55)',
            boxShadow: '0 0 12px rgba(99,102,241,0.3)', color: '#a5b4fc' }}
          title="Add New Site"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Site
        </button>

        {/* Theme toggle button */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            background: T.statBg, border: `1px solid ${T.statBorder}`, boxShadow: T.statShadow }}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
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
      </div>

      {/* Floating left panel — BTS Sites */}
      <AnimatePresence>
        {!showClients && (
          <motion.div
            key="sites-panel"
            initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-4 z-20 flex flex-col overflow-hidden"
            style={{ top: '72px', bottom: '16px', width: '380px',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              background: T.panelBg, border: `1px solid ${T.panelBorder}`,
              borderRadius: '16px', boxShadow: T.panelShadow }}>
        <InfoPanel
          data={listData}
          loading={loading}
          meta={listMeta}
          page={page}
          onPageChange={p => setPage(p)}
          selectedSite={selectedSite}
          onSelect={setSelectedSite}
          search={search}
          onSearchChange={v => { setSearch(v); setPage(1); }}
          district={selectedDistrict}
          districts={districts}
          onDistrictChange={v => { setSelectedDistrict(v); setPage(1); }}
          isDark={isDark}
          T={T}
          onEdit={site => setModalSite(site)}
        />
      </motion.div>
        )}
      </AnimatePresence>

      {/* Site form modal */}
      {modalSite !== null && (
        <SiteFormModal
          site={Object.keys(modalSite).length ? modalSite : null}
          isDark={isDark}
          T={T}
          onClose={() => setModalSite(null)}
          onSaved={handleSaved}
        />
      )}

      {/* Floating right panel — Client Directory */}
      <AnimatePresence>
        {showClients && (
          <motion.div
            key="clients-panel"
            initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-4 z-20 flex flex-col overflow-hidden"
            style={{ top: '72px', bottom: '52px', width: '360px',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              background: T.panelBg, border: `1px solid ${T.panelBorder}`,
              borderRadius: '16px', boxShadow: T.panelShadow }}>
            <ClientsPanel T={T} isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live indicator — bottom right */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          background: T.liveIndicator, border: `1px solid ${T.statBorder}` }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-xs font-semibold" style={{ color: T.textSecondary }}>
          {(apiStats?.totalSites ?? 0).toLocaleString()} sites live
        </span>
      </div>
    </div>
  );
}
