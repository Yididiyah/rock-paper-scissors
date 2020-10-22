// Connect the buttons to javascript and add event listeners
// Read values from their data attributes
// Call Playround function with the correct playerSelection from button click
// Add a div to display the results
// Display a running score and announce winner once one payer reaches 5 points
// Show restart button when the game ends
// Stop the buttons from increasing the score after the game ends
// TODO: Disable the buttons when the game is complete
// TODO: Fix issue on Computer image on github
let computerResult = 0
let playerResult = 0
let result;
let gameComplete =  false; 
const computerSelectedImg =  document.querySelector('img[data-who="Computer"]');
const playerSelectedImg =  document.querySelector('img[data-who="Player"]');
const resultDisplay = document.querySelector('.result');
const restartButton = document.createElement('button');
const buttons = document.querySelectorAll('.btn');

const optionsToChoose = ['rock', 'paper', 'scissors']
        function computerPlay(){
            return optionsToChoose[Math.floor(Math.random() * 3)];
        }
        function playRound(playerSelection, computerSelection){
             if(playerSelection.match(/Rock/i)   && computerSelection.match(/Paper/i)){
                 return 'You Lose! Paper beats Rock';
             } else if (playerSelection.match(/Rock/i) && computerSelection.match(/Scissors/i)) {
                 return 'You Win! Rock beat Scissors';
             } else if (playerSelection.match(/Paper/i) && computerSelection.match(/Rock/i)){
                 return 'You Win! Paper beats Rock';
             } else if (playerSelection.match(/Paper/i) && computerSelection.match(/Scissors/i)) {
                 return 'You Lose! Scissors beat Paper';
             } else if (playerSelection.match(/Scissors/i) && computerSelection.match(/Rock/i)) {
                return 'You Lose! Rock beats Scissors';
             } else if (playerSelection.match(/Scissors/i) && computerSelection.match(/Paper/i)) {
                return 'You Win! Scissors beat paper';
             } else if(playerSelection.toLowerCase() === computerSelection.toLowerCase() )  {
                 return 'It\'s a draw, try again.';
             }
        }

         

        function onButtonPress(playerSelection){
            // make the computer play
            const computerSelection = computerPlay();
            // Display Player and Computer Selection
            computerSelectedImg.src =`./img/${computerSelection}.png`;
            computerSelectedImg.style.visibility = 'visible';
            playerSelectedImg.src =`./img/${playerSelection}.png`;
            playerSelectedImg.style.visibility = 'visible';
            // update the scores
            result = playRound(playerSelection, computerSelection);

                if(result.includes('Win')){
                    playerResult+= 1;
                } else if (result.includes('Lose')){
                    computerResult += 1;
                }
            updateScore();

            if(playerResult === 5 || computerResult === 5){
                if(playerResult > computerResult){
                resultDisplay.textContent = 'You Win';
                    console.log('You Win!');
                } else if(computerResult > playerResult){
                resultDisplay.textContent = 'You Lose, computer wins.';
                    console.log('You Lose, computer wins.');
                } else {
                resultDisplay.textContent = 'No one wins, It\'s a draw.';
                    console.log('No one wins, It\'s a draw.');
                }
                if(!gameComplete){
                    restartButton.innerHTML = 'Restart';
                    restartButton.classList.add('restart');
                    resultDisplay.insertAdjacentElement('afterend', restartButton);
                    restartButton.addEventListener('click', restartGame);
                }
                gameComplete = true;
                buttons.forEach(button => button.disabled = true);
            }
        }
        function restartGame(){
            gameComplete = false;
            
            computerResult = 0;
            playerResult = 0;
            updateScore();
            
            computerSelectedImg.src = '';
            computerSelectedImg.style.visibility = 'hidden';
            playerSelectedImg.src = '';
            playerSelectedImg.style.visibility = 'hidden';
            
            resultDisplay.textContent = 'First to 5 wins!';
            restartButton.remove();

            buttons.forEach(button => button.disabled = false);
        }
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                onButtonPress(button.getAttribute('data-option'));
            });
        });
        

        function game(){

            updateScore();
            
        }
        function updateScore(){
            const computerScore = document.querySelector('h3[data-score="computer"]');
            computerScore.textContent = computerResult;
            const playerScore = document.querySelector('h3[data-score="player"]');
            playerScore.textContent = playerResult;
        }

        game();