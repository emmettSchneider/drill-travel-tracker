import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './login/Login'
import Registration from "./registration/Registration"
import TripList from './trips/TripList'
import TripForm from './trips/TripForm'
import DataManager from '../modules/DataManager'

export default class ApplicationViews extends Component {
  state = {
    trips: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  componentDidMount() {

    DataManager.getAllTrips()
      .then(trips => {
        this.setState({ trips: trips });
      })
  }

  addUser = (user) => DataManager.postUser(user)
    .then(() => DataManager.getAllTrips())
    .then(trips => this.setState({
      trips: trips
    }))

  addTrip = (trip) => DataManager.postTrip(trip)
    .then(() => DataManager.getAllTrips())
    .then(trips => this.setState({
      trips: trips
    })
    )

  updateComponent = () => {
    DataManager.getAllTrips()
      .then(trips => {
        this.setState({ trips: trips });
      })
  }

  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <TripList {...props}
              trips={this.state.trips}
              />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/login" render={(props) => {
          return <Login {...props} />
        }} />

        <Route path="/register" render={(props) => {
          return <Registration {...props}
            addUser={this.addUser} />
        }} />

        <Route
          path="/add_trip" render={(props) => {
            return <TripForm {...props}
              addTrip={this.addTrip} />
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
