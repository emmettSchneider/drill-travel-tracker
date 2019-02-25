// This module allows the user to add the cost of a hotel room and the hotel room tax to a trip. The module also uses the previously entered trip ZIP Code to query the GSA's per diem API and return the per diem hotel room rate limit for the user's trip destination ZIP Code.

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button, Table } from 'semantic-ui-react'
import bed from "./bed-placeholder.png"
import DataManager from "../../modules/DataManager"

export default class TripLodging extends Component {

  // roomCost and roomTax are the only states required in this module


  state = {
    roomCost: '',
    roomTax: ''
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

  // patchTrip uses the PATCH method to add roomCost and roomTax to an existing trip

  patchTrip = () => {

    const lodging = {
      roomCost: Number(this.state.roomCost),
      roomTax: Number(this.state.roomTax)
    }

    const id = this.props.match.params.tripId

    console.log(lodging);

    // updateTrip function from ApplicationViews.js patches the trip, fetches the user's trips, and moves the user back to the trip dashboard.

    this.props.updateTrip(id, lodging)
    this.props.history.push('/trips')
  }

  render() {
    console.log(this.props)

    // Providing the user with a visual per diem reference is still in progress. The API fetch works, now I need to display the relevant data in the cells of the table.

    let perDiemLodging = DataManager.getOneTrip(this.props.match.params.tripId)
      .then(r => DataManager.getRates(r.tripYear, r.zipCode))
      .then(r => {
        let tripRate = r.result.records[0]
        console.log(tripRate)
      })


    // DataManager.getOneTrip(this.props.match.params.tripId)
    //   .then(r => DataManager.getRates(r.tripYear, r.zipCode))
    //   .then(r => {
    //     let tripRate = r.result.records[0]
    //     console.log(tripRate)
    //   })

    return (

      <React.Fragment>
        <div className='lodging-form'>

          {/* The form below collects the user's room cost and room tax input, sets it to state, and calls the patchTrip function when the "Add cost of lodging" button is clicked. The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

          <style>{`
    body > div,
    body > div > div,
    body > div > div > div.login-form {
      height: 100%;
    }
  `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='left'>
                <Image src={bed} /> Add cost of lodging to this trip
      </Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Zip Code</Table.HeaderCell>
                    <Table.HeaderCell>Zip will go here</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>ZIP Code</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>City</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>State</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>State</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>State</Table.Cell>
                    <Table.Cell>Cell</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Form size='large' >
                <Segment stacked>
                  <Form.Input
                    placeholder='Room cost (excluding taxes)'
                    id='roomCost'
                    onChange={this.handleFieldChange}
                    type='number'
                    icon='bed'
                    iconPosition='left'
                  />
                  <Form.Input
                    placeholder='Room cost (excluding taxes)'
                    id='roomCost'
                    onChange={this.handleFieldChange}
                    type='number'
                    icon='bed'
                    iconPosition='left'
                  />
                  <Form.Input
                    placeholder='Room taxes &amp; fees'
                    id='roomTax'
                    onChange={this.handleFieldChange}
                    type='number'
                    icon='university'
                    iconPosition='left'
                  />
                  <Button type='submit'
                    color='teal'
                    fluid size='large'
                    onClick={() => this.patchTrip()}
                  >Add cost of lodging</Button>
                  <br></br>
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
      </React.Fragment>
    )
  }
}