// This module allows the user to add the cost of a hotel room and the hotel room tax to a trip. The module also uses the previously entered trip ZIP Code to query the GSA's per diem API and return the per diem hotel room rate limit for the user's trip destination ZIP Code.

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button, Table } from 'semantic-ui-react'
import bed from "./bed-placeholder.png"
import DataManager from "../../modules/DataManager"

export default class TripLodging extends Component {

  // roomCost and roomTax are the only states required in this module


  state = {
    roomCost: '',
    roomTax: '',
    trip: {},
    tripRate: {},
    month: ''
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

  currentTrip = () => {
    DataManager.getOneTrip(this.props.match.params.tripId)
      .then(r =>
        this.setState({ trip: r }))
  }

  // tripMonth = () => {
  //   let months = ["Zero", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //   console.log(this.state.trip)
  //   if (this.state.trip !== undefined) {
  //     console.log(this.state.trip)
  //     let month = this.state.trip.tripStart.slice(3, 5)
  //     console.log(month)
  //     // this.setState({ month: month })
  //   }
  // }


  perDiemLodgingRates = () => {
    DataManager.getOneTrip(this.props.match.params.tripId)
      .then(r => DataManager.getRates(r.tripYear, r.zipCode))
      .then(r => {
        let tripRate = r.result.records[0]
        this.setState({ tripRate: tripRate })
      })
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

  componentDidMount() {
    this.currentTrip()
    // this.tripMonth()
    this.perDiemLodgingRates()
  }

  render() {
    console.log(this.state.trip)


    // Providing the user with a visual per diem reference is still in progress. The API fetch works, now I need to display the relevant data in the cells of the table.






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
            <Grid.Column style={{ maxWidth: 650 }}>
              <Header as='h2' color='teal' textAlign='left'>
                <Image src={bed} /> Add cost of lodging to this trip
      </Header>

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
                  {/* <Form.Input
                    placeholder='Room cost (excluding taxes)'
                    id='roomCost'
                    onChange={this.handleFieldChange}
                    type='number'
                    icon='bed'
                    iconPosition='left'
                  /> */}
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

              <Table celled>
                {console.log(this.state.tripRate)}
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='4'>Trip destination per diem room cost limit by month.
                    <br></br>
                    Room cost limit excludes taxes, which are an additional and separate travel expense.
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell colSpan='4'>
                    <strong>Location:</strong> {this.state.tripRate.LocationDefined}
                    <br></br>
                    <strong>State:</strong> {this.state.tripRate.State}
                    <br></br>
                    <strong>ZipCode:</strong> {this.state.tripRate.Zip}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Jan: ${this.state.tripRate.Jan}</Table.Cell>
                    <Table.Cell>Feb: ${this.state.tripRate.Feb}</Table.Cell>
                    <Table.Cell>Mar: ${this.state.tripRate.Mar}</Table.Cell>
                    <Table.Cell>Apr: ${this.state.tripRate.Apr}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>May: ${this.state.tripRate.May}</Table.Cell>
                    <Table.Cell>Jun: ${this.state.tripRate.Jun}</Table.Cell>
                    <Table.Cell>Jul: ${this.state.tripRate.Jul}</Table.Cell>
                    <Table.Cell>Aug: ${this.state.tripRate.Aug}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Sep: ${this.state.tripRate.Sep}</Table.Cell>
                    <Table.Cell>Oct: ${this.state.tripRate.Oct}</Table.Cell>
                    <Table.Cell>Nov: ${this.state.tripRate.Nov}</Table.Cell>
                    <Table.Cell>Dec: ${this.state.tripRate.Dec}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}