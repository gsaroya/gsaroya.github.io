import OSButton from "../UI/Button";
import programs from "../Programs/programs.json";
import { useEffect, useRef, useState } from "react";
import { Program } from "../../types";
import "./Taskbar.scss";

interface TaskbarProps {
  programs: number[][];
  activeProgram: number;
  sound: boolean;
  bringToFront: (id: number) => void;
  openProgram: (id: number) => void;
  minimizeProgram: (id: number) => void;
  toggleSound: () => void;
}

interface TaskbarProgramProps {
  id: number;
  program: number;
  active: boolean;
  mini: boolean;
  bringToFront: (id: number) => void;
  minimizeProgram: (id: number) => void;
}

function OSTaskbarProgram(props: TaskbarProgramProps) {
  const width = props.mini ? "2em" : "7em";
  return (
    <OSButton
      link=""
      onClick={() => { props.active ? props.minimizeProgram(props.id) : props.bringToFront(props.id); }}
      style={{ height: "2em", width }}
      active={props.active}
    >
      <div className="taskbar-program">
        <img src={programs[props.program].picture} alt={programs[props.program].program} className="taskbar-icon" />
        {props.mini ? null : <div className="taskbar-text">{programs[props.program].program}</div>}
      </div>
    </OSButton>
  );
}

function OSTaskbar(props: TaskbarProps) {
  const [date, setDate] = useState(new Date());
  const [mini, setMini] = useState(false);
  const [fitCount, setFitCount] = useState(10);
  const ref = useRef<HTMLDivElement>(null);
  function buildTime(d: Date) {
    let h = d.getHours();
    const m = d.getMinutes();
    const p = h < 12 ? " AM" : " PM";
    if (h == 0) {
      h = 12;
    } else if (h > 12) {
      h -= 12;
    }
    return String(h) + ":" + (m < 10 ? "0" : "") + String(m) + p;
  }

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [ref.current?.scrollHeight]);

  useEffect(() => {
    if (!ref.current) return;
    setFitCount(Math.floor(ref.current.clientWidth / 190));
  }, [ref.current?.clientWidth]);

  useEffect(() => {
    setMini(fitCount < props.programs.length);
  }, [props.programs.length, fitCount]);

  const dateString = buildTime(date);

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <OSButton link="" onClick={() => props.openProgram(Program.Settings)} style={{ height: "2em", width: "5.5em" }}>
          <div className="taskbar-start">
            <img src="/img/icons/os/gaganos.svg" alt="" className="taskbar-icon start" />
          </div>
        </OSButton>
        <div className="taskbar-programs" ref={ref}>
          {props.programs.map(program =>
            <OSTaskbarProgram
              key={program[0]}
              id={program[0]}
              program={program[1]}
              bringToFront={props.bringToFront}
              minimizeProgram={props.minimizeProgram}
              active={program[0] == props.activeProgram}
              mini={mini}
            />
          )}
        </div>
      </div>
      <div className="taskbar-tray os-inset">
        <div onClick={props.toggleSound} style={{ cursor: "pointer" }}>
          <img src={props.sound ? "/img/icons/media/audio-on.svg" : "/img/icons/media/audio-off.svg"} alt="" className="taskbar-icon" />
        </div>
        <div className="taskbar-time taskbar-text">{dateString}</div>
      </div>
    </div>
  );
}

export default OSTaskbar;
