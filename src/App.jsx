import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Hardcoded database
  const users = [
    { name: 'Alice', email: 'alice@example.com', password: 'password123' },
    { name: 'Bob', email: 'bob@example.com', password: 'password456' },
    { name: 'Charlie', email: 'charlie@example.com', password: 'password789' },
    { name: 'David', email: 'david@example.com', password: 'youfoundtheflag739' },
  ];

  const handleSearch = () => {
    // Simulate SQL injection vulnerability by checking for dangerous input
    if (query.includes("'") || query.includes("|| true")) {
      // If potentially dangerous input is detected, return all users
      setResults(users);
    } else {
      // Otherwise, filter users by name
      const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredUsers);
    }
  };

  return (
    <div>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Results:</h2>
      <ul>
        {results.length > 0 ? (
          results.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email} - {user.password}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
