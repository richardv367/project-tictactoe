// TIC TAC TOE
// player factory
const playerFactory = (name, symbol) => {
    let score = 0;
    let minMaxPlayer;
    return {name, symbol, score, minMaxPlayer}
}

// console.log(player1);
// let player2;
// let players;
// Game initiate module
let game = (function(){
    const gameWindow = document.querySelector("#game-window");
    const optionBtns = document.querySelectorAll(".option-btn");
    const p1Score = document.querySelector("#player1-container");
    const opponentScore = document.querySelector("#opponent-container");
    const gameOverBtns = document.querySelectorAll(".game-over-btns");
    const playAgainBtn = document.querySelector("#play-again");
    const menuScreenBtn = document.querySelector("#menu-screen");
    let cpuMode;
    // const display = document.querySelector("#player-turn");
    optionBtns.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            console.log(btn.id);
            let players = initiate(btn.id);
        });
    })
    playAgainBtn.addEventListener("click", ()=>{
        gameBoard.resetBoard();
        gameWindow.classList.remove("p-events-none");
        gameOverBtns.forEach(btn => btn.classList.add("hidden"));
    })
    function initiate(mode){
        const introContainer = document.querySelector("#intro-container");
        const modeSelector = document.querySelector("#mode-selector");
        
        if (mode === "p2-mode"){
            opponentName = "Player 2";
            cpuMode = false;
        } else{
            opponentName = "CPU";
            game.cpuMode = true;
            // gameBoard.cpuPlay();
        }
        // set p2 name
        game.player2.name = opponentName;
        // gameBoard.p2 = game.player2.name;
        console.log("HERE: ", game.player2);
        console.log("p1 score: ", p1Score.children[0].textContent);
        opponentScore.children[0].textContent = player2.name;
        introContainer.classList.add("close");
        modeSelector.classList.add("hidden");
        gameWindow.classList.remove("hidden");
        // return player2;
        // console.log(player1, player2);
        gameBoard.gameStart();
    }
    function gameOver(winnerFound, turn){
        const display = document.querySelector("#player-turn");
        console.log("GAMe OVER FUNCTION")
        if(winnerFound === true){
                console.log("Winner is: ", turn);
                display.children[0].textContent = `Winner is ${turn}`;
                console.log(display);
                alert("There is a winner: " + turn);
                if (game.player1.name === turn){
                    game.player1.score += 1;
                    p1Score.children[1].children[0].textContent = game.player1.score;
                } else{
                    game.player2.score += 1;
                    opponentScore.children[1].children[0].textContent = game.player2.score;
                }
        }
        if (winnerFound === false){
            alert("This is a draw!");
            console.log("This is a draw!");
            display.children[0].textContent = `It's a draw!`;
        }
        gameOverBtns.forEach(btn => btn.classList.remove("hidden"));
        gameWindow.classList.add("p-events-none");

    }
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Not selected yet", "O");
    // console.log(player1, player2);
    return {player1, player2, gameOver, cpuMode, gameWindow};
})();
// console.log("Checking player access: ", game.player2);
// game board
let gameBoard = (function(){
    let p1;
    let p2;
    let p1Moves = [];
    let p2Moves = [];
    let maxWinCons = [];
    let availableMoves = [[0,null], [1,null], [2,null], [3,null], [4,null], [5,null], [6,null], [7,null], [8,null]];
    let turn;
    let turnState;
    // let player2;
    const p1Symbol = game.player1.symbol;
    const p2Symbol = game.player2.symbol;
    let winnerFound = false;
    const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]    
    ];
    const display = document.querySelector("#player-turn");
    const cells = document.querySelectorAll(".cell");

    const gameStart = function(){
        gameBoard.setRandomTurn();
        gameBoard.gameState = "HELLO WORLD";
        console.log("GAME STATE: ", gameBoard.gameState);
        cells.forEach((cell)=>{
            cell.addEventListener("click", (e)=>{
                markBoard(cell);
            });
        });
    }
    // CONTINUE CPU
    const cpuPlay = function(){
        // console.log("CPU TURN INFO: ", game.cpuMode, gameBoard.turn, gameBoard.p2);
        // while (game.cpuMode === true && gameBoard.turn === gameBoard.p2){}
        console.log("CPU TURN CPU PLAYING");
        cpuTurn();
        // turnChange(gameBoard.p1, p1Symbol);
    }
    const cpuTurn = function(){
        game.gameWindow.classList.add("p-events-none");
        let n, index, cpuMove;
        n = availableMoves.length;

        if (game.player2.minMaxPlayer === "max"){
            index = Math.floor(Math.random() * n);
            // console.log(index);
            cpuMove = availableMoves[index];
            // console.log("CPU MOVE: ",cpuMove);
            // console.log("CELLS LENGTH: ",cells.length);
            
        } else{
            console.log("CPU IS MIN");
            index = Math.floor(Math.random() * n);
            minMax(p1Moves);
        }
        for (i=0; i<cells.length; i++){
            // console.log("I AM LOOPING");
            // console.log("I AM LOOPING : ", cells[i].dataset.n);
            if(cells[i].dataset.n == cpuMove){
                // console.log("CPU MARKBOARD: ", cells[i]);
                markBoard(cells[i]);
                turnChange(gameBoard.p1, p1Symbol);
            }
        }
        // markBoard(index);
        game.gameWindow.classList.remove("p-events-none");
    }
    // CONTINUE HERE
    const minMax = function(pMoves){
        if (game.player2.minMaxPlayer === "max"){

        }
        if (game.player2.minMaxPlayer === "min"){
            if (pMoves.length === 1){
                console.log("minMax player1 moves: ", p1Moves);
                console.log("available moves: ", availableMoves);
                // console.log("winning combos: ", combinations);
                for (i=0; i<combinations.length; i++){
                    for(j=0; j<3; j++){

                    }
                }
            } else{
                console.log("minMax player1 moves: ", p1Moves);
            }
        }
    }
    const markBoard = function(cell){
        let childLen = cell.children.length;
        let markIndex = parseInt(cell.dataset.n);
        // console.log("CPU MODE? :", game.cpuMode);
        // console.log("CELL: ", cell);
        // console.log(combinations);
        // console.log(cell.dataset.n);
        // console.log("DISPLAY TEST: ", display.children[0].children[0].textContent);
        console.log(childLen);
        // console.log(turn);
        if(childLen === 0 && gameBoard.turn === gameBoard.p1){
            console.log("player 1 turn")
            console.log(gameBoard.turn);
            // console.log(players);
            // console.log(player1.symbol);
            insertMark(cell, p1Symbol);
            p1Moves = checkResult(p1Moves, markIndex);
            console.log(p1Moves);
            console.log("p1 moves: ", p1Moves);
            console.log("turn value: ", gameBoard.turn);
            if ( winnerFound === false){
                if (game.cpuMode === true){
                    turnChange(gameBoard.p2, p2Symbol);
                    cpuPlay();
                }else{
                    turnChange(gameBoard.p2, p2Symbol);
                }
            }
        } else if (childLen === 0 && gameBoard.turn === gameBoard.p2){
            console.log("player2 turn");
            console.log("turn value: ", gameBoard.turn);
            insertMark(cell, p2Symbol);
            p2Moves = checkResult(p2Moves, markIndex);
            console.log("p2 moves: ", p2Moves);
            if (winnerFound === false){
                turnChange(gameBoard.p1, p1Symbol);
            }
        } else{
            alert("this has been marked already");
            console.log("Player 2 name: ", gameBoard.p2, gameBoard.turn);
        }
    }
    const insertMark = function(cell, symbol){
        let mark = document.createElement("h2");
        mark.textContent = symbol;
        cell.appendChild(mark);
    }
    const setRandomTurn = function(){
        gameBoard.p1 = game.player1.name;
        gameBoard.p2 = game.player2.name;
        let randomNum = Math.random();
        if (randomNum >= 0.5){
            game.player1.minMaxPlayer = "max";
            game.player2.minMaxPlayer = "min";
            console.log("CURR_PLAYER OBJ CHECK: ", game.player1);
            turnChange(gameBoard.p1, p1Symbol);
        } else{
            game.player1.minMaxPlayer = "min";
            game.player2.minMaxPlayer = "max";
            console.log("CURR_PLAYER OBJ CHECK: ", game.player2);
            turnChange(gameBoard.p2, p2Symbol);
            if (game.cpuMode = true){
                cpuPlay();
            }
        }
        
        // console.log("Turn test: ", gameBoard.turn, turn);
        // console.log(display.children[0].children[0]);
        // display.children[0].children[0].textContent = gameBoard.turn;
    }
    const turnChange = function(pN, pSymbol){
        gameBoard.turn = pN;
        if (pN === gameBoard.p1){
            turnState = game.player1.minMaxPlayer;
            console.log("TURN STATE: ", turnState);
        } else {
            turnState = game.player2.minMaxPlayer;
            console.log("TURN STATE: ", turnState);
        }
        
        // console.log("NEW TURN VALUE: ", gameBoard.turn);
        if (winnerFound === false){
            display.children[0].children[0].textContent = gameBoard.turn + "\x20 \x20 \x20" + `(${pSymbol})`;
            // console.log("LINE159: ", display.children[0].children[0]);
        }
    }
    
    // CONTINUE HERE
    const checkResult = function(playerMoves, markIndex){
        playerMoves.push(markIndex);
        console.log("playerMoves length: ", playerMoves.length);
        a = availableMoves.findIndex( element => {
            if (element[0] === markIndex){
                return true;
            }
        });
        console.log("index a: ", a);
        availableMoves.splice(a, 1);
        console.log("REMOVED AVAILABLE MOVE: ", availableMoves);
        let playerMovesString = playerMoves.join("");
        // console.log("playerMovesString: ", playerMovesString);
        // console.log("testing: ", combinations[0][0]);
        for(i=0; i<8;i++){
            let pattern = `[${combinations[i][0]}, ${combinations[i][1]}, ${combinations[i][2]}]`;
            let re =  new RegExp(pattern, "g");
            let regexResult = playerMovesString.match(re);
            if(regexResult != null){
                // console.log("test: ", regexResult.length);
                if(regexResult.length === 3){
                    console.log("winning result: ", regexResult);
                    console.log("winning result: ", gameBoard.turn);
                    winnerFound = true;
                    game.gameOver(winnerFound, gameBoard.turn);
                    gameBoard.turn = "";
                }
                // CONTINUE HERE
                if (turnState === "max" && regexResult.length === 1){
                    maxWinCons.push(pattern);
                    console.log("PATTERN: ", pattern);
                    console.log("MAX WIN CONS: ", maxWinCons);
                }
                if (turnState === "max" && regexResult.length === 2){
                    console.log("PATTERN: ", pattern);
                    console.log("REGEX: ", regexResult);
                    let testNumber;
                    let patternIndex = pattern.find(element => element == regexResult[0]);
                    console.log("PATTERNINDEX: ", patternIndex);
                    console.log("MAX WIN CONS: ", maxWinCons);
                }
                }
            // console.log(pattern)
            // console.log(playerMovesString);
            // console.log("REGEX RESULT:", regexResult);
        }
        if (playerMoves.length === 5 && winnerFound === false){
            game.gameOver(winnerFound, turn);
        }
        return playerMoves;
    }
    // RESET BOARD FUNCTION
    const resetBoard = function(){
        p1Moves=[];
        p2Moves=[];
        availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        winnerFound = false;
        span = document.createElement("span");
        display.children[0].textContent = "Turn: ";
        display.children[0].append(span);
        cells.forEach(cell => {
            cell.innerHTML = "";
        })
        gameBoard.setRandomTurn();
    }
    // return object perhaps?
    return {p1, p2, turn, setRandomTurn, resetBoard, cpuTurn, gameStart};
})();

// scoreboard
let scoreBoard = (function(){
    
})();
