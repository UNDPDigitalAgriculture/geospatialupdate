import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./App.css";
import Fullpage from "./Fullpage";
import Sidebar from "./Sidebar";
import NewMap from "./NewMap";

function App() {
  const [password, setPassword] = useState("");
  const handleChange = (e, v) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  return password != `farms` ? (
    <TextField onChange={handleChange}></TextField>
  ) : (
    <Fullpage />
  );
  // <>
  //   <Sidebar />
  //   <NewMap />
  // </>
}

export default App;
