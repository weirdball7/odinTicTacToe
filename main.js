// This is the Gameboard module
//it is in charge of rendering and updating the board.
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", "", ]; 
    // ocupiedSpaces = [];


    const render = () => {
        console.log(gameboard);
        let boardHTML = ""; // board div; this is where the squares go
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
            return square;

        });
    };

    const getGameboard = () => {
        return gameboard;
    }

    const update = (index, value) => {
        // let squares = document.querySelectorAll(".square");
        gameboard[index] = value;
        render(); 
        // squares.forEach((square) => {
        //     square.addEventListener('click', Game.handleClick)
        // });
    }

    return {
        render,
        update, 
        getGameboard,
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};

const Game = (() => {
    let winnerDisplay = document.querySelector('#message');
    let ocupiedSpaces = [];
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const getOccupiedSpaces = () => {
        return ocupiedSpaces;
    }

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O"),
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        // players.forEach((player) => {
        //     console.log(player);
        // })
        Gameboard.render();
    };

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);

        // Access occupiedSpaces and Gameboard through Game module
        let occupiedSpaces = getOccupiedSpaces();
        let gameboard = Gameboard.getGameboard();
        if (gameboard[index] !== "") {
            return;
        }
        // Update the game board
        Gameboard.update(index, players[currentPlayerIndex].mark);

        if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            winnerDisplay.innerText = `${players[currentPlayerIndex].name} Won!`;
            restart();
            setTimeout(removeMessage, 1500);
            // winnerDisplay.innerText = "";
        }else if(checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            winnerDisplay.innerText = 'Its a Tie!';
            restart();          
            setTimeout(removeMessage, 1500);
        };
        // winnerDisplay.innerText = "";
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const removeMessage = () => {
        winnerDisplay.innerText = "";
    }

    const restart = () => {
        for (let i = 0; i < 9; i++){
            Gameboard.update(i, "");
        };
        Gameboard.render();
    };


    const checkForWin = (board) => {
        let winingConditions = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8]
        ];
        for(let i = 0; i < winingConditions.length; i++){
            const [a, b ,c] = winingConditions[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            };
            
        };
        return false;
    };

    
    const checkForTie = (board) => {
        return board.every(cell => cell !== "");
    };


    return {
        start,
        handleClick,
        restart,
        checkForWin,
        checkForTie,
    };
})();

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', () => {
    Game.restart();
});

const startButton = document.querySelector("#start");
startButton.addEventListener('click', () => {
    Game.start();  
});

