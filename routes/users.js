const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const db = req.app.locals.db;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({ email, password: hashedPassword, name });
    res.status(201).json({ id, email, name });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  const user = await db('users').where({ email }).first();
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
