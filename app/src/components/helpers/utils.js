import {CURRENT_CLASSNAME} from "../constants";

function parse_string(content, chars_list) {
    let content_copy = []; // Create an empty array to store the wrapped string.
    for (let i = 0; i < content.length; i++) { // Iterate over each character in the provided string.
        let char = content[i]; // Get the current character.
        let classList = ' ' // Create an empty string to store the class list for the current character.
        // If the current character is a carriage return, add the 'enter' class to the class list.
        if (char.match(/\r/)) {
            classList += ' enter'
        }
        // If the current character is a new line, add the 'enter' class to the class list.
        if (char.match(/\n/)) {
            classList += ' enter'
        }
        // If the current character is a tab, add the 'tab' class to the class list.
        if (char.match(/\t/)) {
            classList += ' tab'
        }


        if (chars_list.length == 0) {
            content_copy.push(`<span class="code-char ${CURRENT_CLASSNAME} ${classList}" + id='char-${chars_list.length}'>${char}</span>`)
        } else {
            content_copy.push(`<span class="code-char ${classList}" id='char-${chars_list.length}'>${char}</span>`)
        }

        // Wrap the current character in a span tag with an appropriate class and ID.
        // The ID is set to the current length of the chars_list.
        // If the chars_list is empty, also add the CURRENT_CLASSNAME to the class list.

        chars_list.push(char) // Add the current character to the chars_list.
        
    }

    return content_copy.join("")
}
//recursively traverses the HTML DOM tree and replaces all text nodes with styled <span> elements
function recursive_parse(el, chars) {
    if (el.nodeName !== "#text") { // If the current element is not a text node

        if (el.innerHTML === el.innerText) { // If the element has no child elements (i.e. only contains text)
            el.innerHTML = parse_string(el.innerHTML, chars) // Apply styling to the text content of the element
        } else { // If the element has child elements
            for (let i = 0; i < el.childNodes.length; i++) {
                recursive_parse(el.childNodes[i], chars) // Recursively call the function on each child element
            }
        }
    } else {  // If the current element is a text node
        let span = document.createElement("span");// Create a new <span> element
        span.innerHTML = parse_string(el.textContent, chars) // Apply styling to the text content of the <span> element
        el.parentNode.replaceChild(span, el) // Replace the text node with the <span> element
    }
}

// This function augments the provided HTML code by parsing it and returning an array of characters that need to be typed
function augment_code(html_code) {
    let div = document.createElement("div"); // Create a new <div> element
    div.innerHTML = html_code // Set the HTML content of the <div> element to the provided code
    let chars_to_type = [] // Initialize an empty array to store the characters that need to be typed
    recursive_parse(div, chars_to_type)  // Call the recursive_parse function to apply styling to the HTML code and generate the chars_to_type array
    return [div.innerHTML, chars_to_type] // Return an array containing the styled HTML code and the chars_to_type array
}

export default augment_code;