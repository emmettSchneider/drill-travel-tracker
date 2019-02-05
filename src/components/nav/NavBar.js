import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add_trip">Add New Trip</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/edit_trip">Edit Previous Trip</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/summary">View Trip Expense Summary</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/faq">FAQ</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
