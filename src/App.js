import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";
import SignIn from "./components/SignIn";
import SingnUp from "./components/SingnUp";
import AuthState from "./context/authentication/AuthState";

function App() {
  return (
    <>
      <Router>
        <NoteState>
          <AuthState>
            <Navbar />
            <Alert message="My alert" status="danger" />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signIn" element={<SignIn />} />
              <Route exact path="/signUp" element={<SingnUp />} />
            </Routes>
          </AuthState>
        </NoteState>
      </Router>
    </>
  );
}
export default App;
