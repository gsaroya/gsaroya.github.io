import OSButton from "./Button";
import "./Window-DocumentRow.scss";

interface DocumentRowProps extends React.HTMLProps<HTMLDivElement> {
  path: string;
}

function WindowDocumentRow(props: DocumentRowProps) {
  return (
    <div className="window-document-row-component" style={props.style}>
      <div className="window-document-row">
        <div className="window-document-row-left">
          <div className="window-document-nav">
            <OSButton link=""><img src="/img/icons/go-skip.svg" alt="first page" className="window-document-nav-button go-first" /></OSButton>
            <OSButton link=""><img src="/img/icons/go-next.svg" alt="prev page" className="window-document-nav-button go-prev" /></OSButton>
            <OSButton link=""><img src="/img/icons/go-next.svg" alt="next page" className="window-document-nav-button go-next" /></OSButton>
            <OSButton link=""><img src="/img/icons/go-skip.svg" alt="last page" className="window-document-nav-button go-last" /></OSButton>
          </div>
          <div className="window-document-zoombar">
            <OSButton link="">-</OSButton>
            <div className="window-document-zoom">100%</div>
            <OSButton link="">+</OSButton>
          </div>
        </div>
        <OSButton link="" onClick={() => open(props.path, "_blank")} className="window-document-row-open">
          <img src="/img/icons/os/shortcut.svg" alt="Go icon" />
          <span>Open in new tab</span>
        </OSButton>
      </div>
      <hr style={{ color: "gray", width: "99%", margin: "0.5em 0em 0.5em 0em", alignSelf: "center" }} />
    </div>
  );
}

export default WindowDocumentRow;
