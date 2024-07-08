import { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/note/noteContext";
import NoteItem from "./NoteItem";
function Note() {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, updateNote } = context;

  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  //Handle Onchange
  const onChangeInputs = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const editNote = ({ _id, title, description, tags }) => {
    setNote({
      id: _id,
      title: title,
      description: description,
      tag: tags,
    });
    ref.current.click();
  };

  //Handle submit
  const saveChanges = () => {
    updateNote(note);
    closeRef.current.click();
  };

  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      />
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                ref={closeRef}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control title"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={onChangeInputs}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control description"
                  id="description"
                  name="description"
                  value={note.description}
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
                  className="form-control tag"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onChangeInputs}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.title.length < 3 || note.description.length < 5}
                type="button"
                onClick={saveChanges}
                className="btn btn-dark"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 className="my-2">Your notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} editNote={editNote} note={note} />;
        })}
      </div>
    </>
  );
}

export default Note;
