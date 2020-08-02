const router = require('express').Router();


// This healthcheck route returns a 2xx response
// when the server is healthy, else sends a 5xx
// response
router.route('/').get(async (req, res, next) => {
  try {
    res.send('200 - OK');
  } catch (error) {
    res.status(503).send('503 - SERVICE UNAVAILABLE');
  }
});

module.exports = router;