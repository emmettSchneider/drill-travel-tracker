import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from 'semantic-ui-react'


class NavBar extends Component {

  handleLogout = () => {
    sessionStorage.clear()
    console.log("Log out button pressed")
  }

  render() {
    return (
      <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
      <Header as='h1' color='brown'>Drill Travel Tracker</Header>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <Link className="nav-link" to="/trips">Trip dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trips/add">Add New Trip</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trips/summary">View Trip Expense Summary</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={() => this.handleLogout()}>Log out</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/faq">FAQ</Link>
          </li> */}
        </ul>
      </nav>
    )
  }
}

export default withRouter (NavBar)
