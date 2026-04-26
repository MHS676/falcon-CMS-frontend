import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Save, Trash2, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { createBts, updateBts, deleteBts, fetchDistricts, fetchThanas } from '../api/bts';

const FIELD_STYLE = (T) => ({
  background: T.inputBg,
  border: `1px solid ${T.inputBorder}`,
  color: T.inputColor,
  borderRadius: 10,
  padding: '8px 12px',
  fontSize: 12,
  width: '100%',
  outline: 'none',
});

const SERVICE_TYPES = ['24 Hrs SG', '12 Hrs SG', '12 Hrs 2SG'];
const SITE_TYPES = ['GBT', 'RT', 'RTP', 'IBS', 'COW', 'Other'];
const VENDORS = ['Ansar VDP', 'BGSL', 'Homeland', 'Other'];

function PinMarker({ position, onMove }) {
  useMapEvents({
    click(e) { onMove(e.latlng); },
  });
  if (!position) return null;
  const icon = L.divIcon({
    html: `<div style="width:20px;height:20px;border-radius:50%;background:#f43f5e;border:3px solid #fff;box-shadow:0 0 0 2px #f43f5e,0 2px 8px rgba(0,0,0,0.4)"></div>`,
    className: '', iconSize: [20, 20], iconAnchor: [10, 10],
  });
  return <Marker position={position} icon={icon} />;
}

