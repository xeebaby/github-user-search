

const BASE_URL = 'https://api.github.com';

export const fetchAdvancedUserSearch = async (query, minRepos = 0, location = '') => {
  try {
    let searchQuery = `q=${encodeURIComponent(query)}`;
    if (minRepos > 0) searchQuery += `+repos:>=${minRepos}`;
    if (location) searchQuery += `+location:${encodeURIComponent(location)}`;

    const response = await fetch(`${BASE_URL}/search/users?${searchQuery}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching advanced user search:', error);
    throw error;
  }
};
export { fetchAdvancedUserSearch };
