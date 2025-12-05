// https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe

let players = [];

// Factory : Can have multiple players
let createPlayer = (playerName, playerMark) => {
  let player = {
    playerName,
    playerMark,
  };
  players.push(player);
};

// Singleton Module : Only one instance of gameboard
let gameBoard = (() => {
  let cells = ["", "", "", "", "", "", "", "", ""];

  let getBoard = () => {
    return [...cells];
  };

  let setCell = (index, mark) => {
    if (index < 0 || index >= cells.length || cells[index] != "") {
      return false;
    }

    // Set mark
    cells[index] = mark;
    return true;
  };

  let getCell = (index) => {
    return cells[index];
  };

  let resetBoard = () => {
    cells = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    setCell,
    getCell,
    resetBoard,
  };
})();

// Singleton Module : Only one game controller
let gameController = ((player1, player2, gameBoard) => {
  if (!player1 || !player2) {
    throw new Error("Need 2 players");
  }
  if (!gameBoard) {
    throw new Error("Needs a gameboard instance");
  }

  const WIN_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let players = [player1, player2];
  let currIdx = 0;
  let gameOver = false;
  let winner = null;
  let winningLine = null;

  let getCurrentPlayer = () => {
    return players[currIdx];
  };

  let snapshotPlayer = (p) => {
    if (!p) return null;
  };

  let checkWinner = (board) => {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      const mark = board[a];

      if (mark !== "" && mark === board[b] && mark === board[c]) {
        return { mark, line };
      }
    }

    return null;
  };
})();
