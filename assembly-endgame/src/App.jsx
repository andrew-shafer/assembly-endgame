import { useState } from "react"
import {languages} from "./assets/languages.js"
import clsx from "clsx"

/**
 * Project planning:
 * 
 * Questions to ask yourself before writing any code:
 * 
 * - What are the main containers of elements I need
 *   in this app?
 * 
 * 
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 * 
 * 
 * - How will the user interact with the app? What
 *   events do I need to handle?
 * 
 * 
 */


export default function Hangman() {
    const [word, setWord] = useState("react");
    const [usedLetters, setUsedLetters] = useState([]);

    const wrongGuessCount = usedLetters.filter(l => !word.includes(l)).length;
    const isGameOver = wrongGuessCount >= languages.length-1;
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
        return <span key={index} className="word-letter">{usedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>
    });

    function clickKey(key) {
        setUsedLetters(prevLetters => 
            prevLetters.includes(key) ? prevLetters : [...prevLetters, key])
    }

    const keyboardArray = alphabet.split("").map(key => {
        return <button key={key} 
                        className={clsx('key', {
                            "Incorrect": usedLetters.includes(key) && !word.includes(key),
                            "Correct": usedLetters.includes(key) && word.includes(key)
                        })}
                        onClick={() => clickKey(key)}>
                    {key.toUpperCase()}
                </button>

    });

    return (
        <main>
            <h2>Assembly: Endgame</h2>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            <section className="status">
                <h2>You Win!</h2>
                <h3>Well Done! 🎉</h3>
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
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}
