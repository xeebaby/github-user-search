const BASE_URL = "https://api.github.com";

export const fetchUsers = async ({ query, location, minRepos }) => {
  let searchQuery = query ? `${query}` : "";

  if (location) {
    searchQuery += ` location:${location}`;
  }

  if (minRepos) {
    searchQuery += ` repos:>=${minRepos}`;
  }

  const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(searchQuery)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.items;
};
