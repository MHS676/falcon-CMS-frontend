const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function fetchStats() {
  const res = await fetch(`${BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchBts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') query.set(k, v);
  });
  const res = await fetch(`${BASE}/bts?${query}`);
  if (!res.ok) throw new Error('Failed to fetch BTS records');
  return res.json();
}

export async function fetchBtsById(id) {
  const res = await fetch(`${BASE}/bts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch BTS record');
  return res.json();
}

export async function fetchDistricts() {
  const res = await fetch(`${BASE}/bts/districts`);
  if (!res.ok) throw new Error('Failed to fetch districts');
  return res.json();
}

export async function fetchThanas(district) {
  const res = await fetch(`${BASE}/bts/districts/${encodeURIComponent(district)}/thanas`);
  if (!res.ok) throw new Error('Failed to fetch thanas');
  return res.json();
}

export async function createBts(data) {
  const res = await fetch(`${BASE}/bts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create BTS record');
  return res.json();
}

export async function updateBts(id, data) {
  const res = await fetch(`${BASE}/bts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update BTS record');
  return res.json();
}

export async function deleteBts(id) {
  const res = await fetch(`${BASE}/bts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete BTS record');
  return res.json();
}
