import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/Login"
import Registration from "./registration/Registration"
import TripList from "./trips/TripList"
import DataManager from "../modules/DataManager"

export default class ApplicationViews extends Component {
  state = {
    trips: []
  }

  componentDidMount() {
    const newState = {}

    DataManager.getUserTrips()
      .then(trips => newState.trips = trips)
      .then(() => this.setState(newState))


}

  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={props => {
          return <TripList />
        }} />

        <Route path="/login" render={(props) => {
          return <Login />
        }} />

        <Route path="/register" render={(props) => {
          return <Registration />
        }} />

        <Route
          path="/add_trip" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/edit_trip" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/summary" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/about" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/faq" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
