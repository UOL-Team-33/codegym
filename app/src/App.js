import './App.css';
import "./css/prism.css";
import Stats from "./components/Stats";
import Arena from "./components/Arena";
import React, {useEffect, useState} from "react";
import {GameState, LANGUAGES} from "./components/constants";
import {loadFile} from "./components/helpers/loadCode";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";


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
    const [theme, setTheme] = useState('prism-tomorrow');
    const [fontSize, setFontSize] = useState(16);
    const [language, setLanguage] = useState('javascript');
    const [darkUiActive, setDarkUiActive] = useState(true);
    const [stats, setStats] = useState({
        timer:0,
        correct:0,
        wrong:0,
        charsToTypeLength: 0,
        charsTypedLength: 0,
    });

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
    <div className={"code-gym " + (darkUiActive? "dark": "light") +" d-flex flex-column justify-content-between align-items-stretch vh-100"}>

        <Container className="code-navbar">
                <Row className="d-flex flex-row align-items-center justify-content-between h-100">
                    <Col className='code-navbar-logo flex-grow-0'>
                        CODE GYM
                    </Col>

                    <Col className='code-navbar-settings d-flex justify-content-end'>
                        <Col className='code-navbar-file flex-grow-0'>
                            <InputGroup size='sm' >
                                <InputGroup.Text>
                                   <span className="material-symbols-sharp">publish</span>
                                </InputGroup.Text>
                                <Form.Control id='file-upload' onChange={handleFileUpload} type="file" size="sm" />
                            </InputGroup>
                        </Col>
                        <Col className='code-navbar-font flex-grow-0' >
                            <InputGroup size='sm' >
                                <InputGroup.Text>
                                    <span className="material-symbols-sharp">format_size</span>
                                </InputGroup.Text>
                                <Form.Select id='font-select' value={fontSize} onChange={handleFontSizeChange} aria-label="Default select example" size="sm">
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                    <option value="20">20</option>
                                    <option value="22">22</option>
                                    <option value="24">24</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col className='code-navbar-theme flex-grow-0'>
                            <InputGroup size='sm' >
                                <InputGroup.Text>
                                    <span className="material-symbols-sharp">palette</span>
                                </InputGroup.Text>
                                <Form.Select id='theme-select' value={theme} onChange={handleThemeChange} aria-label="Default select example" size="sm">
                                    <option value="prism">Prism</option>
                                    <option value="prism-okaidia">Okaidia</option>
                                    <option value="prism-tomorrow">Tomorrow</option>
                                    <option value="prism-twilight">Twilight</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col className='code-navbar-language flex-grow-0'>
                            <InputGroup size='sm' >
                                <InputGroup.Text>
                                    <span className="material-symbols-sharp">language</span>
                                </InputGroup.Text>
                                <Form.Select id='language-select' value={language} onChange={handleLanguageChange} aria-label="Default select example" size="sm">
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col className='code-navbar-ui flex-grow-0'>

                            {/*<Button className='material-icons '  size='sm' onClick={handleDarkUiActiveChange} variant={darkUiActive? 'light': 'dark'}>{darkUiActive ? "Light UI" : "Dark UI"}</Button>*/}
                            <Button size='sm' onClick={handleDarkUiActiveChange} variant={darkUiActive? 'light': 'dark'}>
                                {darkUiActive?
                                    <span style={{fontSize: '18px'}} className="material-symbols-sharp">light_mode</span>
                                    :
                                    <span style={{fontSize: '18px'}} className="material-symbols-sharp">dark_mode</span>
                                }
                            </Button>
                        </Col>
                    </Col>
                </Row>
        </Container>
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
        {/*<footer  style={{height: '80px', color:'white', background: '#151515'}}>*/}
        {/*</footer>*/}
    </div>
  );
}

export default App;