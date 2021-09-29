var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
  .then((user)=>res.json(user))
});

router.post()

module.exports = router;
