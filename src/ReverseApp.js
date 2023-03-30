import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

export default function ReverseApp() {
  const [ input, setInput ] = useState("");
  const [ myIP, setMyIP ] = useState("");

  useEffect(() => {
    fetch(`https://api.ipify.org?format=json`).then(r => r.json()).then(d => {
      setInput(input => (input === "") ? d.ip : input);
      setMyIP(d.ip);
    });
  }, []);

  const bytes = parseIPv4(input);

  const isValid = bytes !== null;

  let utf8String = null;

  try {
    if (isValid)
      utf8String = new TextDecoder("utf-8", {fatal: true}).decode(new Uint8Array(bytes).buffer);
  }
  catch (e) {}

  let win1252String = null;

  try {
    if (isValid)
      win1252String = new TextDecoder("windows-1252", {fatal: true}).decode(new Uint8Array(bytes).buffer);
  }
  catch (e) {}

  let utf16String = null;

  try {
    if(isValid)
      utf16String = String.fromCharCode(...new Uint16Array(new Uint8Array(bytes).buffer));
  }
  catch (e) {}

  let utf32String = null;

  try {
    if (isValid)
      utf32String = String.fromCodePoint(...new Uint32Array(new Uint8Array(bytes).buffer));
  }
  catch (e) {}

  const examples = ["240.159.146.169","61.216.6.222","119.111.114.107","112.108.97.121","116.105.116.115","67.79.67.75","240.159.144.147","96.79.125.89","123.244.1.0"];

  return (
    <div className="ReverseApp">
      <input className="EmojiInput" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter an IPv4 address" />
      { bytes && <p className="ByteList">Hex Bytes: {bytes.map((c, i) => <span key={i}>{c.toString(16).toUpperCase().padStart(2, "0")}</span>)}</p> }
      { myIP && <p className="Examples">My IP: <button className="LinkButton" onClick={() => setInput(myIP)}>{myIP}</button></p> }
      <p className="Examples">Examples: {examples.map((example, i) => <button key={i} className="LinkButton" onClick={() => setInput(example)}>{example}</button>)}</p>
      {
        bytes && utf8String &&
          <div className="IPEntry">
            <p className="IPAddress">{utf8String}</p>
            <p className="Status">UTF-8 String</p>
            <p className="Bytes">{bytes.map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ")}</p>
          </div>
      }
      {/* {
        bytes &&
          <div className="IPEntry">
            <p className="IPAddress">{String.fromCharCode(...bytes)}</p>
            <p className="Status">Unicode Code Points</p>
            <p className="Bytes">{bytes.map(b => "U+" + b.toString(16).toUpperCase().padStart(2, "0")).join(" ")}</p>
          </div>
      } */}
      {
        bytes && win1252String &&
          <div className="IPEntry">
            <p className="IPAddress">{win1252String}</p>
            <p className="Status">Windows-1252</p>
            <p className="Bytes">{bytes.map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ")}</p>
          </div>
      }
      {
        utf16String &&
          <div className="IPEntry">
            <p className="IPAddress">{utf16String}</p>
            <p className="Status">UTF-16 String<br /><span style={{fontSize:"0.8em"}}>(Little Endian)</span></p>
            <p className="Bytes">{utf16String.split("").map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(4,"0")).join(" ")}</p>
          </div>
      }
      {
        utf32String &&
          <div className="IPEntry">
            <p className="IPAddress">{utf32String}</p>
            <p className="Status">UTF-32 String<br /><span style={{fontSize:"0.8em"}}>(Little Endian)</span></p>
            <p className="Bytes">{utf32String.codePointAt(0).toString(16).toUpperCase().padStart(8,"0")}</p>
          </div>
      }
    </div>
  );
}

/**
 *
 * @param {string} text
 * @returns {[number, number, number, number]?}
 */
function parseIPv4 (text) {
  if (typeof text !== "string") return null;

  const parts = text.split(".");

  if (parts.length !== 4) return null;

  const bytes = /** @type {[number, number, number, number]} */(parts.map(p => parseInt(p)));

  if (!bytes.every(b => b >= 0 && b < 256)) return null;

  return bytes;
}