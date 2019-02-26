// This module allows the user to add other travel costs to a trip

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button } from 'semantic-ui-react'
import suitcase from "./suitcase-placeholder.png"

export default class TripOtherCost extends Component {

// otherCost is the only state required in this module

  state = {
    otherCost: '',
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

// patchTrip uses the PATCH method to add other travel costs to an existing trip

  patchTrip = () => {

    const otherCost = {
      otherCost: Number(this.state.otherCost)
    }

    const id = this.props.match.params.tripId

    console.log(otherCost);


// updateTrip function from ApplicationViews.js patches the trip, fetches the user's trips, and moves the user back to the trip dashboard.

    this.props.updateTrip(id, otherCost)
    this.props.history.push('/trips')
  }

  render() {
    return (
      <div className='otherCost-form'>

{/* The form below collects the user's other travel costs input, sets it to state, and calls the patchTrip function when the "Add other travel costs" button is clicked. The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

        <style>{`
    body > div,
    body > div > div,
    body > div > div > div.login-form {
      height: 100%;
    }
  `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as='h2' color='brown' textAlign='left'>
              <Image src={suitcase} /> Add other travel costs to this trip
      </Header>
            <Form size='large' >
              <Segment stacked>
                <Form.Input
                  placeholder='Other travel costs (total)'
                  id='otherCost'
                  onChange={this.handleFieldChange}
                  type='number'
                  icon='suitcase'
                  iconPosition='left'
                />
                <Button type='submit'
                  color='brown'
                  fluid size='large'
                  onClick={() => this.patchTrip()}
                >Add other travel costs</Button><br></br>
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