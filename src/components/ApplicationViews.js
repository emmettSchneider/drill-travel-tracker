import { Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import Login from './login/Login'
import RegisterUser from "./registration/RegisterUser"
import TripList from './trips/TripList'
import TripForm from './trips/TripForm'
import TripLodging from './trips/TripLodging'
import TripMeals from './trips/TripMeals'
import TripAirfare from './trips/TripAirfare'


export default class ApplicationViews extends Component {
  state = {
    trips: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  userTrips = () => {
    return DataManager.getAllTrips()
      .then(trips => {
        console.log(trips)
        this.setState({ trips: trips });
      })
  }

  componentDidMount() {
    DataManager.getAllTrips()
      .then(trips => {
        this.setState(
          { trips: trips })
      })
  }

  addUser = (user) => DataManager.postUser(user)
    .then(() => DataManager.getAllTrips())
    .then(trips => this.setState(
      { trips: trips })
    )

  addTrip = (trip) => DataManager.postTrip(trip)
    .then(() => DataManager.getAllTrips())
    .then(trips => this.setState(
      { trips: trips })
    )

  deleteTrip = id => {
    console.log("Yes, deleteTrip is a function.")
    DataManager.deleteTrip(id)
      .then(() => DataManager.getAllTrips())
      .then(trips => this.setState(
        { trips: trips }))
  }

  updateTrip = (id, trip) => {
    console.log("Here goes nothing!")
    DataManager.patchTrip(id, trip)
      .then(() => DataManager.getAllTrips())
      .then(trips => this.setState(
        { trips: trips }))
  }


  // (id) => {
  //   return fetch(`http://localhost:5002/trips/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(r => r.json())
  //     .then(() => DataManager.getAllTrips())
  //     .then(trips =>
  //       this.setState({
  //         trips: trips
  //       })
  //     )
  // }



  // return DataManager.deleteThisTrip(id)
  //   .then(() => DataManager.getAllTrips())
  //   .then(trips => this.setState(
  //     { trips: trips })
  //   )
  // }


  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to='/trips' />
          } else { return <Redirect to='/login' /> }
        }} />

        <Route exact path="/trips" render={(props) => {
          if (this.isAuthenticated()) {
            return <TripList {...props}
              deleteTrip={this.deleteTrip}
              trips={this.state.trips} />
          } else { return <Redirect to='/login' /> }
        }} />

        <Route path="/login" render={(props) => {
          if (this.isAuthenticated()) {
            return <Redirect to='/trips' />
          } else {
            return <Login to='/login' {...props}
              userTrips={this.userTrips} />
          }
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
          path="/trips/lodging/:tripId(\d+)/"
          render={props => {
            return <TripLodging {...props}
              updateTrip={this.updateTrip} />
          }}
        />

        <Route
          path="/trips/meals/:tripId(\d+)/"
          render={props => {
            return <TripMeals {...props}
              updateTrip={this.updateTrip} />
          }}
        />

        <Route
          path="/trips/airfare/:tripId(\d+)/"
          render={props => {
            return <TripAirfare {...props}
              updateTrip={this.updateTrip} />
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
