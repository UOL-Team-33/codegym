import Prism from 'prismjs';
import Hands from "./Hands";
import augment_code from "./helpers/utils";
import React, { useRef, useState, useEffect } from 'react';
import {CHAR_CLASSNAME, CURRENT_CLASSNAME, ERROR_CLASSNAME, GameState} from "./constants";
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

const Arena = ({
                   gameState,
                   code,
                   language,
                   fontSize,
                   onGameStateChange,
                   stats,
                   onStatsChange
               }) => {

    const [formattedCode, setFormattedCode] = useState("");
    const [ready, setReady] = useState(gameState);
    const [charsToType, setCharsToType] = useState([]);
    const [charsTyped, setCharsTyped] = useState([]);
    const [currentChar, setCurrentChar] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const containerRef = useRef(null);

    const restart = () => {
        if (window.confirm("Are you sure you want to restart?")) {
            setCurrentCharIndex(0);
            setMaxIndex(0);
            setCharsTyped([]);
            setCurrentChar(charsToType[0]);
            onStatsChange({
                correct: 0,
                wrong: 0,
                charsToTypeLength: charsToType.length,
                charsTypedLength: 0,
                maxIndex: 0,
            });
        }
    };

    const handleKeyDown = (event) => {
        event.preventDefault();
        const currentKey = event.key;
        
        if (ready === GameState.Started) {
            // Check if the current key is a special key that we don't want to handle.
            if (['Shift', 'Alt', 'AltGraph', 'Control', 'ContextMenu',
                'ArrowUp', 'ArrowDown', 'ArrowLeft','ArrowRight'].includes(currentKey)) {
                return;
            }
            
            let index = currentCharIndex // get the index of the current character to type
            let curr = containerRef.current.querySelector('#char-' + index); // get the HTML element for the current character
            let next = containerRef.current.querySelector('#char-' + (index + 1)); // get the HTML element for the next character
            let prev = containerRef.current.querySelector('#char-' + (index - 1)); // get the HTML element for the previous character

            if (currentKey === 'Backspace') {// if the Backspace key was pressed
                if (index === 0) {// if we're already at the beginning of the text
                    return; // do nothing
                } //otherwise
                move_current(curr, prev); // move the current character one position to the left
                setCurrentChar(charsToType[index - 1]) // move the current character one position to the left
                setCurrentCharIndex(index - 1) // update the current character index

            } 
          
            else { // if any other key was pressed
                let correct_char = charsToType[index] // get the correct character to type at the current position
                let char_success = charsToType[index] === currentKey; // check if the typed character matches the correct character

                // check if the correct character is a special character that can be typed with a different key
                if (correct_char.match(/\r/)) {
                    if (currentKey == "Enter") char_success = true
                }
                if (correct_char.match(/\n/)) {
                    if (currentKey == "Enter") char_success = true
                }
                if (correct_char.match(/\t/)) {
                    if (currentKey == "Tab") char_success = true
                }

                move_current(curr, next, char_success); // move the current character one position to the right, and highlight it in green or red depending on whether it was typed correctly

                setCurrentChar(charsToType[index+1])  // set the current character to the next character in the text
                setCurrentCharIndex(index + 1) // update the current character index
                setMaxIndex(Math.max(maxIndex, index+1)) // update the maximum index reached so far
                setCharsTyped([...charsTyped, currentKey]) // add the typed character to the list of typed characters
                onStatsChange({ // update the typing statistics
                    correct: Math.min(stats.correct+char_success, charsToType.length),
                    wrong: stats.wrong + !char_success,
                    charsToTypeLength: charsTyped.length,
                    charsTypedLength: charsTyped.length,
                    maxIndex: maxIndex,
                })
            }

            if(currentKey === 'Escape')
            {
                {restart()};
                setReady(GameState.Finished)
                onGameStateChange(GameState.Finished)
            }
            

        } else {
            if (currentKey === 'Enter') {
                setReady(GameState.Started)
                onGameStateChange(GameState.Started)
            }
        }
    };

    // A function that moves the current typing cursor to the next character, and updates the character styles
    const move_current = (curr, next, char_success = true) => {
        // Remove the current class and character class from the current character
        curr.classList.remove(CURRENT_CLASSNAME);
        curr.classList.remove(CHAR_CLASSNAME);
        // Add the current class to the next character, and remove the error class if present
        next.classList.add(CURRENT_CLASSNAME);
        next.classList.remove(ERROR_CLASSNAME);
        // If the character was typed incorrectly, add the error class to the current character
        if (!char_success) curr.classList.add(ERROR_CLASSNAME);
    };

    // A mapping of programming languages to their respective Prism.js language classes
    const language_map = {
        "python": "language-python",
        "javascript": "language-javascript",
    }


    
    useEffect(() => {
        // Augment the code with HTML markup for syntax highlighting
        let [final_code, chars_to_type] = augment_code(Prism.highlight(code, Prism.languages[language], language_map[language]))
        // Set the formatted code with syntax highlighting
        setFormattedCode(final_code)
        // Set the characters to type
        setCharsToType(chars_to_type)
        // Set the current character to type to the first character in the text
        setCurrentChar(chars_to_type[0])
    }, [code]);

    useEffect(() => {
        // Add a keydown event listener to the window to handle typing
        window.addEventListener('keydown', handleKeyDown);
        // Remove the keydown event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentChar, currentCharIndex, maxIndex, charsTyped, ready, stats]);

    const debug = () => {
        return (
            <div id={'debug'}>
                <ul>
                    <li>Current character: {currentChar}</li>
                    <li>current index: {currentCharIndex}</li>
                    <li>max index: {maxIndex}</li>
                    <li>Please type: {charsToType[currentCharIndex]}</li>
                    <li>Code to type: {JSON.stringify(charsToType)}</li>
                    <li>Code typed: {JSON.stringify(charsTyped)}</li>
                </ul>
                <div className='key-display' style={{ fontSize: '30px' }}></div>
                <Hands key_to_type={charsToType[currentCharIndex]} />
            </div>
        );
    };

    return (
        <>
            <pre className={language_map[language]} style={{ fontSize: `${fontSize}px` }}>
                <code className={language_map[language]} ref={containerRef} dangerouslySetInnerHTML={{ __html: formattedCode }} />
            </pre>
            {/*{debug()}*/}
        </>
    );


}

export default Arena;