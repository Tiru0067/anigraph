/**
 * AniGraph API Client
 * Connects to the Express / CognoDB backend
 */

const API_BASE = "/api";

export const fetchStats = async () => {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error("Failed to fetch graph statistics");
  return res.json();
};

export const fetchAnimeList = async ({
  search = "",
  page = 1,
  limit = 20,
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  const res = await fetch(`${API_BASE}/anime?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch anime list");
  return res.json();
};

export const fetchAnimeById = async (id) => {
  const res = await fetch(`${API_BASE}/anime/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch anime #${id}`);
  return res.json();
};

export const fetchAnimeRecommendations = async (id, limit = 6) => {
  const res = await fetch(
    `${API_BASE}/anime/${id}/recommendations?limit=${limit}`,
  );
  if (!res.ok)
    throw new Error(`Failed to fetch recommendations for anime #${id}`);
  return res.json();
};
