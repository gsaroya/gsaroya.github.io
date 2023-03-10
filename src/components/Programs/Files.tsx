import { OSDesktopIcon } from "../Home/Desktop-icons";
import WindowBrowserRow from "../UI/Window-BrowserRow";
import programs from "./programs.json";
import sounds from "../../sounds";
import "./Files.scss";

interface FilesProps {
  openProgram: (type: number) => void;
}

function ProgramFiles(props: FilesProps) {
  const openProgram = (type: number) => {
    sounds.playClickSound();
    props.openProgram(type);
  }
  return (
    <div className="files-component">
      <WindowBrowserRow style={{}} pathIcon={"/img/icons/folder.svg"} path={"C:\\Users\\Gagan\\Documents"} />
      <div className="files">
        {programs.map(program => {
          if (program.enabled && program.type == "file")
            return <OSDesktopIcon key={program.text} {...program} openProgram={openProgram} />;
        })}
      </div>
    </div>
  );
}

export default ProgramFiles;
