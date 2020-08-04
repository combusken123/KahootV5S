var Kahoot = require("kahoot.js-updated");
const chalk = require("chalk")
console.log(chalk.green("KahootVersion5-Stable, Developed and maintained in repl.it by Cyber Unity. Will spawn around 100 processes."))
console.log(chalk.red("Use at your own liability."));
console.log(chalk.yellow("For code enter the Kahoot! code.", "For name type a name for the clients you want to join."))
var clients = [];
for (var i = 0; i <= 800; ++i) {
  clients[i] = new Kahoot;
}
var code = prompt(chalk.yellowBright("code"))
var name = prompt(chalk.yellowBright("name"))
if(name.length < 2){
  console.log(chalk.red("Invalid username!"))
  process.exit(1)
} else if(name.length > 1) {
  console.log(chalk.green("Valid username!"))
}
console.log("Joining kahoot...");
var e = 0;
for (var n in clients) {
  e++;
  clients[n].setMaxListeners(Number.POSITIVE_INFINITY)
  clients[n].on("locked", () => {
    console.log(chalk.redBright("The quiz has been locked, this client cannot join."))
  })
  clients[n].join(code, name + e);
  clients[n].on("joined", () => {
    console.log(chalk.green("I joined the Kahoot!"));
  });
  clients[n].on("quizStart", quiz => {
    console.log("The quiz has started! The quiz's name is:", quiz.name);
  });
  clients[n].on("questionStart", question => {
    if(question.layout === 'CLASSIC') {
      question.answer(Math.floor(Math.random() * 4)); 
    } else if(question.layout === 'TRUE_FALSE') {
      question.answer(Math.floor(Math.random() * 2)); 
    }
  });

  clients[n].on("quizEnd", () => {   
    console.log("The quiz has ended / been kicked.");
  });
  clients[n].on("finish", () => {
    console.log("The Quiz has finished!")
    process.exit(1)
  })
}