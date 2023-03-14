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
        <object type="application/pdf" data={props.link} />
      </div>
    </div>
  );
}

export default ProgramDocument;
