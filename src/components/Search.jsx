// src/components/Search.jsx
import { useState } from 'react';
import { fetchAdvancedUserSearch as fetchUserData } from '../services/githubService';

const Search = () => {
  const [form, setForm] = useState({ username: '', location: '', repos: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResults([]);

    try {
      const data = await fetchUserData(form);
      setResults(data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub Advanced User Search</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="repos"
          placeholder="Min Repositories"
          value={form.repos}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Looks like something went wrong.</p>}

      <div className="grid gap-4">
        {results.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-lg font-semibold">{user.login}</h2>
                <a href={user.html_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
