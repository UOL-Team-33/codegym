import React from "react";
import Prism from 'prismjs';
import Hands from "./Hands";
import augment_code from "./helpers/utils";
import {CHAR_CLASSNAME, CURRENT_CLASSNAME, ERROR_CLASSNAME, DEFAULT_STATE} from "./constants";


class CodeArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raw_code: props.raw_code,
            ...DEFAULT_STATE
        };
        this.containerRef = React.createRef();
    }

    handleKeyDown = (event) => {
        event.preventDefault()
        const currentKey = event.key;

        if (this.state.ready) {
            // Do not move current if any of the following keys are pressed
            if (['Shift', 'Alt', 'AltGraph', 'Control', 'ContextMenu', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(currentKey)) return;
            if (currentKey === "Escape") this.setState(DEFAULT_STATE)

            let index = this.state.current_char_index
            let curr = this.containerRef.current.querySelector('#char-' + index)
            let next = this.containerRef.current.querySelector('#char-' + (index + 1))
            let prev = this.containerRef.current.querySelector('#char-' + (index - 1))

            if (currentKey === "Backspace") {
                if (index == 0) return
                this.move_current(curr, prev)
                this.setState((state, props) => ({
                    current_char: state.chars_to_type[index - 1],
                    current_char_index: index - 1
                }))

            } else {
                let char_success = (this.state.chars_to_type[index] === currentKey)
                this.move_current(curr, next, char_success)

                this.setState((state, pros) => ({
                    current_char: state.chars_to_type[index + 1],
                    current_char_index: index + 1,
                    max_index: Math.max(state.max_index, index + 1),
                    chars_typed: [...state.chars_typed, currentKey],
                    stats_correct: Math.min(state.stats_correct + char_success, state.chars_to_type.length),
                    stats_wrong: state.stats_wrong + !char_success,
                }))
            }
        } else {
            if (currentKey === 'Enter') {
                this.setState({
                    ready: true
                })
            }
        }
    }

    stats_accuracy() {
        let accuracy = (100 - (this.state.stats_wrong * 100) / this.state.chars_typed.length).toFixed(2)
        return accuracy
    }

    stats_progress() {
        let progress = ((this.state.max_index * 100) / this.state.chars_to_type.length).toFixed(2)
        return progress
    }

    move_current = (curr, next, char_success = true) => {
        curr.classList.remove(CURRENT_CLASSNAME)
        curr.classList.remove(CHAR_CLASSNAME)
        next.classList.add(CURRENT_CLASSNAME)
        next.classList.remove(ERROR_CLASSNAME)
        if (!char_success) curr.classList.add(ERROR_CLASSNAME)
    }

    get_game_state(game_state) {
        if (!game_state) {
            return (
                <div className="overlay">
                    <div className="overlay-text">
                        Press Enter to start
                        <br/>
                        Press Esc to quit session
                    </div>
                </div>
            )
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        let [final_code, chars_to_type] = augment_code(Prism.highlight(this.state.raw_code, Prism.languages.javascript, 'javascript'))
        this.setState((state, props) => ({
            code: final_code,
            chars_to_type,
            current_char: chars_to_type[0],
        }));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    debug() {
        return (
            <div id={'debug'}>
                <ul>
                    <li>Current character: {this.state.current_char}</li>
                    <li>current index: {this.state.current_char_index}</li>
                    <li>max index: {this.state.max_index}</li>
                    <li>Accuracy: {this.stats_accuracy()}%</li>
                    <li>Process: {this.stats_progress()}%</li>
                    <li>Correct: {this.state.stats_correct}</li>
                    <li>Mistakes: {this.state.stats_wrong}</li>
                    <li>Please type: {this.state.chars_to_type[this.state.current_char_index]}</li>
                    <li>Code to type: {JSON.stringify(this.state.chars_to_type)}</li>
                    <li>Code typed: {JSON.stringify(this.state.chars_typed)}</li>
                </ul>
                <div className='key-display' style={{fontSize: '30px'}}></div>
                <Hands key_to_type={this.state.chars_to_type[this.state.current_char_index + 1]}/>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.get_game_state(this.state.ready)}
                <pre>
					<code ref={this.containerRef} dangerouslySetInnerHTML={{__html: this.state.code}}/>
				</pre>
                {this.debug()}
            </>

        )
    }
}

export default CodeArea;