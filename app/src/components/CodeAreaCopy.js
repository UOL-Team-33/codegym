import React from "react";
import Prism from 'prismjs';
import Hands from "./Hands";
import augment_code from "./helpers/utils";

class CodeArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			raw_code: props.raw_code,
			ready: false,
			code: "",

			chars_to_type: [],
			chars_success: [],
			chars_typed: [],

			current_char: "",
			current_char_index: -1,

			stats_correct: 0,
			stats_wrong: 0,
			stats_accuracy: 1,
			stats_progress: 0,
		};
		this.containerRef = React.createRef();
	}


	handleKeyDown = (event) => {
		console.log(event.key)
		if (event.key === "Backspace") {
			let new_chars_typed = this.state.chars_typed.slice(0, -1)
			let new_chars_success = this.state.chars_success.slice(0, -1)
			let index = this.state.chars_typed.length
			let last_try = this.state.chars_success[index]

			let correct_num = this.state.stats_correct
			let wrong_num = this.state.stats_wrong
			if (last_try) {
				correct_num = this.state.correct_num - 1
			} else {
				wrong_num = this.state.wrong_num - 1
			}

			this.move_cursor(index - 1, false)
			this.setState((state, pros) => ({
				current_char: event.key,
				current_char_index: index - 1,
				chars_typed: new_chars_typed,
				chars_success: new_chars_success,
				stats_accuracy: ((correct_num / new_chars_typed.length) * 100).toFixed(2),
				stats_progress: ((new_chars_typed.length / state.chars_to_type.length) * 100).toFixed(2),
			}))

		}
		if (event.key === "Escape") {

			this.setState({
				ready: false,
				chars_to_type: [],
				chars_success: [],
				chars_typed: [],

				current_char: "",
				current_char_index: -1,

				stats_correct: 0,
				stats_wrong: 0,
				stats_accuracy: 1,
				stats_progress: 0,
			})
			this.remove_char_class(this.state.current_char_index + 1, "cursor")
		}
	}

	handleKeyPress = (event) => {
		console.log(event.key)
		if (this.state.ready) {
			event.preventDefault()
			// event.key.preve

			let char_typed = event.key
			let new_chars_typed = [...this.state.chars_typed, char_typed]
			let index = this.state.chars_typed.length
			console.log("-----------------------------")
			console.log(index)
			let char_success = (
				this.state.chars_to_type[index] === new_chars_typed[index]
			)
			console.log(char_success)

			let correct_num = this.state.stats_correct + char_success

			if (!char_success) {
				this.add_char_class(index, "error")
			} else {
				this.remove_char_class(index, "error")
			}

			this.move_cursor(index + 1)
			this.setState((state, pros) => ({
				current_char: char_typed,
				current_char_index: index,
				chars_typed: new_chars_typed,
				chars_success: [...state.chars_success, char_success],
				stats_correct: correct_num,
				stats_wrong: state.stats_wrong + !char_success,
				stats_accuracy: ((correct_num / new_chars_typed.length) * 100).toFixed(2),
				stats_progress: ((new_chars_typed.length / state.chars_to_type.length) * 100).toFixed(2),
			}))
		} else {
			if (event.key === 'Enter') {
				this.setState({
					ready: true
				})
				this.move_cursor(0)
			}
		}
	};

	// add_char_class = (key_index, clasname) => {
	// 	const key = this.containerRef.current.querySelector('#char-' + key_index);
	// 	console.log(key)
	// 	key.classList.add(clasname)
	// }
	// remove_char_class = (key_index, clasname) => {
	// 	const key = this.containerRef.current.querySelector('#char-' + key_index);
	// 	console.log(key)
	// 	key.classList.remove(clasname)
	// }
	// move_cursor = (key_index, forward = true) => {
	// 	this.add_char_class(key_index, "cursor")
	// 	if (forward) {
	// 		if (key_index > 0) {
	// 			this.remove_char_class(key_index - 1, "code-char")
	// 			this.remove_char_class(key_index - 1, "cursor")
	// 		}
	// 	} else {
	// 		this.remove_char_class(key_index + 1, "cursor")
	// 		this.remove_char_class(key_index + 1, "code-char")
	// 		this.remove_char_class(key_index + 1, "error")
	// 	}
	// }

	componentDidMount() {
		window.addEventListener('keypress', this.handleKeyPress);
		window.addEventListener('keydown', this.handleKeyDown);
		let [final_code, chars_to_type] = augment_code(Prism.highlight(this.state.raw_code, Prism.languages.javascript, 'javascript'))
		this.setState((state, props) => ({
			code: final_code,
			chars_to_type
		}));
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.handleKeyPress);
	}

	get_game_state(game_state) {
		if (!game_state) {
			return (
				<div className="overlay">
					<div className="overlay-text">
						Press Enter to start
						<br />
						Press Esc to quit session
					</div>
				</div>
			)
		}
	}

	render() {
		return (
			<>
				{this.get_game_state(this.state.ready)}
				<pre>
					<code ref={this.containerRef} dangerouslySetInnerHTML={{ __html: this.state.code }} />
				</pre>
				<hr></hr>
				<div className='key-display' style={{ fontSize: '30px' }}>
					{this.state.current_char}
				</div>
				<div>
					<span>Typed chars index: {this.state.current_char_index} </span>
					<br />
					<span>Accuracy: {this.state.stats_accuracy}%</span>
					<br />
					<span>Process: {this.state.stats_progress}%</span>
				</div>
				<div>
					<span>Correct: {this.state.stats_correct} </span>
					<br />
					<span>Mistakes: {this.state.stats_wrong} </span>
					<br />
					<span>Last attempt: {this.state.chars_success[this.state.current_char_index] ? "Correct" : "Wrong"}
					</span>
				</div>
				<div>
					<h2>Please type: {this.state.chars_to_type[this.state.current_char_index + 1]}</h2>

				</div>

				<br /> <br />
				<div>{JSON.stringify(this.state.chars_to_type)}</div>
				<br /> <br />
				<div>{JSON.stringify(this.state.chars_typed)}</div>
				<br /> <br />
				<div>{JSON.stringify(this.state.chars_success)}</div>
				<hr />
				<Hands key_to_type={this.state.chars_to_type[this.state.current_char_index + 1]} />
			</>

		)
	}
}

export default CodeArea;