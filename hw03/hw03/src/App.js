import React from 'react';
import ReactDOM from 'react-dom';
import { uniq, randNum, passesChecks } from './bullfuncs';
import './App.css';

/*
class Guess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      bulls: null,
      cows: null
    }
  }
  render() {
    return (
      <tr className="guess">
        <td>{this.state.value}</td>
        <td>{this.state.bulls}B{this.state.cows}C</td>
      </tr>
    )
  }
}

function GameOver({reset}) {
  return (
    <div className="App">
    <h1>Game Over!</h1>
    <p>
    <button onClick={reset}>
    Reset
    </button>
    </p>
    </div>
  );
}
*/

class GuessTable extends React.Component {
  render() {
    return (
      <tbody>
        {this.props.guesses.map(guess => (
          <tr>
            <td>{guess.value}</td>
            <td>{guess.bulls}B{guess.cows}C</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

class BullsAndCows extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: "1234", guesses: [], text: ''};
    this.guess = this.guess.bind(this);
    this.updateText = this.updateText.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  render() {
    return (
      <div className="BullsAndCows">
      <p>
      <input type="text"
      value={this.state.text}
      onChange={this.updateText}
      onKeyPress={this.keyPress}/>
      <button onClick={this.guess}>Guess</button>
      </p>
      <table>
      <thead>
      <tr>
      <th>Guess</th>
      <th>Result</th>
      </tr>
      </thead>
      <GuessTable guesses={this.state.guesses}/>
      </table>
      <p>
      <button>
      Reset
      </button>
      </p>
      </div>
    );
  }

  resetGame(){
    let num = randNum();
    this.setState({number: num, guesses: [], text: ''});
  }

  updateText(ev) {
    let vv = ev.target.value;
    let cc = vv.substring(0, Math.min(vv.length, 4));
    this.setState({ text: cc });
  }

  keyPress(ev) {
    if (ev.key === "Enter") {
      this.guess();
    }
  }

  guess() {
    if (passesChecks(this.state.text)){
      let bullscows = findBC(this.state.number, this.state.text);
      const newGuess = {
        value: this.state.text,
        bulls: bullscows[0],
        cows: bullscows[1]
      }
      let ng = uniq(this.state.guesses.concat(newGuess));
      console.log("ng", ng);
      this.setState({ guesses: ng });
    }
  }

}

export default BullsAndCows;
