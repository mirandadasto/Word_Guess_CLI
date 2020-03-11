const word = require("./word.js");
const inquirer = require('inquirer');

wordList = ["Voldemort", "Dumbledore", "Quidditch", "Horcruxes", "Acromantula", "Alohomora", "Animagus", "Apparate", "Arithmancy", "Astronomy", "Auror",
            "Azkaban", "Basilisk", "Beater", "Beauxbatons", "Bezoar", "Bludgers", "Boggart", "Broomstick", "Bubotuber", "Burrow", "Butterbeer", "Centaurs",
            "Chaser", "Dementor", "Diffindo", "Disapparate", "Diviniation", "Expelliarmus", "Evenesco", "Dungbomb", "Dragon", "Malfoy", "Firebolt", "Flobberworm",
            "Furnunculus", "Galleon", "Gillyweed", "Goblins", "Gobstones", "Grindylow", "Gringotts", "Grunnings", "Gryffindor", "Heliopath", "Hellebore", 
            "Heptomology", "Herbology", "Hippogriff", "Hogsmeade", "Honeydukes", "Howler", "Hufflepuff", "Ravenclaw", "Slytherin", "Impervius", "Incarcerous",
            "Incendio", "Keeper", "Karkus", "Kneazle", "Kwikspell", "Legilimency", "Leprechaun", "Locomotor", "Lumos", "Mandrake", "Marauder", "Merpeople",
            "Metamorphmagus", "Mobiliarbus", "Monkshood", "Morsmordre", "Mudblood", "Muggle", "Nargles", "Niffler", "Nox", "Obliviate", "Occlumency",
            "Ollivanders", "Omnioculars", "Ornithomancy", "Parseltongue", "Patronus", "Pensieve", "Phoenix", "Poltergeist", "Portkey", "Potions", 
            "Protego", "Quaffle", "Remembrall", "Rennervate", "Reparo", "Rictusempra", "Riddikulus", "Seeker", "Silencio", "Smeltings", "Sneakoscope", 
            "Sonorus", "Spellotape", "Splinching", "Squib", "Stupefy", "Tarantallegra", "Thestral", "Transfiguration", "Unicorn", "Unspeakable", "Vampire",
            "Veritaserum", "Wand", "Wizard", "Wizengamot", "Werewolf", "Wolfsbane", "Zonkos"];

var randomNumber = 0;
var currentWord = "";
var gameWord = "";
var counter = 0;

function runGame()
{
    if (wordList.length < 2)
    {
        wordList = ["Voldemort", "Dumbledore", "Quidditch", "Horcruxes", "Acromantula", "Alohomora", "Animagus", "Apparate", "Arithmancy", "Astronomy", "Auror",
        "Azkaban", "Basilisk", "Beater", "Beauxbatons", "Bezoar", "Bludgers", "Boggart", "Broomstick", "Bubotuber", "Burrow", "Butterbeer", "Centaurs",
        "Chaser", "Dementor", "Diffindo", "Disapparate", "Diviniation", "Expelliarmus", "Evenesco", "Dungbomb", "Dragon", "Malfoy", "Firebolt", "Flobberworm",
        "Furnunculus", "Galleon", "Gillyweed", "Goblins", "Gobstones", "Grindylow", "Gringotts", "Grunnings", "Gryffindor", "Heliopath", "Hellebore", 
        "Heptomology", "Herbology", "Hippogriff", "Hogsmeade", "Honeydukes", "Howler", "Hufflepuff", "Ravenclaw", "Slytherin", "Impervius", "Incarcerous",
        "Incendio", "Keeper", "Karkus", "Kneazle", "Kwikspell", "Legilimency", "Leprechaun", "Locomotor", "Lumos", "Mandrake", "Marauder", "Merpeople",
        "Metamorphmagus", "Mobiliarbus", "Monkshood", "Morsmordre", "Mudblood", "Muggle", "Nargles", "Niffler", "Nox", "Obliviate", "Occlumency",
        "Ollivanders", "Omnioculars", "Ornithomancy", "Parseltongue", "Patronus", "Pensieve", "Phoenix", "Poltergeist", "Portkey", "Potions", 
        "Protego", "Quaffle", "Remembrall", "Rennervate", "Reparo", "Rictusempra", "Riddikulus", "Seeker", "Silencio", "Smeltings", "Sneakoscope", 
        "Sonorus", "Spellotape", "Splinching", "Squib", "Stupefy", "Tarantallegra", "Thestral", "Transfiguration", "Unicorn", "Unspeakable", "Vampire",
        "Veritaserum", "Wand", "Wizard", "Wizengamot", "Werewolf", "Wolfsbane", "Zonkos"];
    }
    randomNumber = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomNumber];
    gameWord = new word(currentWord);
    gameWord.makeWord();

    if (randomNumber > -1)
    {
        wordList.splice(randomNumber, 1);
    }

    promptUser();
}

function promptUser()
{
    if (counter < 16)
    {
        console.log(gameWord.displayWord());
        inquirer.prompt(
            [
             {
                 type: "input",
                 name: "letter",
                 message: "\n Pick a letter and press enter."
             }   
            ]).then(function(data)
            {
                checkAnswer(data);
            })
    }
    else
    {
        console.log ("\n Avada Kadavra, you lose you filthy mudblood.\n");
        console.log (currentWord);
        currentWord = "";
        randomNumber = 0;
        counter = 0;
        runGame();
    }
}

function checkAnswer(data)
{
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter))
    {
        var toUpper = data.letter.toUpperCase();
        var temp = gameWord.displayWord();
        gameWord.checkGuess(toUpper);

        if (temp === gameWord.displayWord())
        {
            console.log ("Incorrect! You'll never guess right, mugggle!");
            counter++;
            console.log((15 - counter) + " more chances to hit me, if you can.");
            promptUser();
        }
        else
        {
            correctGuess();
        }
    }
    else
    {
        console.log("/n Please enter one letter at a time. \n");
        promptUser();
    }
}

function correctGuess()
{
    console.log("\n You are a worthy opponent. \n");

    if (currentWord.replace(/ /g, "") == (gameWord.displayWord()).replace(/ /g,""))
    {
        console.log(gameWord.displayWord());
        console.log("\n Yer are a wizard! \n");
        currentWord = "";
        randomNumber = 0;
        counter = 0;
        runGame();
    }
    else 
    {
        promptUser();
    }
}

runGame();