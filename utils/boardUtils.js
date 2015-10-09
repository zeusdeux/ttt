/**
*  Returns true if it is indeed o's turn
*/

function isItOsTurn(board) {
  // count no, of o's and x's
  var oxcounts = [].reduce.call(board, function(prev, curr) {
    if ('o' === curr) prev[0] += 1;
    if ('x' === curr) prev[1] += 1;
    return prev;
  }, [0, 0]);

  if (
    oxcounts[0] === oxcounts[1] ||
    (oxcounts[0] + 1) === oxcounts[1]
  ) return true;

  return false;
}

/**
* Returns true only if the board is valid
*/

function validateBoard(board) {
  // board should exist and have only 9 characters
  if (!board || 9 !== board.length) return false;

  // game should NOT be complete
  // board should still have atleast one whitespace
  if (board.indexOf(' ') < 0) return false;

  // valid characters are o, x or whitespace
  // Hardcoding length to 9 since we already asserted that it's 9
  // It also remove time taken to look up .length on board
  for (var i = 0; i < 9; i++) {
    var currentChar = board[i];

    if (
      currentChar !== 'o' &&
      currentChar !== 'x' &&
      currentChar !== ' '
    ) return false;
  }

  // if it isn't o's turn then it's a bad request
  if (!isItOsTurn(board)) return false;

  return true;
}

/**
* Return a random white space index from the given board
*/

function getRandomWhiteSpaceIndex(board) {
  // get a list of white space indices
  var whiteSpaceIndices = [].map.call(board, function(char, index) {
    if (' ' === char) return index;
    return -1;
  }).filter(function(wsIndex) {
    return -1 !== wsIndex;
  });

  return whiteSpaceIndices[~~(Math.random() * 10) % whiteSpaceIndices.length];
}

module.exports = {
  isItOsTurn: isItOsTurn,
  validateBoard: validateBoard,
  getRandomWhiteSpaceIndex: getRandomWhiteSpaceIndex
}
