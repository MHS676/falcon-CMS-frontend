const COLS = [
  { key: 'slNo', label: '#', width: 'w-10' },
  { key: 'airtelCode', label: 'Airtel Code', width: 'w-24' },
  { key: 'robiCode', label: 'Robi Code', width: 'w-24' },
  { key: 'siteType', label: 'Type', width: 'w-20' },
  { key: 'district', label: 'District', width: 'w-28' },
  { key: 'thana', label: 'Thana', width: 'w-28' },
  { key: 'address', label: 'Address', width: 'flex-1' },
  { key: 'serviceType', label: 'Service', width: 'w-28' },
  { key: 'persons', label: 'Guards', width: 'w-16' },
  { key: 'deploymentDate', label: 'Deployed', width: 'w-28' },
];

const SERVICE_COLORS = {
  '24 Hrs SG': 'bg-emerald-100 text-emerald-700',
  '12 Hrs SG': 'bg-blue-100 text-blue-700',
  '12 Hrs 2SG': 'bg-violet-100 text-violet-700',
};

export default function BtsTable({ data, meta, loading, page, onPageChange, selectedNode, onSelectNode }) {
  if (loading) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center h-full">
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm">Loading BTS data…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center border-b border-slate-100 px-4 py-2.5 shrink-0 bg-slate-50/50 min-w-max">
        {COLS.map((col) => (
          <div key={col.key} className={`${col.width} text-xs font-bold text-slate-400 uppercase tracking-wider pr-3 shrink-0`}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <div className="min-w-max h-full">
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">No records found.</div>
          ) : (
            data.map((row, i) => {
              const isSelected = selectedNode?.id === row.id;
            return (
            <div
              key={row.id}
              onClick={() => onSelectNode(row)}
              className={`flex items-start border-b border-slate-50 px-4 py-2.5 hover:bg-indigo-50/50 cursor-pointer transition-colors ${
                isSelected ? 'bg-indigo-50/80 border-l-4 border-l-indigo-500 pl-[12px]' : (i % 2 === 0 ? '' : 'bg-slate-50/40')
              }`}
            >
              <div className="w-10 shrink-0 text-xs text-slate-400 pr-3">{row.slNo}</div>
              <div className="w-24 shrink-0 pr-3">
                <span className={`text-xs font-mono font-medium ${isSelected ? 'text-indigo-600' : 'text-slate-600'}`}>
                  {row.airtelCode || '—'}
                </span>
              </div>
              <div className="w-24 shrink-0 pr-3">
                <span className="text-xs font-mono text-slate-500">{row.robiCode || '—'}</span>
              </div>
              <div className="w-20 shrink-0 pr-3">
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{row.siteType || '—'}</span>
              </div>
              <div className="w-28 shrink-0 pr-3 text-xs font-medium text-slate-700">{row.district || '—'}</div>
              <div className="w-28 shrink-0 pr-3 text-xs text-slate-500">{row.thana || '—'}</div>
              <div className="flex-1 pr-3 text-[11px] text-slate-500 leading-snug line-clamp-2">{row.address || '—'}</div>
              <div className="w-28 shrink-0 pr-3">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide border ${SERVICE_COLORS[row.serviceType] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {row.serviceType || '—'}
                </span>
              </div>
              <div className="w-16 shrink-0 pr-3 text-xs font-medium text-emerald-600 bg-emerald-50 px-1 rounded text-center shadow-sm border border-emerald-100 bg-opacity-70">
                {row.persons ?? '—'}
              </div>
              <div className="w-28 shrink-0 pl-3 text-xs text-slate-400">{row.deploymentDate || '—'}</div>
            </div>
            );
          })
        )}
        </div>
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between shrink-0 bg-slate-50/50">
          <span className="text-xs text-slate-400 font-medium">
            Page {page} of {meta.totalPages} · {meta.total.toLocaleString()} total
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹ Prev
            </button>
            {Array.from({ length: Math.min(meta.totalPages, 7) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                    p === page
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              disabled={page === meta.totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
