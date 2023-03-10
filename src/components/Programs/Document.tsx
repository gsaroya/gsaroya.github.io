import WindowDocumentRow from "../UI/Window-DocumentRow";
import "./Document.scss";

interface DocumentProps {
  link: string;
}

function ProgramDocument(props: DocumentProps) {
  return (
    <div className="program program-document">
      <WindowDocumentRow path={props.link} />
      <div className="program-document-pdf">
        <embed type="application/pdf"
          src={props.link}
          width="100%"
          height="100%" />
      </div>
    </div>
  );
}

export default ProgramDocument;
