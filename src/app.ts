import inquirer from "inquirer";
import chalk from 'chalk';

const error = chalk.bgRed;
const warning = chalk.bgYellow;
const success = chalk.bgGreenBright;
const fail = chalk.bgRedBright;

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
while(startFlag && (attempt > 0)){

    let userInput = await inquirer.prompt([{
        type: "number",
        name: "field",
        message: `Enter number between ${min}-${max}`
    }]);

    if((userInput.field < min) || (userInput.field > max)){
        console.log(error("Your input value is out of range please enter valid number..."));
        await pause(700);
    }else if(isNaN(userInput.field) || ((userInput.field % 1) != 0)){
        console.log(error("Invalid value please enter valid number..."));
        await pause(700);
    }else{
        if((attempt < 2) && (random !== userInput.field)){
            console.log(fail("Ohh! You loose, your attempt's finished...."));
            await pause(1000);
        }else{
            if(random === userInput.field){
                console.log(success("Hurry! You win..."));
                startFlag = false;
            }else if(userInput.field > random){
                console.log(warning("Your are guesing high..."));
                pause(500);
                
            }else{
                console.log(warning("Your are guesing low..."));
                pause(500);
            }
        }
        attempt--;
    }
}

