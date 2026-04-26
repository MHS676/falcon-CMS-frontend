export default function Topbar() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <header className="h-[60px] bg-white/80 backdrop-blur-sm border-b border-slate-200/80 flex items-center justify-between px-6 shrink-0 z-10">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400 font-medium">Dashboard</span>
        <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-semibold text-slate-700">BTS Security Database</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            Robi / Airtel BTS
          </div>
        </div>
        <div className="h-5 w-px bg-slate-200 hidden md:block" />
        <p className="text-[11px] text-slate-400 hidden lg:block font-medium">{today}</p>
        <button className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-slate-300 hover:text-slate-600 transition">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="hidden sm:inline">Search…</span>
        </button>
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
          <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-400 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
