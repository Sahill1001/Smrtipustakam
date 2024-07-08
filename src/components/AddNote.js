import React, { useContext, useState } from "react";
import noteContext from "../context/note/noteContext";

function AddNote(props) {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const context = useContext(noteContext);
  const { addNote } = context;

  // Handle OnChange
  const onChangeInputs = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = () => {
    addNote(note);
    props.showAlert("Note added successfully","success");
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <>
      <h2>Add note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          value={note.title}
          className="form-control title"
          id="title"
          name="title"
          onChange={onChangeInputs}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control description"
          value={note.description}
          id="description"
          name="description"
          onChange={onChangeInputs}
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          value={note.tag}
          className="form-control tag"
          id="tag"
          name="tag"
          onChange={onChangeInputs}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="button"
          className="btn btn-dark"
          onClick={handleSubmit}
        >
          Add Note
        </button>
      </div>
    </>
  );
}

export default AddNote;
