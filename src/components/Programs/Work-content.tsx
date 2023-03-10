import { company } from "../../types";
import "./Work-content.scss";

function ProgramWorkContent(props: company) {
  return (
    <div className="program-work-sheet-rows-content">
      <div className="program-work-sheet-rows-content-company">
        <div className="program-work-sheet-rows-content-company-info">
          <div className="program-work-sheet-rows-content-company-info-row">
            <div>Company</div>
            <div>{props.company}</div>
          </div>
          <div className="program-work-sheet-rows-content-company-info-row">
            <div>Location</div>
            <div>{props.location}</div>
          </div>
          <div className="program-work-sheet-rows-content-company-info-row">
            <div>Start</div>
            <div>{props.start}</div>
          </div>
          <div className="program-work-sheet-rows-content-company-info-row">
            <div>End</div>
            <div>{props.end}</div>
          </div>
        </div>
        <div className="program-work-sheet-rows-content-company-img">
          <img src={props.picture} alt={props.company} />
        </div>

      </div>
      <div className="program-work-sheet-rows-content-rows">
        <div>Primary Technologies Used:</div>
        <div><span>{props.tech}</span></div>
      </div>
      <div className="program-work-sheet-rows-content-rows">
        <div>Achievements:</div>
        <div><span>{props.work1}</span></div>
        <div><span>{props.work2}</span></div>
        <div><span>{props.work3}</span></div>
      </div>
    </div>
  );
}

export default ProgramWorkContent;
