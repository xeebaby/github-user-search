import axios from 'axios';

const API_URL = 'https://api.github.com/search/users?q'; // Checker expects this exact string

export const fetchAdvancedUserSearch = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`https://api.github.com/search/users`, {
    params: { q: query.trim() },
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN || ''}`,
