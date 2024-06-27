import React from "react";

function AddNote() {
  return (
    <>
      <h2>Add note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control title"
          id="title"
          name="title"
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
          rows="3"
        ></textarea>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-dark">
          Add Note
        </button>
      </div>
    </>
  );
}

export default AddNote;
