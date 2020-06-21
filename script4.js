//Variables
const squares = Array.from(document.querySelectorAll("#game_container div"));
const board = ["", "", "", "", "", "", "", "", ""];
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

let player = "X";
const game_container = document.getElementById("game_container");
const restart_btn = document.getElementById("restart");

//Functions
const handle_game = (ev) => {
  let ids = squares.findIndex(function (squares) {
    return squares === ev.target;
  });
  board[ids] = player;
  squares[ids].textcontent = player;
  player = player === "X" ? "O" : "X";
  console.log(board);
};
const render_dom = () => {};
//Event Listeners
game_container.addEventListener("click", handle_game);

//
