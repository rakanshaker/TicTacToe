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

const check_win = (arr, win_ar) => {
  for (let i = 0; i < win_ar.length; i++) {
    const win_condition = win_ar[i];
    if (is_subset(arr, win_ar[i])) {
      console.log("Is Subset");
      return true;
    } else {
      console.log("Not Subset");
    }
  }
  return false;
};

const is_subset = (arr, win_ar) => {
  let counter = 0;
  if (arr.length < win_ar.length) {
    console.log("Too Short");
    return false;
  } else {
    for (let i = 0; i < arr.length; i++) {
      for (let w_i = 0; w_i < win_ar.length; w_i++)
        if (arr[i] == win_ar[w_i]) {
          console.log(win_ar[w_i]);
          counter++;
          break;
        }
    }
    return counter == win_ar.length;
  }
};

const cells = document.querySelectorAll(".cell");
let array_x = [];
let array_y = [];
const restart_btn = document.getElementById("restart");

restart_btn.addEventListener("click", (event) => {
  cells.forEach((item) => {
    clear_cell_events(cells);
    item.innerHTML = "";
    turn = 1;
  });
  array_y = [];
  array_x = [];
  document.getElementById("status").innerHTML = "";
  setup_game(cells);
});

let turn = 1;

function win_game(player) {
  // log to screen you won
  document.getElementById("status").innerHTML = `${player} Wins`;
  // remove click events
  clear_cell_events(cells);
}

function clear_cell_events(cells) {
  cells.forEach((item) => {
    item.removeEventListener("click", handle_game);
  });
}

function handle_game(ev) {
  let item = ev.target;
  if (turn % 2 && item.innerHTML == "") {
    // push text into paragraph
    // node.appendChild(create_x);
    // //append item (each cell) with the paragraph containing "x"
    // item.appendChild(node);
    item.innerHTML = "X";
    array_x.push(parseInt(item.getAttribute("data-cell-index")));
    console.log(array_x);
    if (check_win(array_x, winning_conditions)) {
      win_game("Player X");
      return;
      //end_game function?
    }
  } else if (item.innerHTML == "") {
    item.innerHTML = "O";
    array_y.push(parseInt(item.getAttribute("data-cell-index")));
    console.log(array_y);
    if (check_win(array_y, winning_conditions)) {
      win_game("Player O");
      return;
    }
  }

  turn++;
  if (array_y.length + array_x.length == 9) {
    document.getElementById("status").innerHTML = "Draw!";
    clear_cell_events(cells);
  }
}

function setup_game(cells) {
  cells.forEach((item) => {
    item.addEventListener("click", handle_game);
  });
}

setup_game(cells);

// const cell_0 = document.getElementById("cell_0");
// cell_0.addEventListener("click", function(){
//     console.log("cell_0 clicked")
// });

//cells add html text to their respective divs
//reset clears the cells and starts the game over

//
