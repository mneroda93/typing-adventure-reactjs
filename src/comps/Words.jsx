import '../styles/Words.css';
import React from "react";

export default function Words({words, index}) {

  return (
    <div className="words">
      <pre className="wrapper">
        {words.slice(0, index)}
        <span className="marked" style={{display: 'inline'}}>
          {words.charAt(index)}
        </span>
        {words.slice(index + 1, words.length)}
      </pre>
    </div>
  );
}
