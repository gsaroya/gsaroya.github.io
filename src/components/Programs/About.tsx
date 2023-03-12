import { useState } from "react";
import OSButton from "../UI/Button";
import "./About.scss";

interface AboutProps {
  openProgram: (type: number) => void;
  closeProgram: () => void;
}

function ProgramAboutGagan() {
  return (
    <div className="about-gagan">
      <div className="about-gagan-img">
        <img src="/img/icons/about.svg" alt="About icon" />
      </div>
      <div className="about-gagan-text">
        Name:<br />
        &emsp;Gagan Saroya<br /><br />
        Location:<br />
        &emsp;Waterloo, ON, Canada<br /><br />
        Specimen:<br />
        &emsp;Software Engineer<br /><br />
        Current Interests:<br />
        &emsp;DevOps<br />
        &emsp;AI and Machine Learning<br />
        &emsp;Weight Lifting<br />
        &emsp;Languages
      </div>
    </div>
  );
}

function ProgramAboutOS() {
  return (
    <div className="about-os">
      <div className="about-os-img">
        <img src="/img/icons/os/gaganos-logo.svg" alt="GaganOS logo" />
      </div>
      <div className="about-os-text">
        Technologies Used:<br />
        &emsp;<a href="https://reactjs.org/" target="_blank">React.js</a><br />
        &emsp;<a href="https://github.com/bokuweb/react-rnd" target="_blank">react-rnd</a><br />
        &emsp;<a href="https://vitejs.dev/" target="_blank">Vite</a><br />
        &emsp;<a href="https://sass-lang.com/documentation/syntax" target="_blank">SCSS</a><br />
        &emsp;<a href="https://stackblitz.com/edit/react-ts-frji5h?file=components%2Fscrollbar%2Findex.tsx" target="_blank">Custom Scrollbar</a><br />
        &emsp;<a href="https://github.com/goldfire/howler.js" target="_blank">howler.js</a><br /><br />
        Notes:<br />
        &emsp;Written from scratch for fun<br />
        &emsp;<a href="https://github.com/gsaroya/gsaroya.github.io" target="_blank">GitHub repo</a><br />
      </div>
    </div>
  );
}

function ProgramAbout(props: AboutProps) {
  const [tab, setTab] = useState(0);
  return (
    <div className="program-about">
      <div className="about-tabs">
        <div className={"about-tab" + (tab == 0 ? " active" : "")} onClick={() => { setTab(0); }}><div>About Gagan</div></div>
        <div className={"about-tab" + (tab == 1 ? " active" : "")} onClick={() => { setTab(1); }}><div>About OS</div></div>
      </div>
      <div className="about-content">
        {
          {
            [0]: <ProgramAboutGagan />,
            [1]: <ProgramAboutOS />,
          }[tab]
        }
      </div>
      <div className="about-buttons">
        <OSButton link={""} onClick={props.closeProgram}>OK</OSButton>
      </div>
    </div>
  );
}

export default ProgramAbout;
