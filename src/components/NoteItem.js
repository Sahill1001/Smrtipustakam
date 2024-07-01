import React, { useContext } from "react";
import noteContext from "../context/note/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const {title, description } = props.note;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div className="icons">
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  context.deleteNote(props.note._id);
                }}
              ></i>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{context.updateNote(props._id)}}></i>
            </div>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
