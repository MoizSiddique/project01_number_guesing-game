#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const error = chalk.bgRed;
const warning = chalk.bgYellow;
const heading = chalk.cyan;

const min: number = 1;
const max: number = 10;
let random: number = Math.floor(Math.random() * max) + min;

interface userInputType {
  field: number;
}

interface playing {
  playAgain: boolean;
}

let pause = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

let play: boolean = true;
let attempt: number = 3;
const intro = heading(
  `\n Welcome to the Number Guessing Game!\n In this game, you will try to guess a randomly chosen number between ${min} and ${max}.\n You will have ${attempt} chances to guess the correct number. Good luck!`
);

console.log(intro);
await pause(1000);

while (play) {
  while (attempt > 0) {
    let userInput: userInputType = await inquirer.prompt([
      {
        type: "number",
        name: "field",
        message: `Enter number between ${min}-${max}`,
      },
    ]);

    if (userInput.field < min || userInput.field > max) {
      console.log(
        error("Your input value is out of range please enter valid number...")
      );
      await pause(1200);
    } else if (isNaN(userInput.field) || userInput.field % 1 != 0) {
      console.log(error("Invalid value please enter valid number..."));
      await pause(1200);
    } else {
      if (attempt < 2 && random !== userInput.field) {
        const loose = chalkAnimation.neon(`
\\    / / //   ) ) //   / /       / /        //   ) ) //   ) ) //   ) )  //   / / 
 \\  / / //   / / //   / /       / /        //   / / //   / / ((        //____    
  \\/ / //   / / //   / /       / /        //   / / //   / /    \\      / ____     
  / / //   / / //   / /       / /        //   / / //   / /       ) ) //          
 / / ((___/ / ((___/ /       / /____/ / ((___/ / ((___/ / ((___ / / //____/ /  
            `);
        await pause(5000);
        loose.stop();
      } else {
        if (random === userInput.field) {
          const win = chalkAnimation.neon(`
                                                           ___   ___
                \\    / / //   ) ) //   / /   ||   / |  / /   / /    /|    / / 
                 \\  / / //   / / //   / /    ||  /  | / /   / /    //|   / /  
                  \\/ / //   / / //   / /     || / /||/ /   / /    // |  / /   
                  / / //   / / //   / /      ||/ / |  /   / /    //  | / /    
                 / / ((___/ / ((___/ /       |  /  | / __/ /___ //   |/ /  
                `);
          await pause(5000);
          win.stop();
          attempt = 0;
        } else {
          console.log(error(`you have ${attempt - 1}-attempts left.`));
          if (userInput.field > random) {
            console.log(warning("Your are thinking high..."));
            pause(1000);
          } else {
            console.log(warning("Your are thinking low..."));
            pause(1000);
          }
        }
      }
      attempt--;
    }
  }

  let letPlay: playing = await inquirer.prompt([
    {
      name: "playAgain",
      type: "confirm",
      message: "Do you wanna play again?",
    },
  ]);

  if (!letPlay.playAgain) {
    play = false;
    console.log(heading("Exit game....."));
  } else {
    random = Math.floor(Math.random() * max) + min;
    attempt = 3;
  }
}
