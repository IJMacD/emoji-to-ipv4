import { useState } from 'react';
import './App.css';
import ForwardApp from './ForwardApp';
import ReverseApp from './ReverseApp';

function App() {
  const [ mode, setMode ] = useState("forward");

  if (mode === "forward") {
    return (
      <div>
        <ForwardApp />
        <button className="ModeButton" onClick={() => setMode("reverse")}>IPv4 to Text</button>
      </div>
    );
  } else {
    return (
      <div>
        <ReverseApp />
        <button className="ModeButton" onClick={() => setMode("forward")}>Text to IPv4</button>
      </div>
    );
  }
}

export default App;
