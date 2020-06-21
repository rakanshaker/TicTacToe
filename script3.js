/*----------------constants---------------*/
const squares = Array.from(document.querySelectorAll("#game_container div"));
const messages = document.querySelector("h2");
const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*----------------app state---------------*/
let board;
let turn = "X";
let win;

/*----------cached element ref-----------*/
/*------------event listeners------------*/
document
  .getElementById("game_container")
  .addEventListener("click", handle_turn);

// document.getElementById("restart").addEventListener("click", reset_game);
/*----------------functions---------------*/

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  render();
}
init();

function render() {
  board.forEach(function (mark, index) {
    console.log(mark, index);
    squares[index].textContent = mark;
  });
  messages.textContent =
    win === `T`
      ? `That's a Tie`
      : win
      ? `${win} wins the game!`
      : `${turn}'s turn`;
}

function handle_turn(event) {
  let idx = squares.findIndex(function (square) {
    return square === event.target;
  });
  board[idx] = turn;
  turn = turn === "X" ? "O" : "X";
  win = get_winner();
  render();
}

function get_winner() {
  let winner = null;
  winning_conditions.forEach(function (combo, index) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    )
      winner = board[combo[0]];
  });
  return winner ? winner : board.includes("") ? null : "T";
}
