import React, { useContext, useEffect } from "react";
import noteContext from "../context/note/noteContext";

function About() {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      This is about page - {a.state.name} - your age is {a.state.age}
    </div>
  );
}

export default About;
