import OSButton from "./Button";
import "./Window-BrowserRow.scss";

interface BrowserRowProps extends React.HTMLProps<HTMLDivElement> {
  pathIcon: string;
  path: string;
}

function WindowBrowserRow(props: BrowserRowProps) {
  return (
    <div className="window-browser-row-component" style={props.style}>
      <div className="window-browser-row">
        <div className="window-browser-row-left">
          <OSButton link="" className="window-browser-row-img"><img src="/img/icons/nav/explorer-arrow-left.svg" alt="Explorer Arrow Down Left icon" /></OSButton>
          <OSButton link="" className="window-browser-row-img"><img src="/img/icons/nav/explorer-arrow-right.svg" alt="Explorer Arrow Down Right icon" /></OSButton>
          <OSButton link="" className="window-browser-row-img"><img src="/img/icons/nav/explorer-refresh.svg" alt="Explorer Refresh icon" /></OSButton>
        </div>
        <span>Address:</span>
        <div className="window-browser-row-dropdown">
          <div className="window-browser-row-url">
            <img src={props.pathIcon} alt="Browser icon" />
            <span>{props.path}</span>
          </div>
          <img src="/img/icons/os/arrow-down.svg" alt="Arrow Down icon" />
        </div>
        <OSButton link="" className="window-browser-row-go">
          <img src="/img/icons/os/shortcut.svg" alt="Go icon" />
          <span>Go</span>
        </OSButton>
      </div>
      <hr style={{ color: "gray", width: "99%", margin: "0.5em 0em 0.5em 0em", alignSelf: "center" }} />
    </div>
  );
}

export default WindowBrowserRow;
