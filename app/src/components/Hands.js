import React from 'react';
import './Hands.css';

const Hands = ({ key_to_type }) => {
    let fingerClass = '';
    switch (key_to_type) {
        case 'q':
        case 'a':
        case 'z':
            fingerClass = 'left-pinkie';
            break;
        case 'w':
        case 's':
        case 'x':
            fingerClass = 'left-ring';
            break;
        case 'e':
        case 'd':
        case 'c':
            fingerClass = 'left-middle';
            break;
        case 'r':
        case 'f':
        case 'v':
        case 't':
        case 'g':
        case 'b':
            fingerClass = 'left-index';
            break;
        case ' ':
            fingerClass = 'left-thumb';
            break;
        case 'y':
        case 'h':
        case 'n':
        case 'u':
        case 'j':
        case 'm':
            fingerClass = 'right-index';
            break;
        case 'i':
        case 'k':
        case ',':
            fingerClass = 'right-middle';
            break;
        case 'o':
        case 'l':
        case '>':
        case '.':
        case '(':
            fingerClass = 'right-ring';
            break;
        case 'p':
        case ')':
        case '+':
        case ';':
        case '\'':
        case '[':
        case ']':
        case '=':
        case '=':
            fingerClass = 'right-pinkie';
            break;
        default:
            fingerClass = '';
    }

    const keys = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'CapsLock'],
        ['Space']
    ];

    return (
        <>
            <h2>key: {key_to_type} clasname: {fingerClass}</h2>
            <div className={"both-hands " + fingerClass}>
                <div className="left-hand">
                    <div className="fingers">
                        <div className="finger pinkie"></div>
                        <div className="finger ring"></div>
                        <div className="finger middle"></div>
                        <div className="finger index"></div>
                        <div className="finger thumb"></div>
                    </div>
                    <div className='palm'></div>
                </div>
                <div className="right-hand">
                    <div className='fingers'>
                        <div className="finger thumb"></div>
                        <div className="finger index"></div>
                        <div className="finger middle"></div>
                        <div className="finger ring"></div>
                        <div className="finger pinkie"></div>
                    </div>
                    <div className='palm'></div>
                </div>
            </div >
            <div className="keyboard">
                {keys.map((row, i) => (
                    <div className="keyboard-row" key={i}>
                        {row.map((el, j) => (
                            <div className={`key key-${el}`} key={el + i + j}>{el}</div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Hands;