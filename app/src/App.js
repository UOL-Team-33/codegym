import './App.css';
import CodeArea from "./components/CodeArea";
import "./css/prism.css";
import Toolbar from "./components/Toolbar";
import Stats from "./components/Stats";
import CodeInput from "./components/CodeInput";
import Arena from "./components/Arena";
import React, {useEffect, useState} from "react";
import Prism from "prismjs";
import {DEFAULT_STATE, GameState, LANGUAGES} from "./components/constants";
import {loadFile} from "./components/helpers/loadCode";
import augment_code from "./components/helpers/utils";
import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";


let code = `const highlight = (code, errorIndex = -1) => {
  const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
  if (errorIndex !== -1) {
    const splitCode = highlightedCode.split("");
    return splitCode.join("");
  }
  return highlightedCode;
};`

code = 'let a = (a,b) => a + b'

const App = () => {

    const [gameState, setGameState] = useState(GameState.Ready);
    const [arenaKey, setArenaKey] = useState(1);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [rawCode, setRawCode] = useState('');
    const [theme, setTheme] = useState('prism');
    const [fontSize, setFontSize] = useState(16);
    const [language, setLanguage] = useState('javascript');
    const [darkUiActive, setDarkUiActive] = useState(true);
    const [stats, setStats] = useState({accuracy:100, timer:0, progress:0, correct:0, wrong:0});

    const handleStatsChange = (stats) => {
        setStats(stats)
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
    };

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        setTheme(selectedTheme);
        import(`prismjs/themes/${selectedTheme}.css`);
    };

    const handleFontSizeChange = (event) => {
        const newFontSize = parseInt(event.target.value);
        setFontSize(newFontSize);
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
    };

    const handleGameStateChange = (newGameState) => {
        setGameState(newGameState)
    };

    const handleDarkUiActiveChange = () => {
        setDarkUiActive(!darkUiActive);
    };

    useEffect(() => {

       if (!uploadedFile) {
        loadFile(LANGUAGES[language].sample).then(text => {
            setRawCode(text)
            setArenaKey(arenaKey+1)
        });
       }
    }, [language]);

    const getLanguageFromExtension = (ex) => {
        const map = {
            js: "javascript",
            py: "python",
        }
        return map[ex]
    }

    useEffect(() => {
        if (uploadedFile) {
            let extension = uploadedFile.name.split('.').pop();
            let lang = getLanguageFromExtension(extension)

            const reader = new FileReader();
            reader.readAsText(uploadedFile);
            reader.onload = () => {
                const code = reader.result;
                setRawCode(code);
                setLanguage(lang)
                setArenaKey(arenaKey+1)
            };
        }
    }, [uploadedFile, language]);

    useEffect(() => {
        if (stats) {
            document.body.classList.add("ui-dark");
            document.body.classList.remove("ui-light");
        } else {
            document.body.classList.add("ui-light");
            document.body.classList.remove("ui-dark");
        }
    }, [stats]);

    const get_game_state = (game_state) => {
        switch (game_state) {
            case GameState.Ready:
                return (
                    <div className='overlay'>
                        <div className='overlay-text'>
                            Press Enter to start
                            <br/>
                            Press Esc to quit session
                        </div>
                    </div>
                );
            case GameState.Started:
            case GameState.Finished:
            default:
                return null
        }
    };


    return (
    <div className="App d-flex flex-column justify-content-between align-items-stretch vh-100">

        <Navbar bg={darkUiActive? "dark": "light"} variant={darkUiActive? "dark": "light"}>
            <Container>
                <Navbar.Brand href="#home">CODE GYM</Navbar.Brand>
                <Form className="">
                    <Row className="d-flex flex-row align-items-center">
                        <Col sm={3}>
                            <Form.Control id='file-upload' onChange={handleFileUpload} type="file" size="sm" />
                        </Col>
                        <Col sm={2}>
                            <Form.Select id='font-select' value={fontSize} onChange={handleFontSizeChange} aria-label="Default select example" size="sm">
                                <option value="16">Font 16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                            </Form.Select>
                        </Col>
                        <Col sm={2}>
                            <Form.Select id='theme-select' value={theme} onChange={handleThemeChange} aria-label="Default select example" size="sm">
                                <option value="prism">Theme Prism</option>
                                <option value="prism-okaidia">Okaidia</option>
                                <option value="prism-tomorrow">Tomorrow</option>
                                <option value="prism-twilight">Twilight</option>
                            </Form.Select>
                        </Col>
                        <Col sm={3}>
                            <Form.Select id='language-select' value={language} onChange={handleLanguageChange} aria-label="Default select example" size="sm">
                                <option value="javascript">Language JavaScript</option>
                                <option value="python">Python</option>
                            </Form.Select>
                        </Col>
                        <Col sm={2}>
                            <Button  onClick={handleDarkUiActiveChange} variant={darkUiActive? 'light': 'dark'}>{darkUiActive ? "Light UI" : "Dark UI"}</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar>
        <Container className={'stats-container ' + (darkUiActive? 'dark': 'light')} fluid>
            <Stats ready={gameState} stats={stats}></Stats>
        </Container>
        <Container className={"code-container " + (darkUiActive? 'dark': 'light') + " flex-fill flex-grow-1"} fluid>
            <Container>
                <Arena
                    key={arenaKey}
                    gameState={gameState}
                    code={rawCode}
                    fontSize={fontSize}
                    language={language}
                    onGameStateChange={handleGameStateChange}
                    onStatsChange={handleStatsChange}
                    stats={stats}
                ></Arena>
            </Container>
        </Container>
        <footer  style={{height: '80px', color:'white', background: '#151515'}}>
            <span>Some text</span>
            TODO: tabs, indented code, returns not showing, key sounds, stats UI, code scroll
        </footer>
    </div>
  );
}

export default App;
