import OSButton from "./Button";
import "./Window-FontRow.scss";

function WindowFontRow() {
  return (
    <>
      <div className="window-fontrow">
        <div className="window-fontrow-left">
          <div className="window-fontrow-dropdown">
            <div className="window-fontrow-box"></div>
            <img src="/img/icons/os/arrow-down.svg" alt="Arrow Down icon" />
          </div>
          <div className="window-fontrow-dropdown2">
            <div className="window-fontrow-box"></div>
            <img src="/img/icons/os/arrow-down.svg" alt="Arrow Down icon" />
          </div>
          <div className="window-fontrow-font-options">
            <OSButton link=""><span className="bold">B</span></OSButton>
            <OSButton link=""><span className="italics">I</span></OSButton>
            <OSButton link=""><span className="underline">U</span></OSButton>
          </div>
          <div className="window-fontrow-align-options">
            <OSButton link=""><img src="/img/icons/align-left.svg" alt="Left Align" className="left-align" /></OSButton>
            <OSButton link=""><img src="/img/icons/align-center.svg" alt="Center Align" className="center-align" /></OSButton>
            <OSButton link=""><img src="/img/icons/align-right.svg" alt="Right Align" className="right-align" /></OSButton>
          </div>
        </div>
        <div className="window-fontrow-right"></div>
      </div>
      <hr style={{ color: "gray", width: "99%", margin: "0.5em 0em 0.5em 0em", alignSelf: "center" }} />
    </>
  );
}

export default WindowFontRow;
