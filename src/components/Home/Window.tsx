import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import OSButton from "../UI/Button";
import programs from "../Programs/programs.json";
import "./Window.scss";

interface WindowProps extends React.HTMLProps<HTMLDivElement> {
  closeProgram: () => void;
  minimizeProgram: () => void;
  bringToFront: () => void;
  program: number;
  index: number;
  desktopRef: React.RefObject<HTMLDivElement>;
  showStatusRight?: boolean;
  minimized?: boolean;
  hideButtons?: boolean;
  active: boolean;
  title?: string;
  large?: boolean;
}

function OSWindow(props: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const MouseOver = useRef(false);
  const [visible, setVisible] = useState(false);
  const [rnd, setRnd] = useState<Rnd>();
  const [scaleW, setScaleW] = useState(1);
  const [scaleH, setScaleH] = useState(1);
  const [fSize, setFSize] = useState(1);
  const [maximized, setMaximized] = useState(false);
  const [prevState, setPrevState] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const slim = props.program != -1 && programs[props.program].slim;

  // Calculate starting window height/width based on desktop size
  const calcDefaultSize = () => {
    let defaultWidth = Math.min(1024, (props.desktopRef.current?.offsetWidth || 0)) * 0.85;
    let defaultHeight = Math.min(768, (props.desktopRef.current?.offsetHeight || 0)) * 0.85;

    if (props.large) {
      defaultWidth = Math.max(300, (props.desktopRef.current?.offsetWidth || 0)) * 0.85;
      defaultHeight = Math.max(300, (props.desktopRef.current?.offsetHeight || 0)) * 0.85;
    }

    if (defaultWidth <= defaultHeight) {
      defaultHeight = Math.min(defaultHeight, defaultWidth * (4 / 3));
    } else {
      if (slim) defaultWidth *= (2 / 3);
      defaultWidth = Math.min(defaultWidth, defaultHeight * (4 / 3));
    }

    return { w: defaultWidth, h: defaultHeight };
  };

  const [defaults, setDefaults] = useState(calcDefaultSize());

  // Calculate breakpoints and font size for responsive design
  const setScaleAndBreakpoints = (w: number, h: number) => {
    if (ref.current) {
      let newScaleW = 1;
      if (w > 600) {
        newScaleW = 1;
      } else if (w > 300) {
        newScaleW = 2;
      } else {
        newScaleW = 3;
      }

      let newScaleH = 1;
      if (h > 600) {
        newScaleH = 1;
      } else if (h > 300) {
        newScaleH = 2;
      } else {
        newScaleH = 3;
      }

      let diff = Math.min(w, h);
      setFSize(Math.min(1, diff / 600));
      setScaleW(newScaleW);
      setScaleH(newScaleH);
    }
  };

  // Calculate window position and show window
  const setPosAndShow = (w: number, h: number) => {
    if (ref.current && props.desktopRef.current) {
      const dw = props.desktopRef.current.offsetWidth;
      const dh = props.desktopRef.current.offsetHeight;
      const maxX = Math.max(dw - w, 0);
      const maxY = Math.max(dh - h, 0);
      if (props.large) {
        const xOffset = (dw - w) / 2;
        const yOffset = (dh - h) / 2;
        const xDefaultPos = xOffset % maxX;
        const yDefaultPos = yOffset % maxY;
        rnd?.updatePosition({ x: xDefaultPos, y: yDefaultPos });
      } else {
        const xOffset = document.documentElement.classList.contains("screen-width-1") ? 50 : 10;
        const yOffset = document.documentElement.classList.contains("screen-height-1") ? 25 : 10;
        const xDefaultPos = (xOffset + (50 * props.index)) % maxX;
        const yDefaultPos = (yOffset + (50 * props.index)) % maxY;
        rnd?.updatePosition({ x: xDefaultPos, y: yDefaultPos });
      }
      setTimeout(() => setVisible(true), 250);
    }
  };

  // Recalculate window size and position
  const updateDimensions = () => {
    const { w, h } = calcDefaultSize();
    rnd?.updateSize({ width: w, height: h });
    setDefaults({ w, h });
    setScaleAndBreakpoints(w, h);
    setPosAndShow(w, h);
  };

  // Store/restore size/position when toggling maximize
  const toggleMaximize = () => {
    if (!maximized) {
      const { x, y } = rnd?.draggable.state;
      const w = Math.min(1024, ref.current?.offsetWidth || defaults.w);
      const h = Math.min(768, ref.current?.offsetHeight || defaults.h);
      setPrevState({ x, y, w, h });
      rnd?.updateSize({
        width: props.desktopRef.current?.offsetWidth || defaults.w,
        height: props.desktopRef.current?.offsetHeight || defaults.h
      });
      rnd?.updatePosition({ x: 0, y: 0 });
      let diff = Math.min(props.desktopRef.current?.offsetWidth || defaults.w, props.desktopRef.current?.offsetHeight || defaults.h);
      setFSize(Math.min(1, diff / 600));
    } else {
      rnd?.updateSize({ width: prevState.w, height: prevState.h });
      rnd?.updatePosition({ x: prevState.x, y: prevState.y });
      let diff = Math.min(prevState.w, prevState.h);
      setFSize(Math.min(1, diff / 600));
    }
    setMaximized(!maximized);
  };

  // Initialize window dimensions and breakpoints
  // And recalculate when screen resizes
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, [rnd]);

  // Detect click and bring window to front
  useEffect(() => {
    const onBlur = () => {
      if (MouseOver.current) {
        props.bringToFront();
      }
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
    };
  }, [MouseOver.current]);

  return (
    <Rnd
      style={{
        zIndex: props.index + 5,
        visibility: (visible && !props.minimized) ? "visible" : "hidden",
        fontSize: "16px"
      }}
      dragHandleClassName="handle"
      default={{
        x: 0,
        y: 0,
        width: `${defaults.w}px`,
        height: `${defaults.h}px`,
      }}
      minWidth={`${defaults.w * (2 / 3)}px`}
      minHeight={`${defaults.h * (2 / 3)}px`}
      onMouseDown={props.bringToFront}
      bounds="parent"
      ref={c => { setRnd(c as any); }}
      onResize={() => {
        props.bringToFront();
        setMaximized(false);
        setScaleAndBreakpoints(ref.current?.clientWidth || defaults.w, ref.current?.clientHeight || defaults.h);
      }}
    >
      <div
        ref={ref}
        className={"os-window " + ` win-width-${scaleW} win-height-${scaleH}`}
        style={{ fontSize: (Math.max(fSize, 0.1)).toString() + "em" }}
        onMouseOver={() => {
          MouseOver.current = true;
        }}
        onMouseOut={() => {
          window.focus();
          MouseOver.current = false;
        }}
      >
        {props.program == -1
          ? <div className={"os-window-titlebar" + (props.active ? " active" : "")}>
            <div style={{ flexGrow: 2, display: "flex" }} className="handle">
              <div className="os-window-titlebar-title" style={{ padding: "0.5em" }}>{props.title}</div>
            </div>
          </div>

          : <>
            <div className={"os-window-titlebar" + (props.active ? " active" : "")}>
              <div style={{ flexGrow: 2, display: "flex" }} className="handle">
                <div className="os-window-titlebar-icon"><img src={programs[props.program].picture} alt={programs[props.program].title} /></div>
                <div className="os-window-titlebar-title" onDoubleClick={toggleMaximize}>{programs[props.program].title}</div>
              </div>
              <div className="os-window-titlebar-buttons">
                <OSButton className="os-window-titlebar-minimize" onClick={props.minimizeProgram} link="" style={{ height: "0.9em", width: "0.9em" }}>-</OSButton>
                <OSButton className="os-window-titlebar-maximize" onClick={toggleMaximize} link="" style={{ height: "0.9em", width: "0.9em" }}><div className="maximize-box" /></OSButton>
                <OSButton className="os-window-titlebar-close" onClick={props.closeProgram} link="" style={{ height: "0.9em", width: "0.9em" }}>x</OSButton>
              </div>
            </div>
            <div className="os-window-file-menu">
              <div className="os-window-file-menu-option">File</div>
              <div className="os-window-file-menu-option">Edit</div>
              <div className="os-window-file-menu-option">View</div>
              <div className="os-window-file-menu-option">Help</div>
            </div>
          </>
        }

        <div className="os-window-content" style={props.program == -1 ? { borderStyle: "none" } : {}}>
          {props.children}
        </div>
        {props.program == -1 ? null
          : <div className="os-window-status">
            <div className="os-window-status-left" style={props.showStatusRight ? {} : { border: "none" }}>Ready</div>
            <div className="os-window-status-right" style={props.showStatusRight ? {} : { visibility: "hidden" }}>
              <div className="os-window-status-right-1">Read-only</div>
              <div className="os-window-status-right-2">&#8203;</div>
              <div className="os-window-status-right-3">NUM</div>
              <div className="os-window-status-right-4">&#8203;</div>
              <div className="os-window-status-right-5">&#8203;</div>
            </div>
          </div>
        }
      </div>
    </Rnd>
  );
}

export default OSWindow;