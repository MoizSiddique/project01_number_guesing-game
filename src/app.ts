#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnimation from "chalk-animation";

const error = chalk.bgRed;
const warning = chalk.bgYellow;
const heading = chalk.cyan;

const min : number = 1;
const max : number = 10;
const random : number = Math.floor(Math.random() * max) + min;

let pause = (time : number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, time);
    });
}

let startFlag : boolean = true;
let attempt : number = 3; 
const intro = heading(`\n Welcome to the Number Guessing Game!\n In this game, you will try to guess a randomly chosen number between ${min} and ${max}.\n You will have ${attempt} chances to guess the correct number. Good luck!`);

console.log(intro);
await pause(1000);

while(startFlag && (attempt > 0)){

    let userInput = await inquirer.prompt([{
        type: "number",
        name: "field",
        message: `Enter number between ${min}-${max}`
    }]);

    if((userInput.field < min) || (userInput.field > max)){
        console.log(error("Your input value is out of range please enter valid number..."));
        await pause(1200);
    }else if(isNaN(userInput.field) || ((userInput.field % 1) != 0)){
        console.log(error("Invalid value please enter valid number..."));
        await pause(1200);
    }else{
        if((attempt < 2) && (random !== userInput.field)){
            const loose = chalkAnimation.neon(`
\\    / / //   ) ) //   / /       / /        //   ) ) //   ) ) //   ) )  //   / / 
 \\  / / //   / / //   / /       / /        //   / / //   / / ((        //____    
  \\/ / //   / / //   / /       / /        //   / / //   / /    \\      / ____     
  / / //   / / //   / /       / /        //   / / //   / /       ) ) //          
 / / ((___/ / ((___/ /       / /____/ / ((___/ / ((___/ / ((___ / / //____/ /  
            `)
            await pause(5000);
            loose.stop();
        }else{
            if(random === userInput.field){
                const win = chalkAnimation.neon(`
                                                           ___   ___
                \\    / / //   ) ) //   / /   ||   / |  / /   / /    /|    / / 
                 \\  / / //   / / //   / /    ||  /  | / /   / /    //|   / /  
                  \\/ / //   / / //   / /     || / /||/ /   / /    // |  / /   
                  / / //   / / //   / /      ||/ / |  /   / /    //  | / /    
                 / / ((___/ / ((___/ /       |  /  | / __/ /___ //   |/ /  
                `)
                await pause(5000);
                win.stop();
                // console.log(success("Hurry! You win..."));
                startFlag = false;
            }else if(userInput.field > random){
                console.log(warning("Your are guesing high..."));
                pause(1000);
                
            }else{
                console.log(warning("Your are guesing low..."));
                pause(1000);
            }
        }
        attempt--;
    }
}

