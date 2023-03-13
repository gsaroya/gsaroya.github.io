import OSWindow from "../Home/Window";
import { Program } from "../../types";
import ProgramAbout from "./About";
import ProgramInfo from "./Info";
import ProgramWork from "./Work";
import ProgramDocument from "./Document";
import ProgramFiles from "./Files";
import ProgramBrowser from "./Browser";
import ProgramWIP from "./WIP";
import ProgramGames from "./Games";
import ProgramPlayer from "./Player";
import ProgramViewer from "./Viewer";
import GamePong from "../Games/Pong";

interface LoaderProps {
  program: number;
  offset: number;
  index: number;
  minimized?: boolean;
  active: boolean;
  desktopRef: React.RefObject<HTMLDivElement>;
  sound: boolean;
  openProgram: (type: number) => void;
  closeProgram: () => void;
  minimizeProgram: () => void;
  bringToFront: () => void;
  toggleSound: () => void;
}

function ProgramLoader(props: LoaderProps) {
  return (
    <OSWindow {...props} showStatusRight={props.program == Program.Work}>
      {
        {
          [Program.Info]: <ProgramInfo openProgram={props.openProgram} closeProgram={props.closeProgram} />,
          [Program.About]: <ProgramAbout openProgram={props.openProgram} closeProgram={props.closeProgram} />,
          [Program.Documents]: <ProgramFiles openProgram={props.openProgram} />,
          [Program.Settings]: <ProgramWIP />,
          [Program.Games]: <ProgramGames openProgram={props.openProgram} />,
          [Program.Blog]: <ProgramWIP />,
          [Program.Internet]: <ProgramBrowser bringToFront={props.bringToFront} />,
          [Program.Help]: <ProgramWIP />,
          [Program.Work]: <ProgramWork bringToFront={props.bringToFront} />,
          [Program.Resume]: <ProgramDocument link="resume.v5.pdf" />,
          [Program.Video]: <ProgramPlayer src="/img/cool_video.mp4" type="video/mp4" sound={props.sound} toggleSound={props.toggleSound} />,
          [Program.Audio]: <ProgramPlayer src="/audio/cool_sounds.m4a" type="audio/mp4" sound={props.sound} toggleSound={props.toggleSound} />,
          [Program.Image]: <ProgramViewer src="/img/cheems.png" alt="dog image" />,
          [Program.Image2]: <ProgramViewer src="/img/cat.gif" alt="cat image" />,
          [Program.Pong]: <GamePong />,
        }[props.program]
      }
    </OSWindow>
  );
}

export default ProgramLoader;
