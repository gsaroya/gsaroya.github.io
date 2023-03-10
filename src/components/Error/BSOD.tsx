import { useRouteError } from "react-router-dom";
import "./BSOD.scss";

interface BSODProps {
  errorMsg?: string;
  errorCode?: string;
}

function OSBSOD(props: BSODProps) {
  const err = { msg: props.errorMsg, code: props.errorCode };
  if (!(props.errorMsg && props.errorCode)) {
    const error = useRouteError();
    console.error(error);
    if (error instanceof Error) {
      err.msg = error.message;
      err.code = error.name;
    } else {
      err.msg = "Unknown Error";
      err.code = "ERR_IDK";
    }
  }

  return (
    <div className="bsod-component">
      <div className="bsod-content">
        <div className="bsod-frowny">:&#40;</div>
        <div className="bsod-message">ERROR: {err.msg}</div><br />
        <div className="bsod-code">{err.code}</div><br />
        <div>A problem has been detected and Gagan[OS] has been shut down to prevent damage to your browser</div>
        <div>
          If you continue having issues using the website, follow the help page for troubleshooting or feedback:<br /><br />
          <div className="links" style={{ display: "flex", gap: "1em", whiteSpace: "nowrap", flexWrap: "wrap" }}>
            <a href="/" target="">
              <div className="link-button" style={{ backgroundColor: "lightgreen", padding: "0.5em" }}>
                Main Page
              </div>
            </a>
            <a href="/help.html" target="_blank">
              <div className="link-button" style={{ backgroundColor: "lightgreen", padding: "0.5em" }}>
                Help Page
              </div>
            </a>
            <a href="https://linkedin.com/in/gsaroya" target="_blank">
              <div className="link-button" style={{ backgroundColor: "lightgreen", padding: "0.5em" }}>
                LinkedIn
              </div>
            </a>
            <a href="https://github.com/gsaroya" target="_blank">
              <div className="link-button" style={{ backgroundColor: "lightgreen", padding: "0.5em" }}>
                GitHub
              </div>
            </a>
          </div><br /><br />
          Useless Technical Information:<br /><br />
          *** STOP: 0x000000ED (0x80F12D0, 0xc000009c, 0x00000000, 0x00000000)
        </div>
      </div>
    </div>
  );
}

export default OSBSOD;