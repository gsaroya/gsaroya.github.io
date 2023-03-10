import { useState } from "react";
import { Program } from "../../types";
import OSButton from "../UI/Button";
import "./Info.scss";

interface InfoProps {
  openProgram: (type: number) => void;
  closeProgram: () => void;
}

function ProgramInfoBio() {
  return (
    <div className="info-content">
      <div className="info-info">
        <img src="/img/icons/os/info2.svg" alt="Info icon" />
        <div className="info-info-text">
          This website is a virtual operating system about Gagan. Feel free to explore all the available programs.<br /><br />
          Although this website is mobile-friendly, it works best on larger screens. Click "Help" if you have questions or feedback!<br /><br />
          See links on right for more info...
        </div>
      </div>
    </div>
  );
}

function ProgramInfo(props: InfoProps) {
  const [launchInfo, setLaunchInfo] = useState(localStorage.getItem("launchInfo") != "false");
  const toggleLaunchInfo = () => {
    localStorage.setItem("launchInfo", String(!launchInfo));
    setLaunchInfo(!launchInfo);
  };
  return (
    <div className="program-info">
      <div className="info-title">
        <span>Welcome to</span>
        <img src="/img/icons/os/gaganos.svg" alt="GaganOS Logo" />
      </div>
      <div className="info-title-spacer"></div>
      <ProgramInfoBio />
      <div className="info-buttons">
        <OSButton link={""} onClick={() => props.openProgram(Program.About)}>About</OSButton>
        <OSButton link={""} onClick={() => props.openProgram(Program.Resume)}>Résumé</OSButton>
        <OSButton link={""} onClick={() => props.openProgram(Program.Work)}>Work History</OSButton>
        <hr />
        <OSButton link={""} onClick={() => open("https://github.com/gsaroya", "_blank")}>GitHub</OSButton>
        <OSButton link={""} onClick={() => open("https://linkedin.com/in/gsaroya", "_blank")}>LinkedIn</OSButton>
        <hr />
        <OSButton link={""} onClick={() => open("/help.html", "_blank")}>Help</OSButton>
      </div>
      <div className="info-ok-spacer" style={{ display: "none" }}></div>
      <div className="info-show">
        <input type="checkbox" name="info-show" id="info-show" checked={launchInfo} onChange={toggleLaunchInfo} />
        <label htmlFor="info-show">Show this screen when you start Gagan[OS]</label>
      </div>
      <div className="info-ok">
        <OSButton link={""} onClick={props.closeProgram}>OK</OSButton>
      </div>
    </div>
  );
}

export default ProgramInfo;
