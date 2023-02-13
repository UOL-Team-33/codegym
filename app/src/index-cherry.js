//call react
import React from "react"

//call reactDom
import ReactDOM from "react-dom/client"
import { useState, useEffect } from 'react';

//call CSS
import "./index.css"

//create component
function Header()
{

  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => 
  {
    if (theme === 'light') {
    setTheme('dark');
    } else {
    setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
    }, [theme]);


  return <section>
    <section className="secOne">
      <h1 className="logo">
        <p>Code</p>
        <p>Gym</p>
      </h1>
      <select className="select">
      <option value="1">JavaScript</option>
      <option value="2">C++</option>
      </select>
      <div className="toggle">
        <div className={`Header ${theme}`}>
        <button id="darkMode" onClick={toggleTheme}><img src="https://via.placeholder.com/300.png/09f/fff "/></button> 
        </div> 
      </div>
      <div className="toggle">
        <img src="https://via.placeholder.com/300.png/09f/fff "/>
      </div>    
    </section>

    <section className="secTwo">
      <h1 id="timer">01:43</h1>
      <h1 id="wpm">47 WPM</h1>
      <h1 id="acc">95 ACC</h1>
    </section>

    <section className="secThree">
      <p id="codesnippets">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In leo lacus, pulvinar vel tellus sit amet, vehicula aliquam justo. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac tristique tellus. Aliquam quis rhoncus diam. Ut faucibus massa quis felis vulputate luctus. Nulla eros lectus, porttitor id egestas eget, elementum quis lectus. Proin ac nisl interdum, fringilla velit ac, hendrerit nisi. Fusce vulputate gravida accumsan. Integer quis ipsum non ligula luctus finibus.
      </p>
    </section>

    <section className="secFour">
      <button id="help">Help</button>
    </section>  

  </section>

}

//to display on screen
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Header/>);
//ReactDOM.render(<Greeting/>,document.getElementById("root"));

