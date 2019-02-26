import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Dtt.css";
import { Header } from 'semantic-ui-react'

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
