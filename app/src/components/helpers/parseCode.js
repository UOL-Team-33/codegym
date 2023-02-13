import 'prismjs';
import Prism from "prismjs";


/**
 * Accepts raw text code and returns an array of tokenized objects
 * @param {string} textCode -- raw text input
 * @returns -- an array of objects with character and token type
 */
const parseCode = textCode => {
  // Get an array of tokenized code
  // Array contains token objects and strings
  // The objects have type, content and length properties
  // Eg. [{"type": "keyword",
  //       "content": "const",
  //       "length": 5
  //       },
  //       " tsOptions ", ...]
  const tokens = Prism.tokenize(textCode, Prism.languages.javascript);

  const parsedCode = [];

  for (let i = 0; i < tokens.length; ++i) {
    if (typeof tokens[i] === 'string') {
      const s = tokens[i]; // current string

      for (let j = 0; j < s.length; ++j) {
        parsedCode.push({
          character: s[j]
        });
      }
    } else {
      // Element is a token object
      const s = tokens[i].content; // current string
      const type = tokens[i].type;
      for (let j = 0; j < s.length; ++j) {
        parsedCode.push({
          character: s[j],
          type: type
        });
      }
    }
  }

  return parsedCode;
};

export default parseCode;
