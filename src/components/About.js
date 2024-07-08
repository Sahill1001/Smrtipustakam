import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/signIn");
    }
    // eslint-disable-next-line 
  });
  return <div className="container">This is about page</div>;
}

export default About;
