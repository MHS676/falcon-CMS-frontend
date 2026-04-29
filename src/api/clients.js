const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/clients';

export const fetchClients = (params = {}) => {
  const q = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null).map(([k, v]) => [k, String(v)])
  ).toString();
  return fetch(`${BASE}${q ? '?' + q : ''}`).then(r => r.json());
};

export const fetchAllClients = () => fetch(`${BASE}/all`).then(r => r.json());
export const fetchClientLocations = () => fetch(`${BASE}/locations`).then(r => r.json());
export const fetchClientStats = () => fetch(`${BASE}/stats`).then(r => r.json());
