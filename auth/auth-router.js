const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../database/model.js');

router.post('/register', async (req, res) => {
  const user = req.body;
  user.password = bc.hashSync(user.password, 10);
  try {
    const inserted = await Users.add(user);
    const token = generateToken(user);
    res.status(201).json({ user: inserted, token })
  }
  catch ({ name, message, stack, code }) {
    res.status(500).json({ name, message, stack, code })
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({ username })
    if (user && bc.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({
        message: `Welcome ${username}`,
        token
      })
    } else {
      res.status(401).json({ message: 'Invalid username or password' })
    }
  }
  catch ({ name, message, stack, code }) {
    res.status(500).json({ name, message, stack, code })
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
};

module.exports = router;
