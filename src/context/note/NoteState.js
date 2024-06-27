import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNote = [
    {
      _id: "667afb771rd6e06b9440d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667c35f6q3be82af28194c6de4",
      user: "667849acd062ff735ed1a678",
      title: "Note a note",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-26T15:38:30.948Z",
      __v: 0,
    },
    {
      _id: "667afb7w71d6e06b940eed0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb771d6e06eb940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb771d6e0w6b940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb771d6e066eb940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb771d6e06rb940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb7e71d6e06b940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
    {
      _id: "667afb771ed6e06b940d0c305",
      user: "667849acd062ff735ed1a678",
      title: "My Note Title",
      description: "This is for me Guys",
      tags: "General",
      date: "2024-06-25T17:16:39.717Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(initialNote);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
