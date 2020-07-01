//Create Class based script with same logic from original js

class Game {
  constructor(players, view) {
    this.players = players;
    this.view = view;
    this.turn_index = 0;
  }

  startGame() {
    this.view.onTableUpdate(this.onClickGame.bind(this));
  }

  onClickGame(ev) {
    const player = this.getPlayer(this.players);
    const cell = ev.target;
    cell.innerHTML = player.label;
  }

  insertPlayerInCell(player) {}

  setupGame() {
    this.turn_index = 0;
    // clear our view tood
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

class Player {
  constructor(label, name, cell_positions = []) {
    this.label = label;
    this.name = name;
    this.cell_positions = cell_positions;
  }
}

class Table {
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
  new Table(
    document.getElementById("game_container"),
    document.getElementById("restart")
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
