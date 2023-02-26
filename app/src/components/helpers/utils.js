import { CURRENT_CLASSNAME } from '../constants';

function parse_string(content, chars_list) {
  let content_copy = [];
  for (let i = 0; i < content.length; i++) {
    let char = content[i];
    let classList = ' ';
    // console.log('888888888888888888888888888888888888888888888')
    // if (codeObj.character === '\n') {
    if (char.match(/\r/)) {
      classList += ' enter';
    }
    if (char.match(/\n/)) {
      classList += ' enter';
    }
    if (char.match(/\t/)) {
      classList += ' tab';
    }

    if (chars_list.length == 0) {
      content_copy.push(
        `<span class="code-char ${CURRENT_CLASSNAME} ${classList}" + id='char-${chars_list.length}'>${char}</span>`
      );
    } else {
      content_copy.push(
        `<span class="code-char ${classList}" id='char-${chars_list.length}'>${char}</span>`
      );
    }
    chars_list.push(char);
  }
  return content_copy.join('');
}

function recursive_parse(el, chars) {
  if (el.nodeName !== '#text') {
    if (el.innerHTML === el.innerText) {
      el.innerHTML = parse_string(el.innerHTML, chars);
    } else {
      for (let i = 0; i < el.childNodes.length; i++) {
        recursive_parse(el.childNodes[i], chars);
      }
    }
  } else {
    let span = document.createElement('span');
    span.innerHTML = parse_string(el.textContent, chars);
    el.parentNode.replaceChild(span, el);
  }
}

function augment_code(html_code) {
  let div = document.createElement('div');
  div.innerHTML = html_code;
  let chars_to_type = [];
  recursive_parse(div, chars_to_type);
  return [div.innerHTML, chars_to_type];
}

export default augment_code;
