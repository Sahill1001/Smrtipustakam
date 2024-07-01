import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const initialNotes = [];

  let url = "http://localhost:5000/api/v1/";

  //fetch all notes
  const fetchAllNotes = async () => {
    const response = await fetch(`${url}notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQ5YWNkMDYyZmY3MzVlZDFhNjc4In0sImlhdCI6MTcxOTQxNjEyMH0.imLWNdkcao8Xpsdl2Otn-4vY8rOnoDrgZNVq3ANx_AM",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const [notes, setNotes] = useState(initialNotes);

  //Add note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${url}notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQ5YWNkMDYyZmY3MzVlZDFhNjc4In0sImlhdCI6MTcxOTQxNjEyMH0.imLWNdkcao8Xpsdl2Otn-4vY8rOnoDrgZNVq3ANx_AM",
      },
      body: JSON.stringify({
        title: String(title),
        description: String(description),
        tags: String(tag),
      }),
    });

    const note = await response.json();

    // Adding the note to the end of the notes array using concat
    // setNotes(notes.concat(note));

    // Adding the note to the end of the notes array using the spread operator
    // setNotes([...notes, note]);

    // Adding the note to the beginning of the notes array using concat
    // setNotes([note].concat(notes));

    // Adding the note to the beginning of the notes array using the spread operator

    if (response.status === 200) {
      setNotes([note, ...notes]);
    } else if (response.status === 400) {
      console.log(
        note.errors.map((error) => {
          return error.msg;
        })
      );
    } else {
      console.log(response);
    }
  };

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${url}notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQ5YWNkMDYyZmY3MzVlZDFhNjc4In0sImlhdCI6MTcxOTQxNjEyMH0.imLWNdkcao8Xpsdl2Otn-4vY8rOnoDrgZNVq3ANx_AM",
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    } else {
      console.log(response);
    }
  };

  //Update note

  const updateNote = async (id) => {
    const response = await fetch(`${url}notes/deleteNote/${id}`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ODQ5YWNkMDYyZmY3MzVlZDFhNjc4In0sImlhdCI6MTcxOTQxNjEyMH0.imLWNdkcao8Xpsdl2Otn-4vY8rOnoDrgZNVq3ANx_AM",
      },
    });

    const json = await response.json();
    console.log(json);
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchAllNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
