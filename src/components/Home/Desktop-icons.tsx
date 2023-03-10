import programs from "../Programs/programs.json";
import { Program } from "../../types";
import sounds from "../../sounds";
import "./Desktop-Icons.scss";

interface DesktopIconsProps {
  openProgram: (type: number) => void;
}

interface DesktopIconProps {
  openProgram: (type: number) => void;
  picture: string;
  text: string;
  height: string;
  link?: string;
  type: string;
  programType: string;
}

function OSDesktopIcon(props: DesktopIconProps) {
  const openProgram = () => {
    if (props.link) {
      open(props.link, "_blank");
    } else {
      props.openProgram(Program[props.programType as keyof typeof Program]);
    }
  };
  return (
    <div className="desktop-icon" onClick={openProgram} style={{ cursor: "pointer" }}>
      <div className="desktop-icon-img" style={{ height: props.height }}>
        <img src={props.picture} alt={props.text} />
        {props.type == "desktop" ? <img src="/img/icons/os/shortcut3.svg" alt="shortcut icon" className="desktop-shortcut-icon" /> : null}
      </div>
      <div>{props.text}</div>
    </div>
  );
}

function OSDesktopIcons(props: DesktopIconsProps) {
  const openProgram = (type: number) => {
    sounds.playClickSound();
    props.openProgram(type);
  };
  return (
    <div className="desktop-icons">
      {programs.map(program => {
        if (program.enabled && program.type == "desktop")
          return <OSDesktopIcon key={program.text} {...program} openProgram={openProgram} />;
      })}
    </div>
  );
}

export { OSDesktopIcons, OSDesktopIcon };
