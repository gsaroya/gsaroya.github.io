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
      <OSWindow closeProgram={() => {}}
      minimizeProgram={() => {}}
      bringToFront={() => {}}
      program={0}
      index={0}
      desktopRef={ref}
      active={true}
      hideButtons={true}></OSWindow>
    </div>
  );
}

export default OSLanding;