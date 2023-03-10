import { useEffect, useRef, useState } from "react";
import Scrollbar from "../UI/Scrollbar";
import Spinner from "../UI/Spinner";
import WindowBrowserRow from "../UI/Window-BrowserRow";
import "./Browser.scss";

interface BrowserProps {
  bringToFront: () => void;
}

function ProgramBrowser(props: BrowserProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener("load", () => setIsIFrameLoaded(true));
    return () => {
      ref.current?.removeEventListener("load", () => setIsIFrameLoaded(true));
    };
  }, [ref.current]);

  const display = (loaded && isIFrameLoaded) ? "flex" : "none";

  return (
    <div className="browser-component">
      {(!loaded || !isIFrameLoaded) ? <Spinner setDone={setLoaded} style={{ height: "100%", width: "100%" }} /> : null}
      <WindowBrowserRow style={{ display }} pathIcon={"/img/icons/browser.svg"} path={"./retro.html"} />
      <Scrollbar style={{ height: "100%", width: "100%", display }} onClick={props.bringToFront}>
        <iframe src="retro.html" ref={ref} style={{ minHeight: "80em", width: "100%" }}></iframe>
      </Scrollbar>
    </div>
  );
}

export default ProgramBrowser;
