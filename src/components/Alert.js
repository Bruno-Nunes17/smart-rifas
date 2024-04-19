import ReactDOM from "react-dom";
import AlertBS from "react-bootstrap/Alert";
import "./alert.css"

function Alert({ message, variant = "success", onClose }) {

  return ReactDOM.createPortal(
    <div className="notification">
      <AlertBS variant={variant} onClose={onClose} dismissible>
        <AlertBS.Heading>{message}</AlertBS.Heading>
      </AlertBS>
    </div>,
    document.body
  );
}

export default Alert;
