import { useEffect, useRef, useState } from "react";
import Scrollbar from "../UI/Scrollbar";
import Spinner from "../UI/Spinner";
import WindowBrowserRow from "../UI/Window-BrowserRow";
import "./Browser.scss";

interface BrowserProps {
  bringToFront: () => void;
}

function ProgramBrowser(props: BrowserProps) {
  const page = "retro.html";
  const url = `${location.origin}/${page}`;
  const ref = useRef<HTMLIFrameElement>(null);
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener("load", () => setIsIFrameLoaded(true));
    return () => {
      ref.current?.removeEventListener("load", () => setIsIFrameLoaded(true));
    };
  }, [ref.current]);

  const refresh = () => {
    if (!ref.current) return;
    ref.current.src = url;
    setLoaded(false);
  };

  const display = (loaded && isIFrameLoaded) ? "flex" : "none";

  return (
    <div className="browser-component">
      <WindowBrowserRow pathIcon={"/img/icons/browser.svg"} path={url} refresh={refresh} setUrl={refresh} />
      {(!loaded || !isIFrameLoaded) ? <Spinner setDone={setLoaded} style={{ height: "100%", width: "100%" }} /> : null}
      <Scrollbar style={{ height: "100%", width: "100%", display }} onClick={props.bringToFront}>
        <iframe src={page} ref={ref} style={{ minHeight: "80em", width: "100%" }}></iframe>
      </Scrollbar>
    </div>
  );
}

export default ProgramBrowser;
