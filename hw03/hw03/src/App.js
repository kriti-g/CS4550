import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { uniq, randNum, passesChecks, findBC, hasWon } from './bullfuncs';
import './App.css';

function GameOver(props) {
  return (
    <div class="row">
    <div class="col-sm-6">
    <h1>Game Over!</h1>
    <p>The number was {props.number}.</p>
    <p>Play again?</p>
    <p>
    <button onClick={props.onClick}>
    Reset
    </button>
    </p>
    </div>
    </div>
  );
}

function Victory(props) {
  return (
    <div class="row">
    <div class="col-sm-6">
        <h1>You won!</h1>
        <p>The number was {props.number}.</p>
        <p>Play again?</p>
        <p>
          <button onClick={props.onClick}>
          Reset
          </button>
        </p>
    </div>
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


function BullsAndCows() {
  const [number, setNumber] = useState(randNum());
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState('');

  function resetGame(){
    setNumber(randNum());
    setGuesses([]);
    setText('');
  }

  function updateText(ev) {
    let vv = ev.target.value;
    let cc = vv.substring(0, Math.min(vv.length, 4));
    setText(cc);
  }

  function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();
    }
  }

  function guess() {
    if (passesChecks(text)){
      let bullscows = findBC(number, text);
      const newGuess = {
        key: guesses.length,
        value: text,
        bulls: bullscows[0],
        cows: bullscows[1]
      }
      let ng = uniq(guesses.concat(newGuess));
      setGuesses(ng);
      setText('');
    }
  }

  let body = (
  <div class="row">
  <div class="col-sm-6">
  <h1>Bulls and Cows</h1>
  <p>
    <input type="text"
    value={text}
    onChange={updateText}
    onKeyPress={keyPress}/>
    <button onClick={guess}>Guess</button>
  </p>
  <table class="table-striped">
    <thead class="thead-light">
      <tr>
        <th>Guess</th>
        <th>Result</th>
      </tr>
    </thead>
      <GuessTable guesses={guesses}/>
  </table>
  <p>
    <button onClick={resetGame}>
    Reset
    </button>
  </p>
  </div>
  <div class="col-sm-6">
  <p>
    When you guess, the game will tell you how many bulls (B) and cows (C) you
    got in that guess. A bull means the right number in the right place, and a
     cow means the right number in the wrong place. Good luck!
  </p>
  </div>
  </div>);

  if (hasWon(guesses, number)) {
    body = (
      <Victory number={number} onClick={resetGame}/>);
  } else if (guesses.length > 7) {
    body = (
      <GameOver number={number} onClick={resetGame}/>);
  }
  console.log("toguess: "+ number);
  return (
    <div class="container p-3 my-3">
    {body}
    </div>
  );
}

export default BullsAndCows;
