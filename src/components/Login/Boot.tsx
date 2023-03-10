import { useState, useEffect } from "react";
import loadImage from "../UI/LoadImage";
import Spinner from "../UI/Spinner";
import "./Boot.scss";

interface BootProps {
  setBooted: React.Dispatch<React.SetStateAction<boolean>>;
}

function OSBoot(props: BootProps) {
  const images = [
    loadImage("/img/clouds.jpg"),
    loadImage("/img/icons/os/gaganos.svg")
  ];
  const [willNotBoot, _] = useState(localStorage.getItem("booted") == "true");
  const [booting, setBooting] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (willNotBoot) {
      props.setBooted(true);
    } else if (!booting) {
      if (images.every(src => src)) {
        setBooting(true);
      }
    } else {
      setTimeout(() => {
        localStorage.setItem("booted", "true");
        props.setBooted(true);
      }, 5000);
    }

  }, [images, booting]);

  if (!loaded || !images.every(src => src)) return <Spinner style={{ height: "100vh", width: "100vw" }} setDone={setLoaded} />;

  return (
    <div className="boot-component" style={{ backgroundImage: `url(${images[0]})` }}>
      <div className="boot-spacer" />
      <div className="boot-content">
        <img src={`${images[1]}`} alt="Gagan OS icon" />
        <div className="boot-loading">
          <div className="boot-loading-bar">
            <div></div><div></div><div></div>
          </div>
        </div>
      </div>
      <div className="boot-spacer2" />
    </div>
  );
}

export default OSBoot;