const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", "", ];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;

        
    };

    const update = (index, value) => {
        gameboard[index] = value;
        render();
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
        players.forEach((player) => {
            console.log(player);
        })
        Gameboard.render();
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener('click', handleClick)
        });
    };

    

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        Gameboard.update(index, players[currentPlayerIndex].mark);        
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

