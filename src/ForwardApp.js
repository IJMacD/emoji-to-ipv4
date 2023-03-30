import { useState } from 'react';
import './App.css';
import { findAssignment } from './address';
import React from 'react';

export default function ForwardApp() {
  const [ input, setInput ] = useState("");
  const [ ignoreSpaces, setIgnoreSpaces ] = useState(false);

  const haveSpaces = /\s/.test(input);

  const utf8Bytes = new TextEncoder().encode(ignoreSpaces ? input.replace(/\s/g, "") : input);

  let ipList = new Uint32Array(utf8Bytes.buffer.slice(0, utf8Bytes.byteLength - (utf8Bytes.byteLength % 4)));

  const examples = ["💩","😆","Bell","AT&T","MSFT","née","ping","Fuck","shit","Zoë","لا"];

  return (
    <div className="ForwardApp">
      <input className="EmojiInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter some characters" />
      { utf8Bytes.byteLength > 0 && <p className="ByteList">UTF-8 Bytes: {[...utf8Bytes].map((c, i) => <span key={i}>{c.toString(16).toUpperCase().padStart(2, "0")}</span>)}</p> }
      { haveSpaces && <label><input type="checkbox" checked={ignoreSpaces} onChange={e => setIgnoreSpaces(e.target.checked)} />Ignore Spaces</label> }
      <p className="Examples">Examples: {examples.map((example, i) => <button key={i} className="LinkButton" onClick={() => setInput(example)}>{example}</button>)}</p>
      {
        [...ipList].map((ip, i) => {
          const octet0 = ip & 0xFF;
          const octet1 = (ip >> 8) & 0xFF;
          const octet2 = (ip >> 16) & 0xFF;
          const octet3 = (ip >> 24) & 0xFF;

          const ipv4 = `${octet0}.${octet1}.${octet2}.${octet3}`;
          const assignment = findAssignment(octet0);

          return (
            <div key={i} className="IPEntry">
              <p className="IPAddress">{ipv4}</p>
              { assignment && <p className="Status">{assignment.Status} - {assignment.Designation}</p> }
              <p className="Lookup"><a href={`https://db-ip.com/${ipv4}`} target="_blank" rel="noreferrer">Lookup</a></p>
            </div>
          );
        })
      }
    </div>
  );
}
