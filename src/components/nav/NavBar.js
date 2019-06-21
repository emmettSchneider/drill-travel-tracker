import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import { Header, Image } from 'semantic-ui-react'
import dttLogo from "./DTT_logo.png"


class NavBar extends Component {

  handleLogout = () => {
    sessionStorage.clear()
    console.log("Log out button pressed")
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-logo-color static-top">
        <div class="container">
          <Link to="/trips">
            <Image className="dtt-logo" src={dttLogo} alt="" />
          </Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/trips/add"><p class="text-light">Add New Trip</p></Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/trips/summary"><p class="text-light">View Trip Expense Summary</p></Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/" onClick={() => this.handleLogout()}><p class="bg-text-color">Log out</p></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
