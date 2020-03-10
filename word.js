
const Letter = require("./letter.js");

function Word(data)
{
    this.data = data;
    this.testWord = [];

    this.makeWord = function()
    {
        for (var i = 0; i < data.length; i++)
        {
            var let = new Letter(data[i]);
            this.testWord.push(let);
        }
    }

    this.displayWord = function()
    {
        var wordDisplay = [];
        
        for (var i = 0; i < this.testWord.length; i++)
        {
            wordDisplay.push(this.testWord[i].displayLetter())
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(myGuess)
    {
        for (var i = 0; i < this.testWord.length; i++)
        {
            this.testWord[i].check(myGuess);
        }
    }
}

module.exports = Word;