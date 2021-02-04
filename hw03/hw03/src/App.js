import React from 'react';
import ReactDOM from 'react-dom';
import { uniq, randNum, passesChecks, findBC, hasWon } from './bullfuncs';
import './App.css';

function GameOver(props) {
  return (
    <div>
    <h1>Game Over!</h1>
    <p>The number was {props.number}.</p>
    <p>Play again?</p>
    <p>
    <button onClick={props.onClick}>
    Reset
    </button>
    </p>
    </div>
  );
}

function Victory(props) {
  return (
      <div>
        <h1>You won!</h1>
        <p>The number was {props.number}.</p>
        <p>Play again?</p>
        <p>
          <button onClick={props.onClick}>
          Reset
          </button>
        </p>
      </div>);
}

function GuessTable(props) {
    return (
      <tbody>
        {props.guesses.map(guess => (
          <tr id={guess.key}>
            <td>{guess.value}</td>
            <td>{guess.bulls}B{guess.cows}C</td>
          </tr>
        ))}
      </tbody>
    );
}

class BullsAndCows extends React.Component {
  constructor(props) {
    super(props);
    let num = randNum();
    this.state = { number: num, guesses: [], text: ''};
    this.guess = this.guess.bind(this);
    this.updateText = this.updateText.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  render() {
    let body = (<div className="BullsAndCows">
    <h1>Bulls and Cows</h1>
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
      <button onClick={this.resetGame}>
      Reset
      </button>
    </p>
    </div>);
    if (hasWon(this.state.guesses, this.state.number)) {
      body = (<Victory number={this.state.number} onClick={this.resetGame}/>);
    } else if (this.state.guesses.length > 7) {
      body = (<GameOver number={this.state.number} onClick={this.resetGame}/>);
    }
    return (
      <div className="container">
      {body}
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
        key: this.state.guesses.length,
        value: this.state.text,
        bulls: bullscows[0],
        cows: bullscows[1]
      }
      let ng = uniq(this.state.guesses.concat(newGuess));
      this.setState({ guesses: ng });
    }
  }
}

export default BullsAndCows;
