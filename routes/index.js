var express    = require('express');
var router     = express.Router();
var boardUtils = require('../utils/boardUtils');


/**
* GET home page.
*/

router.get('/', function(req, res) {
  var board = req.query.board;

  // Validate board
  if (boardUtils.validateBoard(board)) {
    // flip first occurrence of whitespace to o
    board = board.replace(' ', 'o');
    res.end(board);
  }
  else res.sendStatus(400);
});


module.exports = router;
