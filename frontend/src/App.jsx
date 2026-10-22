import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/coffee';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchCoffees();
    fetchLeaderboard();
  }, []);

  const fetchCoffees = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCoffees(res.data);
    } catch (err) {
      console.error('Error fetching coffees:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/leaderboard`);
      setLeaderboard(res.data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  const handleVote = async (id) => {
    try {
      await axios.post(`${API_BASE}/${id}/vote`);
      fetchCoffees();
      fetchLeaderboard();
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>☕ Coffee Rating Application</h1>
      <p>Interactive voting application with live score updates using backend API persistence.</p>

      <section style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
        <h2>🏆 Top-Rated Leaderboard</h2>
        <ul>
          {leaderboard.map((item, index) => (
            <li key={item._id} style={{ marginBottom: '8px' }}>
              <strong>#{index + 1} {item.name}</strong> — {item.votes} Votes
            </li>
          ))}
        </ul>
      </section>

      <h2>Coffee Blends</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {coffees.map((coffee) => (
          <div key={coffee._id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff' }}>
            <h3>{coffee.name}</h3>
            <p>{coffee.description}</p>
            <p><strong>Votes:</strong> {coffee.votes}</p>
            <button 
              onClick={() => handleVote(coffee._id)}
              style={{ background: '#6f4e37', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}
            >
              👍 Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;