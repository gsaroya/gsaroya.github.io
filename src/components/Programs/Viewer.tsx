
import { useState } from "react";
import loadImage from "../UI/LoadImage";
import Spinner from "../UI/Spinner";
import "./Viewer.scss";

interface ViewerProps {
  src: string;
  alt: string;
}

function ProgramViewer(props: ViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage(props.src),
  ];
  if (!loaded || !images.every(src => src)) return <Spinner setDone={setLoaded} style={{ height: "100%", width: "100%" }} />;

  return (
    <div className="viewer-component">
      <div className="viewer-content">
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
}

export default ProgramViewer;
