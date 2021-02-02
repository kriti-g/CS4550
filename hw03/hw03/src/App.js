import logo from './logo.svg';
import { useState } from 'react';
import { uniq, bad_guesses, word_view, lives_left } from './bullfuncs';
import './App.css';



function App() {
  const [number, setNumber] = useState(randNum());
  const [guesses, setGuesses] = useState([]);
  // fixme: guesses should be a set
  const [text, setText] = useState("");

  let bads = bad_guesses(secret, guesses);
  let lives = lives_left(secret, guesses);

  function updateText(ev) {
    let vv = ev.target.value;
    let cc = vv.substring(0, Math.min(vv.length, 4));
    setText(cc);
  }

  function guess() {
    if (text.length === 4) {
      if (text[0] != "0"){
        let set = new Set();
        for (let ch of text.split('')){
          set.add(ch);
        }
        if (set.size === 4){
          let ng = uniq(guesses.concat(text));
          console.log("ng", ng);
          setGuesses(ng);
        } else {
          alert("All digits must be unique.");
        }
      } else {
        alert("First digit cannot be 0.");
      }
    } else {
      alert("Need exactly 4 digits.");
    }
  }

  function keyPress(ev) {
    if (ev.key == "Enter") {
      guess();
    }
  }

  if (lives <= 0) {
    return <GameOver reset={() => setGuesses([])} />;
  }

  return (
    <div className="App">
      <h1>Bads: {bads.join(' ')}</h1>
      <h1>Lives: {lives}</h1>
      <p>
        <input type="text"
               value={text}
               onChange={updateText}
               onKeyPress={keyPress} />
        <button onClick={guess}>Guess</button>
      </p>
      <table>
        <thead>
          <tr>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
      </table>
      <p>
        <button onClick={() => setGuesses([])}>
          Reset
        </button>
      </p>
    </div>
  );
}

export default App;
