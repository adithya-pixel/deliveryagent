const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const DeliveryAgent = require('../models/DeliveryAgent');

// POST /api/agents/login
router.post('/login', async (req, res) => {
  const { agentId, password } = req.body;
  try {
    const agent = await DeliveryAgent.findOne({ agentId });

    if (!agent) {
      return res.status(401).json({ message: 'Agent ID not found' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      agent: {
        agentId: agent.agentId,
        name: agent.name,
        availability: agent.availability,
        vehicleType: agent.vehicleType,
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
