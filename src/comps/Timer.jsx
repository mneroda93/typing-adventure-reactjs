import '../styles/Timer.css';
import {useEffect, useRef, useState} from "react";

export default function Timer({started, finished, getTime}) {


  const [seconds, setSeconds] = useState(0);

  const countdown = useRef(null);

  useEffect(() => {
    if (started) {
      countdown.current = setTimeout(() => {
        setSeconds(seconds + 1);
        getTime(seconds + 1);
      }, 1000);
    } else {
      clearInterval(countdown.current);
      setSeconds(0);
    }
    return () => clearInterval(countdown.current);
  }, [seconds, started]);

  const h = Math.floor(seconds / 60 / 60);
  const m = Math.floor(seconds / 60) % 60;
  const s = seconds % 60;

  if (finished) {
    getTime(seconds);
    clearInterval(countdown.current);
  }

  return (
    <div className="Timer">
      <div className="Container">
        <span>{h < 10 ? '0' + h : h}</span>
        <span>:</span>
        <span>{m < 10 ? '0' + m : m}</span>
        <span>:</span>
        <span>{s < 10 ? '0' + s : s}</span>
      </div>
    </div>
  )
}
