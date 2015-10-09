/**
 * Combinations of indices that correspond to a win
 */

const WINNING = [
  /* horizontally */
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  /* vertically */
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  /* diagonally */
  [0, 4, 8],
  [2, 4, 6]
];

/**
 *  Returns true if it is indeed o's turn
 */

function isItOsTurn(board) {
  // capture 'o' and 'x' indices from the board
  var oxindices = [].reduce.call(board, function(prev, curr, i) {
    if ('o' === curr) prev[0].push(i);
    if ('x' === curr) prev[1].push(i);
    return prev;
  }, [[], []]);

  // has someone already won?
  for (var i = 0; i < WINNING.length; i++) {
    var winningMove = WINNING[i];
    var oWon = winningMove[0] === oxindices[0][0] && winningMove[1] === oxindices[0][1] && winningMove[2] === oxindices[0][2];
    var xWon = winningMove[0] === oxindices[1][0] && winningMove[1] === oxindices[1][1] && winningMove[2] === oxindices[1][2];

    if (oWon || xWon) return false;
  }

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
