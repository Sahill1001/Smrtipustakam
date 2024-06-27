import { useContext } from "react";
import noteContext from "../context/note/noteContext";
import NoteItem from "./NoteItem";
function Note() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
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
