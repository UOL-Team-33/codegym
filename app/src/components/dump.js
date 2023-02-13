  




  //   clearInterval(this.timerID);

  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     1000
  //   );
  // }

//   shouldComponentUpdate(nextProps, nextState) {
    // return true
    // if (this.props.raw_code !== nextProps.raw_code) {
    //   return true;
    // }
    // if (this.state.raw_count !== nextState.raw_count) {
    //   return true;
    // }
    // return false;
//   }

// Prism.hooks.add('after-tokenize', function (env) {
//   env.tokens.forEach(token => {
//   });
// });

// let index = 0;
// Prism.hooks.add('wrap', function(env) {
//   if (index <= (code_size+50)) {
//     if (typeof env.content === 'string') {
//       console.log("*******************************************************************")
//       console.log(env)
//       console.log(index, code_size)
//       // if (env.type === "parameter") {
//       //   let div = document.createElement("div");
//       //   div.innerHTML = env.content;
//       //   let text = div.textContent || div.innerText || "";
//       //   console.log(text)
//       //   console.log("-------------------------------------------------------")
//       // }
//       // console.log(env.values())
//       let div = document.createElement("div");
//       div.innerHTML = env.content;

//       console.log(div.children)
//       console.log(div.textContent)

//       if (env.content.indexOf("span") === -1) {
//         // let text = div.textContent || div.innerText || "";
//         // env.content = text
//         let [new_token, num] = parse_string(env.content, index)
//         env.content = new_token
//         index += num;
//       }

//     }
//   }
// });

// Prism.hooks.add('stringify', function(env) {
//   env.code = env.code.split('\n').map(function(line) {
//     return 'FEEE<span class="custom-class">' + line + '</span>';
//   }).join('\n');
// });

// Prism.hooks.add('after-insert', function(env) {
//   console.log("----------------------------------")
//   console.log("----------------------------------")
//   console.log("----------------------------------")
//   console.log("----------------------------------")
//   console.log("----------------------------------")
//   env.highlightedCode = env.highlightedCode.replace(/<pre>/g,'<pre class="custom-class">');
// });


// render() {
//   return <input type="text" ref={this.inputRef} />;
// }

// componentDidMount() {
//   this.inputRef.current.focus();
// }













// class Bike extends React.Component {
//   constructor(props) {
//     super(props);
//      this.state = {
//       make: "Yamaha",
//       model: "R15",
//       color: "blue"
//     };
//   }

//   changeBikeColor = () => {
//     this.setState({color: "black"});
//   }

//   render() {
//     return (
//       <div>
//         <h2>My {this.state.make}</h2>
//         <p>
//           It is a {this.state.color}
//           {this.state.model}.
//         </p>

//         <button
//           type="button"
//           onClick={this.changeBikeColor}
//         >Change color</button>
//       </div>
//     );
//   }
// }


// class Clock extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }


// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }







// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     fetchPosts().then(response => {
//       this.setState({
//         posts: response.posts
//       });
//     });

//     fetchComments().then(response => {
//       this.setState({
//         comments: response.comments
//       });
//     });
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date()
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// }


// class CodeArea2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { counter: 0 };
//     // this.handleClick = this.handleClick.bind(this);
//     this.inputRef = React.createRef();
//   }
//   componentDidMount() {

//   }
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }
