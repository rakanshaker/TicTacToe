//Create Class based script with same logic from original js

class Game {
  constructor(players, view, gameRules) {
    this.players = players;
    this.gameRules = gameRules;
    this.view = view;
    this.view.onReset(this.resetGame.bind(this));
    this.turn_index = 0;
  }

  startGame() {
    this.view.onTableUpdate(this.onClickGame.bind(this));
  }

  //
  onClickGame(ev) {
    const player = this.getPlayer(this.players);
    const cell = ev.target;
    this.insertPlayerInCell(cell, player);
    if (this.hasPlayerWon()) {
      alert("YOU WONT LOSER ");
    }
  }

  hasPlayerWon(player_positions) {}

  // insert visually
  // update player position
  insertPlayerInCell(cell, player) {
    let index = parseInt(cell.getAttribute("data-cell-index"));
    cell.innerHTML = player.label; // visiually insert it
    player.cell_positions.push(index); // logically updated it
  }

  resetGame(cell) {
    console.log("reset");
    this.turn_index = 0;
    this.players = this.clearAllPlayerPositions(this.players);
    // clear our view tood
    cell.innerHTML = "";
    console.log(this.table_view);
  }

  clearAllPlayerPositions(players) {
    const clean_players_ar = [];
    for (let index in players) {
      const player = players[index];
      player.cell_positions = [];
      clean_players_ar.push(player);
    }
    return clean_players_ar;
  }

  getPlayer(players) {
    const player = players[this.turn_index];
    this.turn_index++;
    if (this.turn_index >= this.players.length) {
      this.turn_index = 0;
    }
    return player;
  }
}

class GameRules {
  constructor(winnning_condition, cell_count) {
    this.winnning_condition = winnning_condition;
    this.cell_count = cell_count;
  }

  hasPlayerWon(player) {
    if (this.isSubset(player.cell_positions, this.winning_conditions)) {
      return true;
    }
    return false;
  }
  isDraw(players) {
    let totalFilledCels = 0;
    for (let index in players) {
      const player = players[index];
      const player_cell_count = player.cell_positions.length;
      totalFilledCels += player_cell_count;
    }
    if (this.cell_count <= totalFilledCels) {
      return true;
    }
    return false;
  }
  isSubset(arr, win_ar) {
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
  }
}

class Player {
  constructor(label, name, cell_positions = []) {
    this.label = label;
    this.name = name;
    this.cell_positions = cell_positions;
  }
}

class View {
  constructor(table_div, reset_btn) {
    this.table_view = table_div;
    this.reset_button = reset_btn;
  }

  onTableUpdate(cb) {
    this.table_view.onclick = cb;
  }
  onReset(cb) {
    this.reset_button.onclick = cb;
  }
}

const game = new Game(
  [new Player("x", "moe"), new Player("o", "james")],
  new View(
    document.getElementById("game_container"),
    document.getElementById("restart")
  ),
  new GameRules(
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    9
  )
);

game.startGame();

// game itself big entity
// players
// winning condition
// turns
// takes a view and binds to logic
// table    => cells

// players => letters
//         =>  name
//         => positions
