import { Link } from "react-router-dom";
import sounds from "../../sounds";
import "./Button.scss";

interface ButtonProps extends React.HTMLProps<HTMLDivElement> {
  link: string;
  onClick?: () => void;
  className?: string;
  hasLink?: boolean;
  active?: boolean;
  muted?: boolean;
}

function OSButton(props: ButtonProps) {
  const useReactLink = props.hasLink || !props.onClick;
  const enabled = Boolean(useReactLink ? props.link : props.onClick);
  const onClick = () => {
    if (!enabled) return;
    if (!props.muted) sounds.clickSound.play();
    if (props.onClick) props.onClick();
  }
  return (
    <div style={{ padding: "0.1em" }} className={props.className}>
      {
        !useReactLink ?
          <div className={"os-button " + (props.active ? "active-button" : "")} onClick={onClick} style={props.style}>
            <div className="os-button-content" style={{ padding: "0.1em" }}>
              {props.children}
            </div>
          </div>
          : <Link
            to={props.link}
            className={enabled ? "os-button" : "os-button grayed-button"}
            style={enabled ? props.style : { ...props.style, pointerEvents: "none" }}
            onClick={onClick}
          >
            <div className="os-button-content" style={{ padding: "0.1em" }}>
              {props.children}
            </div>
          </Link>
      }
    </div >
  );
}

export default OSButton;
