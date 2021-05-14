import { useEffect, useState } from 'react';
import utf8 from 'utf8';
import './App.css';

export default function ReverseApp() {
  const [ input, setInput ] = useState("");

  useEffect(() => {
    fetch(`https://freegeoip.app/json/`).then(r => r.json()).then(d => {
      setInput(input => {
        if (input === "") {
          return d.ip;
        }
        return input;
      });
    });
  }, []);

  const bytes = parseIPv4(input);

  const isValid = bytes !== null;

  const codePointString = isValid && String.fromCodePoint(...bytes);

  let utf8String = null;

  if (isValid) {
    try {
      utf8String = utf8.decode(codePointString);
    } catch (e) {}
  }

  return (
    <div className="App">
      <input className="EmojiInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter an IPv4 address" />
      {
        codePointString &&
          <div className="IPEntry">
            <p className="IPAddress">{codePointString}</p>
            <p className="Status">Code Points</p>
          </div>
      }
      {
        utf8String &&
          <div className="IPEntry">
            <p className="IPAddress">{utf8String}</p>
            <p className="Status">UTF-8 String</p>
          </div>
      }
    </div>
  );
}

/**
 *
 * @param {string} text
 * @returns {[number, number, number, number]}
 */
function parseIPv4 (text) {
  if (typeof text !== "string") return null;

  const parts = text.split(".");

  if (parts.length !== 4) return null;

  const bytes = parts.map(p => parseInt(p));

  if (!bytes.every(b => b >= 0 && b < 256)) return null;

  return bytes;
}