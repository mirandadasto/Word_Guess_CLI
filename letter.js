function Letter(guess) 
{
    this.guess = guess;
    this.guessed = false;

    this.displayLetter = function()
    {
        if (this.guess === " ")
        {
            return " ";
        }
        else if (!this.guessed)
        {
            return "_";
        }
        else
        {
            return this.guess;
        }
    }
    this.check = function(userInput)
    {
        if (userInput === this.guess)
        {
            this.guessed = true;
        }
    }
}

module.exports = Letter;