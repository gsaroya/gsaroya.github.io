import { useRef, useState, useEffect } from "react";
import { OSDesktopIcons } from "./Desktop-icons";
import OSTaskbar from "./Taskbar";
import ProgramLoader from "../Programs/Loader";
import ProgramMenu from "../Programs/Menu";
import programData from "../Programs/programs.json";
import { Program } from "../../types";
import loadImage from "../UI/LoadImage";
import Spinner from "../UI/Spinner";
import sounds from "../../sounds";
import "./Home.scss";

interface MainProps {
}

interface program {
  id: number;
  type: number;
  minimized?: boolean;
}

function OSHome(props: MainProps) {
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage("/img/icons/os/gaganos.svg"),
    loadImage("/img/icons/os/gaganos-logo.svg"),
    loadImage("/img/icons/media/audio-on.svg"),
    loadImage("/img/icons/media/audio-off.svg"),
    loadImage("/img/icons/os/shortcut3.svg"),
    ...programData.filter(program => program.enabled).map(program => loadImage(program.picture)),
  ];

  const [sound, setSound] = useState(localStorage.getItem("sound") != "false");
  const applySound = (useSound: boolean) => {
    localStorage.setItem("sound", String(useSound));
    setSound(useSound);
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "classic");
  const applyTheme = (useTheme: string) => {
    localStorage.setItem("theme", useTheme);
    setTheme(useTheme);
  };
  useEffect(() => {
    const iterator = document.documentElement.classList.entries();
    let remove = [];
    for (const [_, value] of iterator) {
      if (value.startsWith("theme-")) {
        remove.push(value);
      }
    }
    remove.forEach(value => document.documentElement.classList.remove(value));
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, loaded]);

  // State for tracking dimensions and scale
  const ref = useRef<HTMLDivElement>(null);

  // State for opened programs
  const [programs, setPrograms] = useState<program[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [offset, setOffset] = useState(0);
  const [activeProgram, setActiveProgram] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const [launchInfo, setLaunchInfo] = useState(localStorage.getItem("launchInfo") != "false");
  useEffect(() => {
    setTimeout(() => {
      if (loaded && launchInfo) {
        setLaunchInfo(false);
        openProgram(Program.Info);
      }
      sounds.playLogonSound();
    }, 1000);
  }, [launchInfo, loaded]);

  const handleDesktopClick = (e: any) => {
    if (e?.target?.className == "desktop") {
      setActiveProgram(-1);
    }
  };

  const openProgram = (type: number) => {
    if (type == Program.Settings) {
      setShowMenu(true);
      return;
    }
    let existingProgram = programs.find(program => program.type == type);
    if (existingProgram) {
      bringToFront(existingProgram.id);
    } else {
      let program = {
        id: Date.now(),
        type
      };
      let new_indexes = [...indexes, program.id];
      let close_id = -1;
      // if (Object.keys(indexes).length > 100000) {
      //   let close_index = 100;
      //   Object.entries(indexes).forEach(([k, v]) => {
      //     if (v < close_index) {
      //       close_id = Number(k)
      //       close_index = v
      //     }
      //   });
      //   Object.keys(new_indexes).forEach(id => new_indexes[Number(id)] -= 1)
      //   delete new_indexes[close_id];
      // }
      setOffset(offset + 1);
      setPrograms([...programs.filter(program => program.id != close_id), program]);
      setIndexes(new_indexes);
      setActiveProgram(program.id);
    }
  };
  const closeProgram = (id: number) => {
    let new_indexes = indexes.filter(id2 => id2 != id);
    const nextProg = getNextProgram(id);
    // setOffset(offset - 1)
    setPrograms(programs.filter(program => program.id != id));
    setIndexes(new_indexes);
    setActiveProgram(nextProg);
  };
  const bringToFront = (id: number) => {
    let new_indexes = indexes.filter(id2 => id2 != id);
    new_indexes.push(id);
    setIndexes(new_indexes);
    setActiveProgram(id);
    setMinimized(id, false);
  };
  const minimizeProgram = (id: number) => {
    const nextProg = getNextProgram(id);
    if (nextProg == -1) {
      setActiveProgram(-1);
    } else {
      bringToFront(nextProg);
    }
    setMinimized(id, true);
  };
  const setMinimized = (id: number, minimized: boolean) => {
    let existingProgram = programs.find(program => program.id == id);
    if (!existingProgram) return;
    existingProgram.minimized = minimized;
    setPrograms([
      ...programs.filter(program => program.id != id),
      existingProgram
    ]);
  };
  const getNextProgram = (id: number) => {
    let nextProg = -1;
    const candidatePrograms = indexes.filter(candidate_id => {
      if (candidate_id == id) return false;
      const candidateProgram = programs.find(program => program.id == candidate_id);
      return candidateProgram && !candidateProgram.minimized;
    });
    if (candidatePrograms.length > 0) nextProg = candidatePrograms[candidatePrograms.length - 1];
    return nextProg;
  };

  if (!loaded || !images.every(src => src)) return <Spinner style={{ height: "100vh", width: "100vw" }} setDone={setLoaded} />;

  return (
    <div className="OS">
      <div className="os-screen">
        <div className="desktop" ref={ref} style={{ position: "relative" }} onClick={handleDesktopClick}>
          {
            programs.map(program => {
              let progProps = {
                key: `${program.id}`,
                program: program.type,
                offset: offset, //Math.max(programs.length - 1, 0),
                index: indexes.indexOf(program.id),
                desktopRef: ref,
                minimized: program.minimized,
                active: program.id == activeProgram,
                sound,
                bringToFront: () => {
                  bringToFront(program.id);
                },
                openProgram,
                closeProgram: () => { closeProgram(program.id); },
                minimizeProgram: () => { minimizeProgram(program.id); },
                toggleSound: () => applySound(!sound),
              };
              return <ProgramLoader {...progProps} />;
            })
          }
          <OSDesktopIcons openProgram={openProgram} />
          <div className="desktop-background">
            <img style={{opacity: 0}} className="desktop-background-gagan" src="img/icons/os/gaganos-logo.svg" alt="Gagan OS Background" />
            <img style={{opacity: 0}} className="desktop-background-smiley" src="img/smiley.png" alt="Smiley Background" />
          </div>
        </div>
        <OSTaskbar
          bringToFront={bringToFront}
          programs={programs
            .map(program => [program.id, program.type])
            .sort((a, b) => a[0] - b[0])}
          activeProgram={activeProgram}
          openProgram={openProgram}
          minimizeProgram={minimizeProgram}
          sound={sound}
          toggleSound={() => applySound(!sound)}
        />
        {showMenu ?
          <ProgramMenu
            close={() => setShowMenu(false)}
            applySound={applySound}
            applyTheme={applyTheme} />
          : null}
      </div>
    </div>
  );
}

export default OSHome;
