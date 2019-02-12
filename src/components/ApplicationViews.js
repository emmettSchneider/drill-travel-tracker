import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import Login from './login/Login'
import RegisterUser from "./registration/RegisterUser"
import TripList from './trips/TripList'
import TripForm from './trips/TripForm'
import TripEditLinks from './trips/TripEditLinks'


export default class ApplicationViews extends Component {
  state = {
    trips: [],
    userId: ''
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  userTrips = () => {
    return DataManager.getAllTrips()
      .then(trips => {console.log(trips)
        this.setState({ trips: trips });
      })
  }

  componentDidMount() {
    this.userTrips()
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


  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={(props) => {
          return <Login to="/login" {...props}
            userTrips={this.userTrips} />
        }} />

        <Route exact path="/trips" render={(props) => {
          if (this.isAuthenticated()) {
            return <TripList {...props}
              trips={this.state.trips} />
          } else { return <Redirect to='/login' /> }
        }} />

        <Route path="/register" render={(props) => {
          return <RegisterUser {...props}
            addUser={this.addUser} />
        }} />


        <Route
          exact path="/trips/add" render={(props) => {
            return <TripForm {...props}
              addTrip={this.addTrip} />
          }}
        />

        <Route
          path="/trips/edit/:tripId(\d+)/"
          render={props => {
            return <TripEditLinks {...props}
              updateTrip={this.updateTrip}
            />
          }
          }
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
