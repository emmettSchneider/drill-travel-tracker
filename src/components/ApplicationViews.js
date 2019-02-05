import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import LoginForm from "./login/Login"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route path="/login" render={(props) => {
          return <LoginForm />
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
