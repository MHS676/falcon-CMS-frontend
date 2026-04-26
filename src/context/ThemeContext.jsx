import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('falcon_theme');
    return saved ? saved === 'dark' : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem('falcon_theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export const DARK = {
  bgBase:         '#020817',
  vignette:       'linear-gradient(to bottom, rgba(2,8,23,0.7) 0%, transparent 100%)',
  panelBg:        'rgba(8,15,35,0.92)',
  panelBorder:    'rgba(100,116,139,0.16)',
  panelShadow:    '0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
  statBg:         'rgba(10,18,40,0.88)',
  statBorder:     'rgba(100,116,139,0.18)',
  statShadow:     '0 4px 24px rgba(0,0,0,0.5)',
  inputBg:        'rgba(255,255,255,0.06)',
  inputBorder:    'rgba(100,116,139,0.2)',
  inputColor:     '#e2e8f0',
  selectBg:       '#0f172a',
  textPrimary:    '#e2e8f0',
  textSecondary:  '#64748b',
  textMuted:      '#475569',
  rowBorder:      'rgba(100,116,139,0.08)',
  rowHover:       'rgba(255,255,255,0.04)',
  rowActive:      'rgba(99,102,241,0.12)',
  cardBg:         'rgba(255,255,255,0.03)',
  cardBorder:     'rgba(100,116,139,0.15)',
  heroGradient:   'linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.2) 100%)',
  heroBorder:     'rgba(99,102,241,0.3)',
  sectionBorder:  'rgba(100,116,139,0.15)',
  liveIndicator:  'rgba(8,15,35,0.88)',
  mapTile:        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  logoGlow:       'rgba(99,102,241,0.18)',
  logoBorder:     '1px solid rgba(99,102,241,0.45)',
  logoShadow:     '0 0 16px rgba(99,102,241,0.4)',
  brandSubtitle:  '#475569',
  paginBg:        'rgba(255,255,255,0.06)',
  paginBorder:    'rgba(100,116,139,0.2)',
  paginColor:     '#94a3b8',
};

export const LIGHT = {
  bgBase:         '#e8edf5',
  vignette:       'linear-gradient(to bottom, rgba(220,228,240,0.85) 0%, transparent 100%)',
  panelBg:        'rgba(255,255,255,0.97)',
  panelBorder:    'rgba(148,163,184,0.35)',
  panelShadow:    '0 8px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
  statBg:         'rgba(255,255,255,0.96)',
  statBorder:     'rgba(148,163,184,0.3)',
  statShadow:     '0 4px 16px rgba(0,0,0,0.1)',
  inputBg:        'rgba(241,245,249,0.9)',
  inputBorder:    'rgba(148,163,184,0.35)',
  inputColor:     '#0f172a',
  selectBg:       '#ffffff',
  textPrimary:    '#0f172a',
  textSecondary:  '#475569',
  textMuted:      '#64748b',
  rowBorder:      'rgba(148,163,184,0.12)',
  rowHover:       'rgba(99,102,241,0.05)',
  rowActive:      'rgba(99,102,241,0.08)',
  cardBg:         'rgba(241,245,249,0.7)',
  cardBorder:     'rgba(148,163,184,0.2)',
  heroGradient:   'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 100%)',
  heroBorder:     'rgba(99,102,241,0.25)',
  sectionBorder:  'rgba(148,163,184,0.2)',
  liveIndicator:  'rgba(255,255,255,0.95)',
  mapTile:        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  logoGlow:       'rgba(99,102,241,0.1)',
  logoBorder:     '1px solid rgba(99,102,241,0.3)',
  logoShadow:     '0 0 12px rgba(99,102,241,0.2)',
  brandSubtitle:  '#64748b',
  paginBg:        'rgba(241,245,249,0.9)',
  paginBorder:    'rgba(148,163,184,0.3)',
  paginColor:     '#475569',
};
