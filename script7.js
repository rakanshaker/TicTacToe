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
        this.insertPlayerInCell(cell, player); // updated state visually and logically
        if (this.gameRules.hasPlayerWon(player)) {
            this.handleEndGame(player, true);
        }
        if (this.gameRules.isDraw(this.players)) {
            this.handleEndGame(player);
        }
    }

    handleEndGame(player, isWin = false) {
        if (!isWin) {
            this.view.setStatus(`Both Players Drew , No one Wins !!!! :(`);
        } else {
            // print that he won
            this.view.setStatus(`${player.name} Won the Game !!!!`);
        }
        // remove onclick of the table
        this.view.removeTableUpdate();
    }

    // insert visually
    // update player position
    insertPlayerInCell(cell, player) {
        let index = parseInt(cell.getAttribute('data-cell-index'));
        // no one put anything
        if (!cell.innerHTML) {
            this.view.setCellInTable(cell, player.label); // visiually insert it
            player.updatePosition(index);
        }
    }

    resetGame() {
        this.turn_index = 0;
        this.view.clearStatusText();
        this.clearAllPlayerPositions(this.players);
        // clear our view tood
        this.view.clearTable();
        this.startGame();
    }

    clearAllPlayerPositions(players) {
        for (let index in players) {
            const player = players[index];
            player.clearPositions();
        }
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
        if (this.checkWin(player.cell_positions, this.winnning_condition)) {
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

    checkWin(arr, win_ar) {
        for (let i = 0; i < win_ar.length; i++) {
            if (this.isSubset(arr, win_ar[i])) {
                console.log('Is Subset');
                return true;
            } else {
                console.log('Not Subset');
            }
        }
        return false;
    }
    isSubset(arr, win_ar) {
        let counter = 0;
        if (arr.length < win_ar.length) {
            console.log('Too Short');
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
    updatePosition(index_position) {
        this.cell_positions.push(index_position);
    }
    clearPositions() {
        this.cell_positions = [];
    }
}

class View {
    constructor(table_div, reset_btn, status_text) {
        this.table_view = table_div;
        this.reset_button = reset_btn;
        this.status_text = status_text;
    }

    onTableUpdate(cb) {
        this.table_view.onclick = cb;
    }

    clearTable() {
        const cells = this.table_view.children;
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.innerHTML = '';
        }
    }
    removeTableUpdate() {
        this.table_view.onclick = () => {};
    }
    onReset(cb) {
        this.reset_button.onclick = cb;
    }
    setStatus(label) {
        this.status_text.innerHTML = label;
    }
    clearStatusText() {
        this.status_text.innerHTML = '';
    }

    setCellInTable(cell, text) {
        cell.innerHTML = text;
    }
}

const game = new Game(
    [new Player('x', 'Moe'), new Player('o', 'James')],
    new View(
        document.getElementById('game_container'),
        document.getElementById('restart'),
        document.getElementById('status')
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
