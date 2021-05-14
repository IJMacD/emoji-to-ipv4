import { useState } from 'react';
import utf8 from 'utf8';
import './App.css';
import { findAssignment } from './address';

function App() {
  const [ input, setInput ] = useState("");

  const ipList = [...input].map(c => [...utf8.encode(c).padStart(4, "\0")].map(b => b.charCodeAt(0)));

  return (
    <div className="App">
      <input className="EmojiInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter some characters" />
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
