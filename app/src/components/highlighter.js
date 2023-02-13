import Prism from "prismjs";

const highlight = (code, errorIndex = -1) => {
  const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  if (errorIndex !== -1) {
    console.log("pre 1:", highlightedCode)
    const splitCode = highlightedCode.split("");
    console.log("pre 2:", splitCode)
    splitCode[errorIndex] = `<span class="error">${splitCode[errorIndex]}</span>`;
    let result = splitCode.join("");
    console.log("result: ", result)
    return result;
  }
  return highlightedCode;
};

export { highlight };
