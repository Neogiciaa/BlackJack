const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function pickBankScore() {
  return Math.floor(Math.random() * (21 - 16 + 1)) + 16;
}

function pickPlayerCard(){
  return Math.floor(Math.random() * (11 - 1 + 1)) + 1;
}

function stateOfTheGame(player_score, bank_score){
  return `Bank's score is: ${bank_score}, player's score is: ${player_score}`;
}

function endGameMessage(player_score, bank_score){
  if (player_score === 21) {
    return "Black Jack";
  }

  if (player_score > 21) {
    return 'lose';
  }

  if (player_score > bank_score) {
    return 'win';
  } else if (player_score < bank_score) {
    return `lose`;
  } else if (player_score === bank_score) {
    return 'push';
  }
}

function askForName() {
  rl.question("Hello, how should i call you ? \n>", (answer) => {
    name = answer;
    console.log(`Great welcome to our casino ${ name }`);
  });
}

function askForCard(player_score, bank_score) {
  rl.question('Card? "y" or "n" to get a new card\n> ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      const newCard = pickPlayerCard();
      player_score += newCard;
      console.log(`You picked a card: ${newCard}. Your current score is now ${player_score}`);

      if (player_score > 21) {
        console.log(endGameMessage(player_score, bank_score));
        rl.close();
      } else {
        console.log(stateOfTheGame(player_score, bank_score));
        askForCard(player_score, bank_score);
      }
    } else if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
      console.log(endGameMessage(player_score, bank_score));
      rl.close();
    } else {
      console.log('Please enter "y" for yes or "n" for no.');
      askForCard(player_score, bank_score);
    }
  });
}

function gameLoop() {
  const bank_score = pickBankScore();
  let player_score = pickPlayerCard();
  let name = askForName();

  askForName();
  askForCard(player_score, bank_score);
}

gameLoop();

module.exports = {
  pickBankScore,
  pickPlayerCard,
  stateOfTheGame,
  endGameMessage
};
