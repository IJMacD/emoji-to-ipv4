import { useState } from 'react';
import utf8 from 'utf8';
import './App.css';
import { findAssignment } from './address';

function App() {
  const [ input, setInput ] = useState("");

  const utf8Bytes = utf8.encode(input);

  let ipList = input.length > 0 ? utf8Bytes.match(/.{1,4}/g).map(s => [...s.padEnd(4,"\0")].map(c => c.charCodeAt(0))) : [];

  return (
    <div className="App">
      <input className="EmojiInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter some characters" />
      <p className="ByteList">{[...utf8Bytes].map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")}</p>
      {
        ipList.map((ip, i) => {
          const ipv4 = `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}`;
          const assignment = findAssignment(ip[0]);

          return (
            <div key={i} className="IPEntry">
              <p className="IPAddress">{ipv4}</p>
              <p className="Status">{assignment.Status} - {assignment.Designation}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
