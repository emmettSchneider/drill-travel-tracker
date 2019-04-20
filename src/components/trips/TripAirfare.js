// This module allows the user to add airfare to a trip

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button } from 'semantic-ui-react'
import airplane from "./airplane-placeholder.png"

export default class TripAirfare extends Component {

// Airfare is the only state required in this module

  state = {
    airfare: '',
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

// patchTrip uses the PATCH method to add airfare to an existing trip

  patchTrip = () => {

    const airfare = {
      airfare: Number(this.state.airfare)
    }

    const id = this.props.match.params.tripId

    console.log(airfare);


// updateTrip function from ApplicationViews.js patches the trip, fetches the user's trips, and moves the user back to the trip dashboard.

    this.props.updateTrip(id, airfare)
    this.props.history.push('/trips')
  }

  render() {
    return (
      <div className='airfare-form'>

{/* The form below collects the user's airfare input, sets it to state, and calls the patchTrip function when the "Add airfare" button is clicked. The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

        <style>{`
    body > div,
    body > div > div,
    body > div > div > div.login-form {
      height: 100%;
    }
  `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='brown' textAlign='left'>
              <Image src={airplane} /> Add airfare to this trip
      </Header>
            <Form size='large' >
              <Segment stacked>
                <Form.Input
                  placeholder='Airfare (total)'
                  id='airfare'
                  onChange={this.handleFieldChange}
                  type='number'
                  icon='plane'
                  iconPosition='left'
                />
                <Button type='submit'
                  color='brown'
                  fluid size='large'
                  onClick={() => this.patchTrip()}
                >Add airfare</Button><br></br>
                <Button
                  color='grey'
                  fluid size='large'
                  onClick={() => this.props.history.push('/trips')}>
                  Cancel</Button>
              </Segment>
            </Form>

          </Grid.Column>
        </Grid>
      </div>
    )
  }
}