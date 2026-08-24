import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import InterviewSetup from "./InterviewSetup";
import InterviewSession from "./InterviewSession";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/setup" element={<InterviewSetup/>}/>
        <Route path="/start" element={<InterviewSession/>}/>
      </Routes>
    </Router>
  );
}

export default App;