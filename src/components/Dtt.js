import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Dtt.css";

class Dtt extends Component {

  isAuthenticated = () => sessionStorage.getItem("userId") !== null


  render() {
    if (this.isAuthenticated()) {
      return (
        <React.Fragment>
          <NavBar />
          <ApplicationViews />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <ApplicationViews />
        </React.Fragment>
      )
    }
  }
}

export default Dtt;
