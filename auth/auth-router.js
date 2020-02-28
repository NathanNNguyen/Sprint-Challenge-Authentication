const router = require('express').Router();
const bc = require('bcryptjs');

router.post('/register', async (req, res) => {
  const user = req.body;
  user.password = bc.hashSync(user.password, 10);
  try {

  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
