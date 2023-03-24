import { useState } from "react";
import { Link } from "react-router-dom";
import loadImage from "../UI/LoadImage";
import OSButton from "../UI/Button";
import Spinner from "../UI/Spinner";
import sounds from "../../sounds";
import "./Menu.scss";

interface MenuProps {
  close: () => void;
  applySound: (useSound: boolean) => void;
  applyTheme: (useTheme: string) => void;
}

function ProgramMenu(props: MenuProps) {
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage("/img/icons/os/gaganos.svg"),
    loadImage("/img/icons/os/logout.svg"),
    loadImage("/img/icons/os/reboot.svg"),
    loadImage("/img/icons/crash.svg"),
    loadImage("/img/icons/os/arrow-down.svg")
  ];

  const [sound, setSound] = useState(localStorage.getItem("sound") != "false");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "classic");
  const handleSubmit = () => {
    props.applySound(sound);
    props.applyTheme(theme);
    props.close();
  };

  return (
    <div className="menu" onClick={props.close}>
      <div className="menu-spacer"></div>
      <div className="menu-modal" onClick={(e) => e.stopPropagation()}>

        <div className="menu-top">
          <img src="/img/icons/os/gaganos.svg" alt="Gagan OS Logo" />
        </div>
        {(!loaded || !images.every(src => src)) ? <Spinner style={{ height: "20em", width: "20em" }} setDone={setLoaded} />
          : <>
            <div className="power-options">
              <Link to={"/Login"} state={{ delay: 3000 }} onClick={() => {
                sounds.logoffSound.play();
                localStorage.removeItem("loggedIn");
              }}>
                <div className="power-logoff">
                  <img src="/img/icons/os/logout.svg" alt="Log Off Icon" />
                  <span>Log Off</span>
                </div>
              </Link>
              <Link to={"/Login"} state={{ delay: 3000 }} onClick={() => {
                sounds.logoffSound.play();
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("booted");
              }}>
                <div className="power-restart">
                  <img src="/img/icons/os/reboot.svg" alt="Restart Icon" />
                  <span>Restart</span>
                </div>
              </Link>
              <Link to={"/Crash"}>
                <div className="power-crash">
                  <img src="/img/icons/crash.svg" alt="Crash Icon" />
                  <span>Crash</span>
                </div>
              </Link>
            </div>
            <div className="theme-options">
              <span>Theme:</span>
              <select name="menu-select" id="menu-select" style={{ backgroundImage: 'url("/img/icons/os/arrow-down.svg")' }} onChange={(e) => setTheme(e.target.value)} value={theme}>
                <option value="classic">Classic</option>
                <option value="funky">Funky</option>
              </select>
            </div>
            <div className="sound-options">
              <span>Sound:</span>
              <select name="menu-select" id="menu-select" style={{ backgroundImage: 'url("/img/icons/os/arrow-down.svg")' }} onChange={(e) => setSound(e.target.value == "true")} value={String(sound)}>
                <option value="true">On</option>
                <option value="false">Off</option>
              </select>
            </div>
            <div className="menu-bottom">
              <OSButton link="" onClick={handleSubmit} style={{ height: "2em", width: "4em" }}>OK</OSButton>
              <OSButton link="" onClick={props.close} style={{ height: "2em", width: "4em" }}>Cancel</OSButton>
            </div>
          </>}
      </div>
      <div className="menu-spacer2"></div>
    </div>
  );
}

export default ProgramMenu;
