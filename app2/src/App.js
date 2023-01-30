import './App.css';
import CodeArea from "./components/CodeArea";
import "./css/prism.css";


let code = `const highlight = (code, errorIndex = -1) => {
  const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  if (errorIndex !== -1) {
    const splitCode = highlightedCode.split("");
    return splitCode.join("");
  }
  return highlightedCode;
};`

code = 'let a = (a,b) => a + b'

function App() {

  return (
    <div className="App">
        <h1>Code Editor</h1>
        <CodeArea raw_code={code} code_size={code.length}></CodeArea>
    </div>
  );
}

export default App;
