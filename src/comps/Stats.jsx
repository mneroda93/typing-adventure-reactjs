import '../styles/Stats.css';
import {ReactComponent as RestartSVG} from "../assets/restart.svg";

export default function Stats(
  {
    kpmRef,
    wpmRef,
    typosRef,
    restart,
    timeRef,
  }
) {

  const kpm = kpmRef.current;
  const typos = typosRef.current;
  const accuracy = (() => {
    if (kpm === 0 && typos === 0) {
      return 100;
    } else if (kpm === 0 && typos > 0) {
      return 0;
    } else {
      const totalKeys = kpm + typos;
      return (kpm / totalKeys * 100).toFixed(1);
    }
  })();

  const wpm = timeRef.current === 0 ? 0 : 60 / timeRef.current * wpmRef.current

  return (
    <>
      <div className="Dashboard">
        <div className="stats">
          <span>
            {wpm.toFixed(0)}
            <span>wpm</span>
          </span>
          <span>
            {accuracy}
            <span>%</span>
          </span>
        </div>
        <>
          <RestartSVG
            className="icon restart"
            onClick={() => {
              restart();
            }}
          />
        </>
      </div>
    </>
  );
}