export default function SiteFormModal({ site, isDark, T, onClose, onSaved }) {
  const isEdit = !!site?.id;

  const empty = {
    airtelCode: '', robiCode: '', siteType: '', district: '', thana: '',
    address: '', securityVendor: '', serviceType: '', posts: '', persons: '',
    deploymentDate: '', guardNames: '', inchargeNames: '', remarks: '',
    latitude: '', longitude: '',
  };

  const [form, setForm] = useState(() =>
    isEdit ? { ...empty, ...Object.fromEntries(Object.entries(site).map(([k, v]) => [k, v ?? ''])) }
           : empty
  );
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas]       = useState([]);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [error, setError]         = useState('');
  const [tab, setTab]             = useState('basic'); // basic | location | staff
  const [pinPos, setPinPos]       = useState(
    site?.latitude && site?.longitude ? { lat: parseFloat(site.latitude), lng: parseFloat(site.longitude) } : null
  );

  useEffect(() => {
    fetchDistricts().then(setDistricts).catch(() => {});
  }, []);

  useEffect(() => {
    if (form.district) fetchThanas(form.district).then(setThanas).catch(() => {});
    else setThanas([]);
  }, [form.district]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePinMove = useCallback((latlng) => {
    setPinPos(latlng);
    set('latitude', latlng.lat.toFixed(6));
    set('longitude', latlng.lng.toFixed(6));
  }, []);

  const handleSave = async () => {
    if (!form.district) { setError('District is required'); return; }
    if (!form.serviceType) { setError('Service type is required'); return; }
    setError(''); setSaving(true);
    try {
      const payload = { ...form };
      if (pinPos) { payload.latitude = pinPos.lat; payload.longitude = pinPos.lng; }
      const saved = isEdit ? await updateBts(site.id, payload) : await createBts(payload);
      onSaved(saved, isEdit ? 'update' : 'create');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBts(site.id);
      onSaved(site, 'delete');
    } catch (e) {
      setError(e.message);
      setDeleting(false);
    }
  };

  const inputStyle = { ...FIELD_STYLE(T) };
  const labelStyle = { color: T.textMuted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 };
  const sectionStyle = { borderBottom: `1px solid ${T.sectionBorder}`, paddingBottom: 16, marginBottom: 16 };
  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)}
      style={{
        padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700,
        background: tab === id ? 'rgba(99,102,241,0.2)' : 'transparent',
        border: tab === id ? '1px solid rgba(99,102,241,0.4)' : `1px solid transparent`,
        color: tab === id ? '#818cf8' : T.textSecondary, cursor: 'pointer',
      }}>{label}</button>
  );

  const mapCenter = pinPos
    ? [pinPos.lat, pinPos.lng]
    : [23.685, 90.356];

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: T.panelBg, border: `1px solid ${T.panelBorder}`,
            borderRadius: 18, boxShadow: T.panelShadow,
            width: '100%', maxWidth: 560, maxHeight: '90vh',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>

          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.sectionBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={14} style={{ color: '#818cf8' }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, lineHeight: 1 }}>
                  {isEdit ? `Edit Site — ${site.airtelCode || site.robiCode || `#${site.id}`}` : 'Add New BTS Site'}
                </p>
                <p style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>
                  {isEdit ? 'Update site information' : 'Fill details and pin on map'}
                </p>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.panelBorder}`, color: T.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={14} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ padding: '10px 20px', display: 'flex', gap: 6, flexShrink: 0, borderBottom: `1px solid ${T.sectionBorder}` }}>
            {tabBtn('basic', '📋 Basic Info')}
            {tabBtn('location', '📍 Location & Map')}
            {tabBtn('staff', '👮 Staff & Notes')}
          </div>

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', scrollbarWidth: 'none' }}>

            {/* ── BASIC TAB ── */}
            {tab === 'basic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div><label style={labelStyle}>Airtel Code</label><input style={inputStyle} value={form.airtelCode} onChange={e => set('airtelCode', e.target.value)} placeholder="e.g. BG4520" /></div>
                  <div><label style={labelStyle}>Robi Code</label><input style={inputStyle} value={form.robiCode} onChange={e => set('robiCode', e.target.value)} placeholder="e.g. R-BG4520" /></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={labelStyle}>Service Type *</label>
                    <select style={{ ...inputStyle, background: T.selectBg }} value={form.serviceType} onChange={e => set('serviceType', e.target.value)}>
                      <option value="">Select…</option>
                      {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Site Type</label>
                    <select style={{ ...inputStyle, background: T.selectBg }} value={form.siteType} onChange={e => set('siteType', e.target.value)}>
                      <option value="">Select…</option>
                      {SITE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={labelStyle}>Security Vendor</label>
                    <select style={{ ...inputStyle, background: T.selectBg }} value={form.securityVendor} onChange={e => set('securityVendor', e.target.value)}>
                      <option value="">Select…</option>
                      {VENDORS.map(v => <option key={v} value={v}>{v}</option>)}
                      {form.securityVendor && !VENDORS.includes(form.securityVendor) && <option value={form.securityVendor}>{form.securityVendor}</option>}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Deployment Date</label><input style={inputStyle} value={form.deploymentDate} onChange={e => set('deploymentDate', e.target.value)} placeholder="e.g. 01-Jan-2024" /></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div><label style={labelStyle}>Posts</label><input type="number" min="0" style={inputStyle} value={form.posts} onChange={e => set('posts', e.target.value)} placeholder="0" /></div>
                  <div><label style={labelStyle}>Persons / Guards</label><input type="number" min="0" style={inputStyle} value={form.persons} onChange={e => set('persons', e.target.value)} placeholder="0" /></div>
                </div>
              </div>
            )}

            {/* ── LOCATION TAB ── */}
            {tab === 'location' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={labelStyle}>District *</label>
                    <select style={{ ...inputStyle, background: T.selectBg }} value={form.district} onChange={e => { set('district', e.target.value); set('thana', ''); }}>
                      <option value="">Select district…</option>
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Thana / Upazila</label>
                    <select style={{ ...inputStyle, background: T.selectBg }} value={form.thana} onChange={e => set('thana', e.target.value)} disabled={!form.district}>
                      <option value="">Select thana…</option>
                      {thanas.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Address</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Village, Bazar, Road…" />
                </div>

                <div>
                  <label style={{ ...labelStyle, marginBottom: 6 }}>Pin on Map <span style={{ color: T.textMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— click anywhere to set location</span></label>
                  <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${T.panelBorder}`, height: 220 }}>
                    <MapContainer center={mapCenter} zoom={pinPos ? 12 : 7}
                      style={{ height: '100%', width: '100%' }} zoomControl={true}>
                      <TileLayer url={tileUrl} attribution='&copy; CARTO' />
                      <PinMarker position={pinPos} onMove={handlePinMove} />
                    </MapContainer>
                  </div>
                  <p style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>
                    {pinPos ? `📍 ${parseFloat(pinPos.lat).toFixed(5)}, ${parseFloat(pinPos.lng).toFixed(5)}` : 'No pin set — site will use thana-level coordinates'}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div><label style={labelStyle}>Latitude</label><input type="number" step="0.000001" style={inputStyle} value={form.latitude} onChange={e => { set('latitude', e.target.value); if (e.target.value && form.longitude) setPinPos({ lat: parseFloat(e.target.value), lng: parseFloat(form.longitude) }); }} placeholder="23.6851" /></div>
                  <div><label style={labelStyle}>Longitude</label><input type="number" step="0.000001" style={inputStyle} value={form.longitude} onChange={e => { set('longitude', e.target.value); if (form.latitude && e.target.value) setPinPos({ lat: parseFloat(form.latitude), lng: parseFloat(e.target.value) }); }} placeholder="90.3563" /></div>
                </div>
              </div>
            )}

            {/* ── STAFF TAB ── */}
            {tab === 'staff' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Guard Names <span style={{ color: T.textMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(one per line)</span></label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} value={form.guardNames} onChange={e => set('guardNames', e.target.value)} placeholder={"Guard 1 Name, 01700000000\nGuard 2 Name, 01700000001"} />
                </div>
                <div>
                  <label style={labelStyle}>Incharge / Supervisor Names <span style={{ color: T.textMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(one per line)</span></label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} value={form.inchargeNames} onChange={e => set('inchargeNames', e.target.value)} placeholder={"Supervisor Name, 01800000000"} />
                </div>
                <div>
                  <label style={labelStyle}>Remarks</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.remarks} onChange={e => set('remarks', e.target.value)} placeholder="Any special notes…" />
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${T.sectionBorder}`, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 11 }}>
                <AlertTriangle size={12} /> {error}
              </div>
            )}

            {/* Delete confirmation */}
            {isEdit && confirmDel && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <AlertTriangle size={12} style={{ color: '#ef4444', flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#ef4444', flex: 1 }}>Delete this site permanently?</span>
                <button onClick={handleDelete} disabled={deleting}
                  style={{ padding: '4px 10px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                  {deleting ? '…' : 'Yes, Delete'}
                </button>
                <button onClick={() => setConfirmDel(false)}
                  style={{ padding: '4px 10px', borderRadius: 6, background: 'transparent', color: T.textSecondary, border: `1px solid ${T.panelBorder}`, fontSize: 11, cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              {isEdit && !confirmDel && (
                <button onClick={() => setConfirmDel(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  <Trash2 size={13} /> Delete
                </button>
              )}
              <button onClick={onClose}
                style={{ padding: '8px 16px', borderRadius: 10, background: 'transparent', border: `1px solid ${T.panelBorder}`, color: T.textSecondary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#7c3aed)', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1, boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                <Save size={13} /> {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Site'}
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
