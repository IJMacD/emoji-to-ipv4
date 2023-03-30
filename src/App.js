import React, { useState } from 'react';
import './App.css';
import ForwardApp from './ForwardApp';
import ReverseApp from './ReverseApp';

function App() {
  const [ mode, setMode ] = useState("forward");

  if (mode === "forward") {
    return (
      <div className="App">
        <ForwardApp />
        <p>
          IPv4 addresses are 4 bytes long. Emoji are often 4 bytes long too (when encoded
          in UTF-8, UTF-16, or UTF-32). It's also possible to have other strings which are
          multiples of 4 bytes when encoded. Why not show the equivalent IPv4 address for
          a given emoji or other UTF-8 sequence?
        </p>

        <p>This page does that. (As pointless as it is.)</p>
        <button className="LinkButton" onClick={() => setMode("reverse")}>IPv4 to Text</button>
      </div>
    );
  }

  return (
    <div className="App">
      <ReverseApp />
      <p>
        IPv4 addresses are 4 bytes long. What would we get if we interpreted those 4 bytes
        as text (checking multiple possible encodings)?
      </p>
      <p>This page answers that pointless question.</p>
      <button className="LinkButton" onClick={() => setMode("forward")}>Text to IPv4</button>
    </div>
  );
}

export default App;
