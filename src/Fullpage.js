import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Redirect, Link, Route, Switch } from "react-router-dom";
import Button from "@mui/material/Button";
import Sidebar from "./Sidebar";
import NewMap from "./NewMap";
import CompareMaps from "./CompareMaps";
import Trends from "./Trends";
import ReactFullpage from "@fullpage/react-fullpage";

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey={"YOUR_KEY_HERE"}
    scrollingSpeed={1000} /* Options here */
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
          <div className="section header" style={{ textAlign: "center" }}>
            <h1
              style={{
                color: "white",
                fontSize: "44px",
                backgroundColor: "rgba(28, 28, 28, 0.38)",
              }}>
              UNDP DIGITAL AGRICULUTURE GEOSPATIAL PLATORM
            </h1>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => fullpageApi.moveSectionDown()}>
              Enter
            </Button>
          </div>
          <div className="section" data-anchor="section1">
            <Sidebar />
            <NewMap />
          </div>
          <div className="section" data-anchor="section2">
            <Sidebar func={fullpageApi} />
            <CompareMaps />
          </div>
          <div className="section" data-anchor="section3">
            <Sidebar func={fullpageApi} />
            <Trends />
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage;
