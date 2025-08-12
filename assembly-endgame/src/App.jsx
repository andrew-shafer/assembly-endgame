import { useState } from "react"
import { languages } from "./assets/languages.js"
import { getFarewellText, generateRandomWord } from "./assets/utils.js";
import clsx from "clsx"
import Confetti from "react-confetti"

export default function Hangman() {
    const [word, setWord] = useState(() => generateRandomWord());
    const [usedLetters, setUsedLetters] = useState([]);

    const wrongGuessCount = usedLetters.filter(l => !word.includes(l)).length;
    const isGameWon  =  word.split("").every(letter => usedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length-1;
    const isGameOver = isGameWon || isGameLost;
    const isLastGuessIncorrect = !word.split('').includes(usedLetters.at(-1)) && wrongGuessCount > 0;

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const chips = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount;
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                className={`chip${isLanguageLost ? " lost" : ""}`}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const wordArray = word.split("").map((letter, index) => {
        return (
            isGameLost && !usedLetters.includes(letter) ? 
                <span key={index} className="letter-not-guessed">
                    {letter.toUpperCase()}
                </span> : 
            <span key={index} className="word-letter">
                {usedLetters.includes(letter) ? letter.toUpperCase() : ""}
            </span>
        )
    });

    function clickKey(key) {
        setUsedLetters(prevLetters => 
            prevLetters.includes(key) ? prevLetters : [...prevLetters, key])
    }

    const keyboardArray = alphabet.split("").map(key => {
        return <button key={key} 
                        className={clsx('key', {
                            "Incorrect": usedLetters.includes(key) && !word.includes(key),
                            "Correct": usedLetters.includes(key) && word.includes(key),
                            "Disabled": isGameOver
                        })}
                        onClick={() => clickKey(key)}
                        disabled={isGameOver ? true : false}>
                    {key.toUpperCase()}
                </button>

    });

    function renderStatusMessage() {
        if (isGameOver) {
            return (
                <>
                    <h2>
                        {clsx({"You Win!": isGameWon,
                                "Game over!": isGameLost,
                        })}
                    </h2>
                    <h3>{clsx({"Well Done! 🎉": isGameWon,
                            "You lose!  Better start learning Assembly! 😭": isGameLost,
                        })}
                    </h3>
                </>
            )
        } else if (!isGameOver && isLastGuessIncorrect) {
            return (
                <>
                    <p className="farewell-message">
                        {getFarewellText(languages[wrongGuessCount-1].name)}
                    </p>
                </>
            )
        } else {
            return <></>
        }
    }

    function resetGame() {
        setWord(prevWord => generateRandomWord())
        setUsedLetters(prevUsedLetters => []);
    }

    return (
        <main>
            {isGameWon && <Confetti />}
            <h2>Assembly: Endgame</h2>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            <section className={clsx("status", {
                                     " won": isGameWon,
                                     " lost": isGameLost,
                                     " incorrect": !isGameOver && isLastGuessIncorrect
                                }
            )}>
               {renderStatusMessage()}
            </section>
            <section className="chip-container">
                {chips}
            </section>
            <section className="word-field">
                {wordArray}
            </section>
            <section className="keyboard">
                {keyboardArray}
            </section>
            {isGameOver ? <button className="new-game" onClick={resetGame}>New Game</button> : null}
        </main>
    )
}
