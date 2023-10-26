/* 

Instructions:
1) 
    A) Store game board as an array inside an object
    B) Players also stored in objects
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

(function() {
    const game = {
        board: []
    }

    game.board.push('hello', 'world');
    console.log(game);
    return game
})();

function createUser(name) {
    const userName = name;
    let userScore = 0;
    const getUserScore = () => userScore;
    const giveUserScore = () => userScore++;

    return { userName, userScore, getUserScore, giveUserScore }
}

function createOp(name) {
    const opName = name;
    let opScore = 0;
    const getOpScore = () => opScore;
    const giveOpScore = () => opScore++;

    return { opName, opScore, getOpScore, giveOpScore }
}

(function() {
    const start = document.querySelector('button');
    start.addEventListener('click', (name) => {
        name = prompt('Enter your name');
        const newUser = createUser(name);
        const newOp = createOp('Opponent');
        console.log(`${newUser.userName}'s Score: ${newUser.userScore}`);
        console.log(`${newOp.opName}'s Score: ${newOp.opScore}`);
    });
})();

function selectSpace (choice) {
    const spaces = document.querySelectorAll('.space');

    do {
        choice = (Math.floor(Math.random() * spaces.length));
    } while (spaces[choice].textContent !== '');

    return choice
}

(function() {
    const spaces = document.querySelectorAll('.space');
    const userIco = 'X';
    const opIco = 'O';

    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', () => {
            if (spaces[i].textContent === '') {
                spaces[i].textContent = userIco;
            }
        });
    }

    selectSpace();
    spaces[selectSpace()].textContent = opIco;
    console.log(selectSpace());
})();