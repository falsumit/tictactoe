/* 

Instructions:
1) 
    A) Store game board as an array inside an object --DONE
    B) Players also stored in objects --DONE
    C) An object to control the flow of the game

- Have a little (if any) global code as possible
- Keep everything within a module or factory
    - If you need one of something, use a module
    - If you need multiples, use factories

2) Write a JS function that will render the game array to the page

3) Build functions for players to add marks to spots on the board
    A) Tie it to the DOM
    B) Keep players from marking spots already taken

- Think about where each bit of logic should reside

4) Build logic that checks when the game is over

5) Add interface for:
    A) Player names
    B) Start/restart buttons
    C) "Congrats to the winner" display

6) OPTIONAL Computer opponent

- Start with random legal move
- Once that's achieved, make it smarter

*/

/* ----GAME BOARD---- */

const game = (function() {
    const board = [];
    const spaces = document.querySelectorAll('.space');
    for(let i = 0; i < spaces.length; i++) {
        board.push(spaces[i]);
    }

    return { board }
})();

console.log(game);

(function(gameBoard) {
    gameBoard = document.getElementById('game-board');
    gameBoard.style = 'visibility:hidden';
})();


/* ----USERS---- */

const users = (function () {
    const roster = [];

    return { roster }
})();

console.log(users);

(function() {
    const form = document.getElementById('start');
    form.addEventListener('submit', createUsers);
})();

function createUsers(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData.entries());
    const formName = formObj.name;

    function createUser(name) {
        const userName = name;
        let userScore = 0;
        let userFlow = 0;
        const getUserScore = () => userScore;
        const giveUserScore = () => userScore++;
    
        return { userName, userScore, userFlow, getUserScore, giveUserScore }
    }

    function createOp(name) {
        const opName = name;
        let opScore = 0;
        let opFlow = 0;
        const getOpScore = () => opScore;
        const giveOpScore = () => opScore++;
    
        return { opName, opScore, opFlow, getOpScore, giveOpScore }
    }

    const user = createUser(formName);
    const opponent = createOp('Opponent');

    users.roster.push(user, opponent);

    const form = document.getElementById('start');
    form.reset();
    form.style = 'display:none';

    const gameBoard = document.getElementById('game-board');
    gameBoard.style = 'visibility:visible';

    console.log(users.roster);
}

/* ----GAME LOGIC---- */

function selectSpace(choice) {
    choice = game.board[(Math.floor(Math.random() * game.board.length))];

    return choice
}

(function(opSpace) {
    opSpace = selectSpace();

    const opIco = 'O';

    opSpace.classList.toggle(opIco);
    opSpace.textContent = opIco;
})();

(function(spaces) {
    spaces = game.board
    const userIco = 'X';
    const opIco = 'O';

    for(let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', () => {
            if(spaces[i].classList.contains(opIco) || spaces[i].classList.contains(userIco)) {
                alert('That space is taken. Please choose another.');
            } else {
                spaces[i].classList.toggle(userIco);
                spaces[i].textContent = userIco;
            }
        })
    }
})();

// STILL NEED CPU LOGIC

/* ----GAME FLOW---- */

function win() {
    spaces = game.board;
    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];
}











/* ----OLD CODE---- */

// function selectSpace (choice) {
//     do {
//         choice = game.board[(Math.floor(Math.random() * game.board.length))];
//     } while (choice.textContent !== '');

//     // choice.textContent = 'O';
//     console.log(choice);

//     return choice
// }

// Game flow

// (function(spaces) {
//     spaces = game.board;
//     const userIco = 'X';
//     const opIco = 'O';

//     for(let i = 0; i < spaces.length; i++) {
//         spaces[i].addEventListener('click', () => {
//             if(spaces[i].textContent === '') {
//                 spaces[i].textContent = userIco;
//             }
//             selectSpace().textContent = opIco;
//         });
//     }
// })();