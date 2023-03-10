import { company } from "../../types";
import companies from "./companies.json";
import ProgramWorkContent from "./Work-content";
import OSButton from "../UI/Button";
import Scrollbar from "../UI/Scrollbar";
import WindowFontRow from "../UI/Window-FontRow";
import loadImage from "../UI/LoadImage";
import Spinner from "../UI/Spinner";
import "./Work.scss";
import { useState } from "react";

interface WorkProps {
  bringToFront: () => void;
}

interface WorkRowProps {
  num: number;
}
interface WorkRowContentProps {
  offset: number,
  company: company;
}

function ProgramWorkRowCells(props: WorkRowProps) {
  return (
    <div className="program-work-sheet-row-cells">
      {[...Array(props.num).keys()].map(val => (
        <div key={val}>&#8203;</div>
      ))}
    </div>
  );
}

function ProgramWorkRow(props: WorkRowProps) {
  return (
    <div className="program-work-sheet-row">
      <div className="program-work-sheet-row-num">{props.num}</div>
      <ProgramWorkRowCells num={52} />
    </div>
  );
}

function ProgramWorkContentRows(props: WorkRowContentProps) {
  return (
    <div className="program-work-sheet-row">
      <div className="program-work-sheet-rows">
        <div className="program-work-sheet-rows-left">
          {[...Array(10).keys()].map(val => (
            <div key={val} className="program-work-sheet-row-num">{props.offset + val}</div>
          ))}
        </div>
        <div className="program-work-sheet-rows-right">
          {[...Array(10).keys()].map(val => (
            <ProgramWorkRowCells key={val} num={1} />
          ))}
        </div>
        <ProgramWorkContent {...props.company} />
        <div className="program-work-sheet-rows-right">
          {[...Array(10).keys()].map(val => (
            <ProgramWorkRowCells key={val} num={46} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramWork(props: WorkProps) {
  const [loaded, setLoaded] = useState(false);
  const images = [
    loadImage("/img/icons/go-skip.svg"),
    loadImage("/img/icons/go-next.svg"),
    loadImage("/img/icons/os/arrow-down.svg"),
    loadImage("/img/icons/align-left.svg"),
    loadImage("/img/icons/align-center.svg"),
    loadImage("/img/icons/align-right.svg"),
    ...companies.map(company => loadImage(company.picture)),
  ];

  if (!loaded || !images.every(src => src)) return <Spinner setDone={setLoaded} style={{ height: "100%", width: "100%" }} />;

  return (
    <div className="program program-work">
      <WindowFontRow />
      <div className="program-work-sheet-row program-work-cols">
        <div>&#8203;</div>
        {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(letter => (
          <div key={"col" + letter}>{letter}</div>
        ))}
        {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(letter => (
          <div key={"colA" + letter}>{"A" + letter}</div>
        ))}
      </div>
      <Scrollbar onClick={props.bringToFront}>
        <div className="program-work-sheet">
          <ProgramWorkRow num={1} />
          <ProgramWorkContentRows offset={2} company={companies[0]} />
          <ProgramWorkRow num={12} />
          <ProgramWorkContentRows offset={13} company={companies[1]} />
          <ProgramWorkRow num={23} />
          <ProgramWorkContentRows offset={24} company={companies[2]} />
          <ProgramWorkRow num={34} />
          <ProgramWorkContentRows offset={35} company={companies[3]} />
          {[...Array(40).keys()].map(num => <ProgramWorkRow num={num + 45} key={"row" + String(num + 45)} />)}
        </div>
      </Scrollbar>
      <div className="program-work-sheet-select">
        <div className="program-work-sheet-select-buttons">
          <OSButton link=""><img src="/img/icons/go-skip.svg" alt="first sheet" className="program-work-sheet-select-button go-first" /></OSButton>
          <OSButton link=""><img src="/img/icons/go-next.svg" alt="prev sheet" className="program-work-sheet-select-button go-prev" /></OSButton>
          <OSButton link=""><img src="/img/icons/go-next.svg" alt="next sheet" className="program-work-sheet-select-button go-next" /></OSButton>
          <OSButton link=""><img src="/img/icons/go-skip.svg" alt="last sheet" className="program-work-sheet-select-button go-last" /></OSButton>
          <div className="program-work-sheet-select-name">
            <svg className="program-work-sheet-select-name-img" viewBox="0 0 100 35" preserveAspectRatio="xMidYMid meet">
              <path d="M0,0 L20,35 L80,35 L100,0" stroke="black" strokeWidth="1" fill="white" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={18}>Sheet1</text>
            </svg>
          </div>
        </div>
        <div className="program-work-sheet-select-right"></div>
      </div>
    </div>
  );
}

export default ProgramWork;
