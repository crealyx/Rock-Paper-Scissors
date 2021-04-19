


// initialization
let playerScore = 0;
let computerScore = 0;
let totalRound = 0;
let playerChoice = '';
let computerChoice = '';

// store elements in variables
const round = document.querySelector('.round')
const scores = document.querySelector('.scores')
const result = document.querySelector('.result')
const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const body = document.querySelector('body')
const playerChosen = document.querySelector('.img-chosen-player')
const compChosen = document.querySelector('.img-chosen-comp')
const userChoices = document.querySelector('.choice-wrapper')
const wastedDiv = document.querySelector('.wastedDiv')
const choices = Array.from(document.querySelectorAll('button'))

// gameplay
choices.forEach(choice => {
    round.textContent = `Round: 0`;
    result.textContent = 'Waiting for player to choose..';
    choice.addEventListener('click', () =>{
        choice == rock ? (playerChoice = 'rock', playerChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/rock.png'))
        : choice == paper ? (playerChoice = 'paper', playerChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/paper.png'))
        : (playerChoice = 'scissors', playerChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/sciss.png'));
        let gameResult = game();
        totalRound++
        round.textContent = `Round: ${totalRound}`;
        scores.textContent = `${playerScore}:${computerScore}`;
        result.textContent = `${gameResult}`;

    })
});


// randomly generate a number, then return it as the computer's choice
function computerPlay(){
    let x = Math.floor(Math.random() * 3) + 1;
    x === 1 ? (computerChoice = 'rock', compChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/rock.png'))
    : x === 2 ? (computerChoice = 'paper', compChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/paper.png'))
    : (computerChoice = 'scissors', compChosen.setAttribute('src','/Rock-Paper-Scissors/imgs/sciss.png'));
    return computerChoice

}

// play one round check if anyone reached 5 score then return the result
function game(){
    let roundResult = playRound(playerChoice, computerPlay());
    if(playerScore === 5){
        resetGame();
        return `CONGRATULATIONS! YOU WON THE GAME!`;
    }
    else if(computerScore === 5){
        resetGame();
        return `YOU SUCK, COMPUTER WON THE GAME`;
    }
    else if(playerScore === 5 && computerScore === 5){
        resetGame();
        return `DRAAAWWW`;
    }
    return roundResult;
}

// compare player's choice and computer's choice according to rock paper scissors rules, return the result
function playRound(playerChoice, computerChoice){
    let n = playerChoice.localeCompare(computerChoice);
    r = 'rock';
    p = 'paper';
    s = 'scissors';

    if(playerChoice === r && computerChoice === s)
    {
        playerScore++
        Result = 'You win this round! Rock beats Scissors';
    }
    else if(playerChoice === s && computerChoice === p)
    {
        playerScore++
        Result = 'You win this round! Scissors beats Paper';
    }
    else if(playerChoice === p && computerChoice === r )
    {
        playerScore++
        Result = 'You win this round! Paper beats Rock';
    }
    else if(n === 0)
    {
        Result = 'Draw';
    }
    else{
        computerScore++
        Result = 'You lost the round';
    }
    return Result;
}

// remove choices and add play again button, play winner or loser audio
function resetGame(){
    userChoices.textContent = '';
    if(computerScore === 5){
        let audio = new Audio('/Rock-Paper-Scissors/imgs/wastedSound.mp3');
        audio.play();
        const wasted = document.createElement('img');
        wasted.classList.add('wasted');
        wasted.setAttribute('src','/Rock-Paper-Scissors/imgs/wasted.png');
        wastedDiv.append(wasted);
    }
    if(playerScore === 5){
        let audio = new Audio('/Rock-Paper-Scissors/imgs/victorySound.mp3');
        audio.volume = 0.5;
        audio.play();
    }
    const button = document.createElement('button');
    body.append(button);
    button.textContent = 'PLAY AGAIN';
    button.classList.add('reset');
    button.addEventListener('click', () => {
        location.reload();
        return false;
    })
}