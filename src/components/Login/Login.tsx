import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OSBoot from "./Boot";
import loadImage from "../UI/LoadImage";
import OSButton from "../UI/Button";
import Spinner from "../UI/Spinner";
import sounds from "../../sounds";
import "./Login.scss";

interface LoginProps {
  setBooted: React.Dispatch<React.SetStateAction<boolean>>;
}

function OSLogin(props: LoginProps) {
  // Preload images
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage("/img/clouds.jpg"),
    loadImage("/img/icons/os/gaganos.svg")
  ];

  // Sound state
  const [sound, setSound] = useState(localStorage.getItem("sound") != "false");
  sounds.Howler.mute(!sound);
  const applySound = (useSound: boolean) => {
    localStorage.setItem("sound", String(useSound));
    setSound(useSound);
    sounds.Howler.mute(!useSound);
  };

  // Theme state
  const [theme] = useState(localStorage.getItem("theme") || "classic");
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

  if (!loaded || !images.every(src => src)) return <Spinner style={{ height: "100vh", width: "100vw" }} setDone={setLoaded} />;

  return (
    <div className="login-component">
      <div className="login-component-spacer"></div>
      <div className="login-box">
        <div className="login-box-titlebar">Welcome to Gagan[OS]</div>
        <div className="login-box-banner" style={{ backgroundImage: `url(${images[0]})` }}>
          <img src={`${images[1]}`} alt="Gagan OS Logo" />
        </div>
        <div className="login-box-content">
          <div className="login-box-form">
            <span>Select user name:</span>
            <div className="login-box-select">
              <div className="login-box-option active">
                <span>Gagan Saroya</span>
              </div>
            </div>
          </div>
          <div className="login-box-form">
            <span>Sound:</span>
            <div className="login-box-select">
              <div
                className={"login-box-option " + (sound ? "active" : "")}
                onClick={() => applySound(true)}>
                <span>ON</span>
              </div>
              <div
                className={"login-box-option " + (!sound ? "active" : "")}
                onClick={() => applySound(false)}>
                <span>OFF</span>
              </div>
            </div>
          </div>
          <div className="login-box-button">
            <OSButton link={"/Home"} hasLink={true} onClick={() => {
              localStorage.removeItem("loggedIn");
            }}>Login</OSButton>
            <OSButton link="" onClick={() => {
              localStorage.removeItem("booted");
              props.setBooted(false);
            }}>Reboot</OSButton>
          </div>
        </div>
      </div>
      <div className="login-component-spacer2"></div>
    </div>
  );
}

function OSLoginPortal() {
  const [booted, setBooted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  setTimeout(() => setLoaded(true), location.state?.delay || 0);

  if (!loaded) return <Spinner style={{ height: "100vh", width: "100vw" }} />;

  return (
    <div className="login-portal">
      {!booted ? <OSBoot setBooted={setBooted} /> : <OSLogin setBooted={setBooted} />}
      <div className="login-footer">
        <span>{new Date().getFullYear()} - Gagan Saroya</span>
        <span><a href="/help.html" target={"_blank"}>Help?</a></span>
      </div>
    </div>
  );
}

export default OSLoginPortal;
