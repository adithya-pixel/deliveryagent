import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DeliveryAgentLogin.css';



const DeliveryAgentLogin = () => {
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agent, setAgent] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/agents/login', {
        agentId,
        password
      });
      setAgent(res.data.agent);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>🚚 Delivery Agent Login</h2>

        {agent ? (
          <div className="success-box">
            <h3>🎉 Welcome, {agent.name}!</h3>
            <p><strong>Agent ID:</strong> {agent.agentId}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Agent ID"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-msg">❌ {error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default DeliveryAgentLogin;
