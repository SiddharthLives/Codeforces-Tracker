import axios from "axios";

const API_BASE = "https://codeforces.com/api";

// Cache to prevent excessive API calls
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchWithCache = async (url) => {
  const now = Date.now();
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await axios.get(url);
    if (response.data.status !== "OK") {
      throw new Error(response.data.comment || "API request failed");
    }
    cache.set(url, { data: response.data.result, timestamp: now });
    return response.data.result;
  } catch (error) {
    if (error.response?.data?.comment) {
      throw new Error(error.response.data.comment);
    }
    throw error;
  }
};

export const getUserInfo = async (handle) => {
  const url = `${API_BASE}/user.info?handles=${handle}`;
  const result = await fetchWithCache(url);
  return result[0]; // Returns single user object
};

export const getUserRating = async (handle) => {
  const url = `${API_BASE}/user.rating?handle=${handle}`;
  return await fetchWithCache(url);
};

export const getUserSubmissions = async (handle) => {
  const url = `${API_BASE}/user.status?handle=${handle}`;
  return await fetchWithCache(url);
};

export const getContestList = async () => {
  const url = `${API_BASE}/contest.list?gym=false`;
  const allContests = await fetchWithCache(url);
  // Filter to only show FINISHED contests
  return allContests.filter((contest) => contest.phase === "FINISHED");
};

export const getContestStandings = async (contestId, handle) => {
  const url = `${API_BASE}/contest.standings?contestId=${contestId}&handles=${handle}`;
  return await fetchWithCache(url);
};
