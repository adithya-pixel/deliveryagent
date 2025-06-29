require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const agentRoutes = require('./routes/agentRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/agents', agentRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
