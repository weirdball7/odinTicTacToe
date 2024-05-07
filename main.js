// This is the Gameboard module
//it is in charge of rendering and updating the board.
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", "", ]; 
    // ocupiedSpaces = [];


    const render = () => {
        console.log(gameboard);
        let boardHTML = ""; // board div; this is where the squares go
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        });
    };

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
    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};

const Game = (() => {
    let ocupiedSpaces = [];
    let players = [];
    let currentPlayerIndex;
    let gameOver;



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

    const playRound = () => {

    };

    const handleClick = (event) => {
        
        let index = parseInt(event.target.id.split("-")[1]);
        ocupiedSpaces.unshift(index);
        console.log(ocupiedSpaces);
            


        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        return ocupiedSpaces;
    };

    return {
        start,
        handleClick,
    };
})();



const startButton = document.querySelector("#start");
startButton.addEventListener('click', () => {
    Game.start();  
});

