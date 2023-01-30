import React, { useState } from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import dynamic from 'next/dynamic';
// const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), { ssr: false });
import SyntaxHighlighter from "react-syntax-highlighter";

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const initialCode = `def hello(name):
    print("Hello", name)`;

const TextArea = () => {
  const [code, setCode] = useState(initialCode);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleChange = (e) => {
    const { value } = e.target;
    setCode(value);
    setHighlightedIndex(value.length - 1);

    if (value[value.length - 1] !== initialCode[value.length - 1]) {
      document.getElementById(value.length - 1).style.color = "lightred";
    } else {
      document.getElementById(value.length - 1).style.color = "inherit";
    }
  }

  return (
    <>
      <SyntaxHighlighter language="python" style={tomorrow}>
        {code.split('').map((char, index) => {
          // console.log(char, index)
          return (
            '<span>asdf</span> '
            // <span key={index} id={index} style={{ backgroundColor: index === highlightedIndex ? 'rgba(255, 255, 0, 0.2)' : 'inherit' }}>
            //   {char}
            // </span>
          )
        }).join('')
        }
      </SyntaxHighlighter>
      <textarea value={code} onChange={handleChange} />
    </>
  );
}

export default TextArea;