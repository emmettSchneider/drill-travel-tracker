import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Dtt.css";
// import DataManager from "../modules/DataManager";

class Dtt extends Component {
  render() {
    return (

      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}

// DataManager.getRates();
// DataManager.getAllTrips();
// DataManager.getUserTrips(1);

export default Dtt;
