import React, { Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';

function Toolbar() {
  return (
    <div id='toolbar'>
      <div className='logo'>
        CODE <br />
        GYM
      </div>
      <div className='selection-container'>
        {/* <select name='' className='language-select'>
          <option value='javascript'>Javascript</option>
          <option value='python'>Python</option>
          <option value='c++'>C++</option>
        </select> */}

        <Dropdown>
          <Dropdown.Toggle variant='dark' id='dropdown-basic'>
            JavaScript
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#'>JavaScript</Dropdown.Item>
            <Dropdown.Item href='#'>Python</Dropdown.Item>
            <Dropdown.Item href='#'>C++</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div
          id='zen-mode-toggle'
          aria-label='zen mode toggle'
          title='Toggle Zenmode'></div>
        <div
          id='dark-mode-toggle'
          aria-label='dark mode toggle'
          title='Toggle Darkmode'></div>
      </div>
    </div>
  );
}

export default Toolbar;
