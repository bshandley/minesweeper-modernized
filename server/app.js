const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your production domain
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Utility functions
const sortScores = (a, b) => {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
};

const validateScore = (name, score) => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required and must be a non-empty string' };
  }
  
  if (name.length > 20) {
    return { valid: false, error: 'Name must be 20 characters or less' };
  }
  
  if (!Number.isInteger(score) || score < 0 || score > 3600) {
    return { valid: false, error: 'Score must be a positive integer less than 3600' };
  }
  
  return { valid: true };
};

const ensureScoresFileExists = async () => {
  try {
    await fs.access(SCORES_FILE);
  } catch (error) {
    // File doesn't exist, create it with empty array
    await fs.writeFile(SCORES_FILE, JSON.stringify([]));
  }
};

const readScores = async () => {
  try {
    await ensureScoresFileExists();
    const data = await fs.readFile(SCORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading scores:', error);
    return [];
  }
};

const writeScores = async (scores) => {
  try {
    await fs.writeFile(SCORES_FILE, JSON.stringify(scores, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing scores:', error);
    return false;
  }
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/get-scores', async (req, res) => {
  try {
    const scores = await readScores();
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

app.post('/post-score', async (req, res) => {
  try {
    const { name, score } = req.body;
    
    // Validate input
    const validation = validateScore(name, score);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }
    
    // Read current scores
    const scores = await readScores();
    
    // Add new score
    scores.push({ 
      name: name.trim(), 
      score: parseInt(score),
      timestamp: new Date().toISOString()
    });
    
    // Sort and keep top 10
    scores.sort(sortScores);
    const topScores = scores.slice(0, 10);
    
    // Write back to file
    const success = await writeScores(topScores);
    
    if (success) {
      res.json({ success: true, scores: topScores });
    } else {
      res.status(500).json({ error: 'Failed to save score' });
    }
  } catch (error) {
    console.error('Error posting score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;
