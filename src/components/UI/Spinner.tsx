import { useEffect } from "react";
import "./Spinner.scss";

interface SpinnerProps extends React.HTMLProps<HTMLDivElement> {
  delay?: number;
  setDone?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Spinner(props: SpinnerProps) {
  const delay = props.delay != null ? props.delay : 500;

  useEffect(() => {
    setTimeout(() => {
      if (props.setDone) props.setDone(true);
    }, delay);
  });

  return (
    <div className="spinner-component" style={{ ...props.style }}>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
