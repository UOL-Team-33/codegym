import React, { Component, Fragment } from 'react';

import { loadFile } from './helpers/loadCode';
import parseCode from './helpers/parseCode';

import './CodeInput.css';

class CodeInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [],
      start: false,
      finish: false
    };

    this.handleType = this.handleType.bind(this);
    // this.handlePress = this.handlePress.bind(this);
  }

  /**
   * Accepts currently selected span element and user typed key
   * and returns boolean value if the typed value corresponds to
   * character in the element
   * @param {HTMLElement} element
   * @param {string} typedKey
   */
  checkCharacter(element, typedKey) {
    if (!element) return false;

    // We need to convert the character to uppercase so that
    // the character code matches with the typed keycode
    const elementValCode = element.textContent;

    // Check for tab
    if (elementValCode === '\t') {
      return typedKey === 'Tab';
    }

    if (elementValCode === '\n') {
      return typedKey === 'Enter';
    }
    // console.log(elementValCode, typedKey);

    return elementValCode === typedKey;
  }

  componentDidMount() {
    loadFile('/code-files/sample-code.js').then(text =>
      this.setState({ code: parseCode(text) })
    );

    window.addEventListener('keydown', this.handleType);
    // window.addEventListener('keydown', this.handlePress);
  }

  // handlePress(e) {
  //   console.log(e);
  // }

  handleType(e) {
    e.preventDefault();
    const currentChar = document.querySelector('span.current');
    const currentKey = e.key;

    // Do not move cursor if any of the following keys are pressed
    if (
      [
        'Shift',
        'Alt',
        'AltGraph',
        'Control',
        'ContextMenu',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight'
      ].includes(currentKey)
    ) {
      return;
    }

    // Remove error background when processing the current character,
    // this is incase the cursor is back on the character by backspace
    // currentChar.classList.remove('error');

    if (currentKey === 'Backspace') {
      currentChar.classList.remove('current');
      const prevChar = currentChar.previousSibling;
      prevChar.classList.add('current');
      prevChar.classList.remove('error');
    } else {
      const correctType = this.checkCharacter(currentChar, currentKey);

      if (!correctType) {
        currentChar.classList.add('error');
      }

      currentChar.classList.remove('current');
      const nextChar = currentChar.nextElementSibling;
      nextChar.classList.add('current');
    }

    // console.log(currentKey);
    // console.log(e);
  }

  render() {
    return (
      <div id='code-area'>
        <pre>
          <code className='language-javascript'>
            {this.state.code.map((codeObj, i) => {
              let classes = 'start'; // For all not yet typed characters
              classes += codeObj.type ? ` ${codeObj.type} token` : '';

              // Set cursor at the first character
              if (i === 0) {
                classes += ' current';
              }

              if (codeObj.character === '\n') {
                classes += ' enter';
              }

              if (codeObj.character === '\t') {
                classes += ' tab';
              }

              return (
                <span className={classes} key={i}>
                  {codeObj.character}
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    );
  }
}

export default CodeInput;
