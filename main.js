const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", "", ];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id=square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;
    };

    return {
        render,
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
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O"),
        ];
        Gameboard.render();
    };

    return {
        start,
    };
})();



const startButton = document.querySelector("#start");
startButton.addEventListener('click', () => {
    Game.start();  
});

