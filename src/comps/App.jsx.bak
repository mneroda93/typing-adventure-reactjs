import '../styles/App.css';
import wallpaper from '../assets/wallpaper.jpg';
import {useEffect, useRef, useState} from "react";
import WordsJSON from '../assets/words.json';
import {ReactComponent as LinkedInSVG} from "../assets/linkedin.svg";
import Timer from "./Timer";
import Words from "./Words";
import Stats from "./Stats";
import "../assets/Merriweather-Light.ttf";

export default function App() { // create pool of indexes and by random length of the pool, pull out one index - best

  const wordsGenerator = () => {
    const orderedIndexes = (() => { // arr of ordered integers 0 -> 999
      const indexes = [];
      let i = 0;
      for (i; i < 1000; i++) {
        indexes.push(i);
      }
      return indexes;
    })();
    let wordsStr = '';
    let i = 0;
    for (i; i < 30; i++) {
      const rnd = Math.floor(Math.random() * orderedIndexes.length);
      wordsStr += WordsJSON[rnd] + ' ';
      orderedIndexes.splice(rnd, 1);
    }
    return wordsStr;
  }

  const [words, setWords] = useState(wordsGenerator());

  const timeRef = useRef(0);
  const kpmRef = useRef(0);
  const wpmRef = useRef(0);
  const typosRef = useRef(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const divRef = useRef(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div
        tabIndex="0"
        className="app"
        ref={divRef}
        style={{backgroundImage: `url("${wallpaper}")`}}
        onKeyDown={(e) => {
          if (!finished) {
            if (e.key === words.charAt(index)) {
              kpmRef.current = kpmRef.current + 1;
              if (e.key === ' ') {
                wpmRef.current = wpmRef.current + 1;
              }
              setIndex(index + 1);
            } else {
              typosRef.current = typosRef.current + 1;
              setRefresh(!refresh);
            }
            if (index > words.length - 2) {
              setFinished(true);
            }
            if (!started) {
              setStarted(true);
            }
          }
        }}
      >
        <div style={{textAlign: 'center'}}>
          <span style={{fontSize: '2rem', textShadow: '3px 3px 1px rgba(0,0,0,0.2)'}}>Welcome to</span>
          <span style={{fontSize: '5rem', textShadow: '3px 3px 1px rgba(0,0,0,0.2)'}}>Typing Adventure</span>
          <div>
            <span style={{fontSize: '1.5rem', textShadow: '3px 3px 1px rgba(0,0,0,0.2)'}}>Have you ever wondered how many words you can type a minute?</span>
            <div>
              <span style={{fontSize: '1.5rem', textShadow: '3px 3px 1px rgba(0,0,0,0.2)'}}><span
                style={{color: 'orange'}}>Start typing</span> and find out!</span>
            </div>
          </div>
        </div>
        <Timer
          started={started}
          finished={finished}
          timeRef={timeRef}
        />
        <Words
          words={words}
          index={index}
        />
        <Stats
          kpmRef={kpmRef}
          wpmRef={wpmRef}
          typosRef={typosRef}
          restart={() => {
            kpmRef.current = 0;
            wpmRef.current = 0;
            typosRef.current = 0;
            timeRef.current = 0;
            setWords(wordsGenerator());
            setStarted(false);
            setFinished(false);
            setIndex(0);
          }}
          timeRef={timeRef}
        />
      </div>
      <LinkedInSVG
        className="linkedIn"
        onClick={() => {
          const url = 'https://www.linkedin.com/in/mneroda93';
          if (window.confirm(`You are about to visit ${url}`))
            window.open(url, '_blank', 'noopener');
        }}
      />
    </>
  );
}
