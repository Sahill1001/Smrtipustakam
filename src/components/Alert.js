import React from "react";

function Alert(props) {
  return (
    <div>
      <div className="alert alert-primary text-center" role="alert">
        {props.message}
      </div>
    </div>
  );
}

export default Alert;
