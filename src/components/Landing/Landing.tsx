import { useEffect, useRef, useState } from "react";
import loadImage from "../UI/LoadImage";
import OSButton from "../UI/Button";
import Spinner from "../UI/Spinner";
import sounds from "../../sounds";
import "./Landing.scss";
import OSWindow from "../Home/Window";

function OSLanding() {
  // Preload images
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage("/img/icons/os/gaganos.svg")
  ];

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

  const ref = useRef<HTMLDivElement>(null);

  if (!loaded || !images.every(src => src)) return <Spinner style={{ height: "100vh", width: "100vw" }} setDone={setLoaded} />;

  return (
    <div className="landing-component" ref={ref}>
      <OSWindow closeProgram={() => { }}
        minimizeProgram={() => { }}
        bringToFront={() => { }}
        program={-1}
        index={0}
        desktopRef={ref}
        active={true}
        hideButtons={true}
        title={"Welcome"}
        large={true}
      >
        <div className="landing-window">
          <div className="landing-window-blurb-col">
            <div className="landing-window-blurb">
              My name is Gagan, welcome to my website!
              <br /><br />
              To learn more about me, click the button below and start the interactive experience!
            </div>
            <OSButton className="landing-window-blurb-button" link={"/Login"}>
              <img src="/img/icons/os/gaganos.svg" alt="" />
            </OSButton>
          </div>
          <div className="landing-window-photo-col">
            <img className="landing-window-photo" src="/img/gagan.jpg" alt="" />
            <OSButton link={"/Login"}>
              <img src="/img/icons/linkedin.svg" alt="" />
              <span>LinkedIn</span>
            </OSButton>
            <OSButton link={"/Login"}>
              <img src="/img/icons/github.svg" alt="" />
              <span>GitHub</span>
            </OSButton>
          </div>
        </div>
      </OSWindow>
    </div>
  );
}

export default OSLanding;