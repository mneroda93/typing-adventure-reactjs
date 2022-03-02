import '../styles/Words.css';
import React from "react";

export default function Words({words, index}) {
  const finished = index + 1 > words.length;
  const spaceLetter = words[index] === ' ';
  return (
    <div className="words">
      <pre className="wrapper">
        <span className="done">
          {words.slice(0, index)}
        </span>
        <span
          className={finished ? "" : (spaceLetter ? "marked-space" : "marked")}
          style={{display: 'inline'}}
        >
          {words.charAt(index)}
        </span>
        {words.slice(index + 1, words.length)}
      </pre>
    </div>
  );
}
