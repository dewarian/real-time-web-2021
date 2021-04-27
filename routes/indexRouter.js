const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', (request, result) => {
  return result.render('homepage');
});


module.exports = router;
