// This module allows the user to create a trip. The intent is to make the inital creation of a trip simple. To meet that intent, the user is only asked for the trip start and end date, destination ZIP Code and one-way distance traveled in a POV to the trip destination. All other expenses related to the newly-created trip are set to a default value of 0. Once the trip is created, the user can patch the values of other trip expenses from the trip dashboard.

import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react'

export default class TripForm extends Component {

  // datesRange, zipCode and tripMiles are the only states required in this module. The datesRange state is parsed to make a tripStart and tripEnd date when the trip is created in the addNewTrip function.

  state = {
    datesRange: '',
    zipCode: '',
    tripMiles: ''
  }

  handleFieldChange = (e) => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  // addNewTrip uses the POST method to add a new trip to the database. Many of the trip key/value pairs are set to a default value of 0 to make initial creation of a trip simpler since a traveler often doesn't know all trip expenses at the start of a trip.

  addNewTrip = () => {
    let currentUser = Number(sessionStorage.getItem("userId"))

    const trip = {
      userId: currentUser,
      tripYear: this.state.datesRange.slice(6, 10),
      tripStart: this.state.datesRange.slice(0, 10),
      tripEnd: this.state.datesRange.slice(13, 23),
      zipCode: Number(this.state.zipCode),
      tripMiles: Number(this.state.tripMiles * 2),
      localMiles: 0,
      airfare: 0,
      rentalCar: 0,
      mealCost: 0,
      roomCost: 0,
      roomTax: 0,
      otherCost: 0
    }

    console.log(trip);

    // addTrip function from ApplicationViews.js posts the trip, fetches the user's trips, and moves the user back to the trip dashboard.

    this.props.addTrip(trip).then(() => this.props.history.push('/trips'));
  }

  render() {
    return (
      <React.Fragment>

        {/* The form below collects the user's trip start and end date, trip destination ZIP Code, and one-way distance traveled in a POV to the trip destination; sets this information to state, and calls the addTrip function when the "Save trip" button is clicked. **ADD CLARIFYING INFORMATION FOR TRIP MILES**. **ADD CANCEL BUTTON** The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

        <Form>
          <Form.Field>
            <label>Trip start and end</label>
            <DatesRangeInput
              name="datesRange"
              placeholder="From - To"
              value={this.state.datesRange}
              iconPosition="left"
              onChange={this.handleChange}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Destination ZIP Code</label>
            <input placeholder='ZIP Code'
              id='zipCode'
              onChange={this.handleFieldChange}
              type='number'
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Distance from home to destination</label>
            <input placeholder='One-way distance (miles)'
              id='tripMiles'
              onChange={this.handleFieldChange}
              type='number'
            />
          </Form.Field>
          <Button type='submit'
            onClick={() => this.addNewTrip()}
          >Save trip</Button>
        </Form>

      </React.Fragment >
    )
  }
}