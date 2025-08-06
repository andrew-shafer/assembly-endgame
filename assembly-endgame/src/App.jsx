import React, { useState } from "react"
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

/**
 * Goal: Build out the main parts of our app
 * 
 * Challenge: 
 * 1. Save a "currentWord" in state. Initialize as "react".
 * 2. Map over the letters of the word (you'll need to turn 
 *    the string into an array of letters first) and display
 *    each one as a <span>. Capitalize the letters when
 *    displaying them.
 * 3. Style to look like the design. You can get the underline 
 *    effect on the box using `border-bottom`.
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

    const [chips, setChips] = useState(getChipArray())

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
        </main>
    )
}
