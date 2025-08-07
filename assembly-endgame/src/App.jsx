import { useState } from "react"
import {languages} from "./assets/languages.js"
import Chip from "./components/Chip.jsx"

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
    function getChipArray() {
        return languages.map(language => (
            <Chip name={language.name}
                  backgroundColor={language.backgroundColor}
                  color={language.color}
                  key={language.name}
            />
        ))
    }

    const [chips, setChips] = useState(getChipArray());
    const [word, setWord] = useState("react");
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const wordArray = word.split("").map((letter, index) => {
        return <span key={index} className="word-letter">{letter.toUpperCase()}</span>
    });

    const keyboardArray = alphabet.split("").map(key => {
        return <button key={key}>{key.toUpperCase()}</button>
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
            <button className="new-game">New Game</button>
        </main>
    )
}
