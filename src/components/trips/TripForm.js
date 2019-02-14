import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { DatesRangeInput } from 'semantic-ui-calendar-react'

export default class TripForm extends Component {

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

    this.props.addTrip(trip).then(() => this.props.history.push('/trips'));
  }

  render() {
    return (
      <React.Fragment>
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