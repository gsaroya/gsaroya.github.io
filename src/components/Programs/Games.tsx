import { OSDesktopIcon } from "../Home/Desktop-icons";
import programs from "./programs.json";
import sounds from "../../sounds";
import "./Games.scss";

interface GamesProps {
  openProgram: (type: number) => void;
}

function ProgramGames(props: GamesProps) {
  const openProgram = (type: number) => {
    sounds.playClickSound();
    props.openProgram(type);
  }
  return (
    <div className="games-component">
      <div className="games">
        {programs.map(program => {
          if (program.enabled && program.type == "game")
            return <OSDesktopIcon key={program.text} {...program} openProgram={openProgram} />;
        })}
      </div>
    </div>
  );
}

export default ProgramGames;
