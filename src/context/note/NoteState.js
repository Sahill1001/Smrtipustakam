import { useState } from "react";
import NoteContext from "./noteContext";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate = useNavigate();

  const initialNotes = [];
  let url = "http://localhost:5000/api/v1/";
  //fetch all notes
  const fetchAllNotes = async () => {
    // Check if 'auth-token' is not in local storage
    if (!localStorage.getItem("auth-token")) {
      // Navigate to the sign-in page
      navigate("/signIn");
    }
    const response = await fetch(`${url}notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const [notes, setNotes] = useState(initialNotes);

  //Add note
  const addNote = async ({ title, description, tag }) => {
    // Check if 'auth-token' is not in local storage
    if (!localStorage.getItem("auth-token")) {
      // Navigate to the sign-in page
      navigate("/signIn");
    }
    const response = await fetch(`${url}notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
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
    // Check if 'auth-token' is not in local storage
    if (!localStorage.getItem("auth-token")) {
      // Navigate to the sign-in page
      navigate("/signIn");
    }
    const response = await fetch(`${url}notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
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

  const updateNote = async ({ id, title, description, tag }) => {
    // Check if 'auth-token' is not in local storage
    if (!localStorage.getItem("auth-token")) {
      // Navigate to the sign-in page
      navigate("/signIn");
    }
    try {
      const response = await fetch(`${url}notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          title: String(title),
          description: String(description),
          tags: String(tag),
        }),
      });

      if (response.status === 200) {
        const json = await response.json();
        // console.log(json);
        // Find the index of the note with the matching _id
        const index = notes.findIndex((note) => note._id === json._id);
        // Check if the note exists
        if (index !== -1) {
          // Update the note value immutably
          setNotes((prevNotes) =>
            prevNotes.map((note, i) =>
              i === index
                ? { ...note, title: title, description: description, tags: tag }
                : note
            )
          );
        }
      } else {
        console.log("Some error occurred !");
      }
    } catch (error) {
      console.log(error);
    }
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
