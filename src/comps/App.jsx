import '../styles/App.css';
import wallpaper from '../assets/wallpaper.jpg';
import {useEffect, useRef, useState} from "react";
import WordsJSON from '../assets/words.json';
import {ReactComponent as LinkedInSVG} from "../assets/linkedin.svg";
import Timer from "./Timer";
import Words from "./Words";
import Stats from "./Stats";

export default function App() {

  const wordsGenerator = () => {
    const indexes = (() => {
      const arr = [];
      let i = 0;
      for (i; i < 30; i++)
        arr[i] = i;
      return arr;
    })();
    let wordsStr = '';
    let i = indexes.length;
    for (i; i > 0; i--) {
      const rndIndex = Math.floor(Math.random() * i);
      wordsStr += WordsJSON[indexes[rndIndex]] + ' ';
      indexes.splice(rndIndex, 1);
    }
    return wordsStr;
  }

  const [words, setWords] = useState(wordsGenerator());

  const [time, setTime] = useState(0);

  const getTime = (timeTook) => {
    setTime(timeTook);
  }

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
  }, [divRef.current]);

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
            if (index > 108) {
              setFinished(true);
            }
            if (!started) {
              setStarted(true);
            }
          }
        }}
      >
        <Timer
          started={started}
          finished={finished}
          getTime={getTime}
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
            setWords(wordsGenerator());
            setStarted(false);
            setFinished(false);
            setTime(0);
            setIndex(0);
          }}
          time={time}
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
