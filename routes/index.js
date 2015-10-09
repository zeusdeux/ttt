var express    = require('express');
var router     = express.Router();
var boardUtils = require('../utils/boardUtils');


/**
* GET next tic tac toe move
*/

router.get('/', function(req, res) {
  var board = req.query.board;
  var randomWhiteSpaceIndex;

  // Validate board
  if (boardUtils.validateBoard(board)) {
    // get the index of a random white space on the board
    randomWhiteSpaceIndex = boardUtils.getRandomWhiteSpaceIndex(board);

    // flip the whitespace at `randomWhiteSpaceIndex` to o
    board = [].reduce.call(board, function(accumulator, currChar, index) {
      if (index === randomWhiteSpaceIndex) accumulator += 'o';
      else accumulator += currChar;
      return accumulator;
    }, '');

    res.end(board);
  }
  else res.sendStatus(400);
});


module.exports = router;
