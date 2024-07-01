import { useContext, useEffect } from "react";
import noteContext from "../context/note/noteContext";
import NoteItem from "./NoteItem";
function Note() {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes } = context;

  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, []); // Empty dependency array

  return (
    <div className="row">
      <h2 className="my-2">Your notes</h2>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
}

export default Note;
