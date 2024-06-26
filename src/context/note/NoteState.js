import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const data = {
    name: "Sahil",
    age: 23,
  };

  const [state, setState] = useState(data);

  const update = () => {
    setTimeout(() => {
      setState({ name: "Neeraj", age: 20 });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
