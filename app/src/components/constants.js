import {loadFile} from "./helpers/loadCode";

export const CURRENT_CLASSNAME = "current"
export const CHAR_CLASSNAME = "code-char"
export const ERROR_CLASSNAME = "error"

export const DEFAULT_STATE = {
    ready: false,
    code: "",

    chars_to_type: [],
    chars_success: [],
    chars_typed: [],

    current_char: "",
    current_char_index: 0,
    max_index: 0,

    stats_correct: 0,
    stats_wrong: 0,
    stats_accuracy: 1,
    stats_progress: 0,
}

export const GameState = {
    Ready: 0,
    Started: 1,
    Finished: 2,
}


export const LANGUAGES = {
    python: {
        sample: "/code-files/sample-code.py",
        key: "language-py"
    },
    javascript: {
        sample: "/code-files/sample-code.js",
        key: "language-javascript"
    },
}
