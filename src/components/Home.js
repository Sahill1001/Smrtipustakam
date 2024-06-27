import AddNote from "./AddNote";
import Note from "./Note";

function Home() {
  return (
    <div className="container my-4">
      <AddNote />
      <Note />
    </div>
  );
}

export default Home;
