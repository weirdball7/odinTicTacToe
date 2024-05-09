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
    let winingConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    let ocupiedSpaces = [];
    let ocupiedSpacesX = [];
    let ocupiedSpacesO = [];
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


    const handleClick = (event) => {
        
        let index = parseInt(event.target.id.split("-")[1]);
        
        let gameboardIndex = Gameboard.getGameboard()[index]
        if(gameboardIndex !== "") {
            return;
        };

        if(index.innerHTML === "X"){
            ocupiedSpacesX.push(index);
            return ocupiedSpacesX;
        };
        console.log(ocupiedSpaces);
        console.log(ocupiedSpacesX);
            


        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        return ocupiedSpaces, index;
    };


    const checkForWin = () => {
        
        // for(i = 0; i< winingConditions.length; i++){
        //     for(j = 0; j<winingConditions[i].length; i++){
        //         const firstItem = winingConditions[i][0];

        //     };
        // };
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

