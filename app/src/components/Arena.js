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

    const handleKeyDown = (event) => {
        event.preventDefault();
        const currentKey = event.key;

        if (ready === GameState.Started) {
            if (['Shift', 'Alt', 'AltGraph', 'Control', 'ContextMenu',
                'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(currentKey)) {
                return;
            }
            if (currentKey === 'Escape') {
                setReady(GameState.Ready)
                onGameStateChange(GameState.Ready)
            }

            let index = currentCharIndex
            let curr = containerRef.current.querySelector('#char-' + index);
            let next = containerRef.current.querySelector('#char-' + (index + 1));
            let prev = containerRef.current.querySelector('#char-' + (index - 1));

            if (currentKey === 'Backspace') {
                if (index === 0) {
                    return;
                }
                move_current(curr, prev);
                setCurrentChar(charsToType[index - 1])
                setCurrentCharIndex(index - 1)

            } else {
                let correct_char = charsToType[index]
                let char_success = charsToType[index] === currentKey;

                if (correct_char.match(/\r/)) {
                    if (currentKey == "Enter") char_success = true
                }
                if (correct_char.match(/\n/)) {
                    if (currentKey == "Enter") char_success = true
                }
                if (correct_char.match(/\t/)) {
                    if (currentKey == "Tab") char_success = true
                }

                move_current(curr, next, char_success);


                setCurrentChar(charsToType[index+1])
                setCurrentCharIndex(index + 1)
                setMaxIndex(Math.max(maxIndex, index+1))
                setCharsTyped([...charsTyped, currentKey])
                onStatsChange({
                    correct: Math.min(stats.correct+char_success, charsToType.length),
                    wrong: stats.wrong + !char_success,
                    charsToTypeLength: charsTyped.length,
                    charsTypedLength: charsTyped.length,
                    maxIndex: maxIndex,
                })
            }
        } else {
            if (currentKey === 'Enter') {
                setReady(GameState.Started)
                onGameStateChange(GameState.Started)
            }
        }
    };


    const move_current = (curr, next, char_success = true) => {
        curr.classList.remove(CURRENT_CLASSNAME);
        curr.classList.remove(CHAR_CLASSNAME);
        next.classList.add(CURRENT_CLASSNAME);
        next.classList.remove(ERROR_CLASSNAME);
        if (!char_success) curr.classList.add(ERROR_CLASSNAME);
    };

    const language_map = {
        "python": "language-python",
        "javascript": "language-javascript",
    }


    useEffect(() => {
        let [final_code, chars_to_type] = augment_code(Prism.highlight(code, Prism.languages[language], language_map[language]))
        setFormattedCode(final_code)
        setCharsToType(chars_to_type)
        setCurrentChar(chars_to_type[0])
    }, [code]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
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