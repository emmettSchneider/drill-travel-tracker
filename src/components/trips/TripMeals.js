// This module allows the user to add the cost of meals & incidental expenses (M&IE) to a trip. The module also uses the previously entered trip ZIP Code to query the GSA's per diem API and return the per diem meal rate limit for the user's trip destination ZIP Code.

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button, Table } from 'semantic-ui-react'
import meal from "./meal-placeholder.png"
import DataManager from "../../modules/DataManager"

export default class TripMeals extends Component {

  // mealCost is the only states required in this module

  state = {
    mealCost: '',
    tripRate: {},
    dailyMealRates: {}
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

  perDiemMealRates = () => {
    DataManager.getOneTrip(this.props.match.params.tripId)
      .then(r => DataManager.getRates(r.tripYear, r.zipCode))
      .then(r => {
        let tripRate = r.result.records[0]
        let dailyRateId = tripRate.FiscalYear + tripRate.Meals
        this.setState({ tripRate: tripRate })
        console.log(dailyRateId)
        DataManager.getDailyMealRates(dailyRateId)
          .then(r => this.setState({ dailyMealRates: r }))
      })
  }

  // patchTrip uses the PATCH method to add mealCost to an existing trip

  patchTrip = () => {

    const meals = {
      mealCost: Number(this.state.mealCost)
    }

    const id = this.props.match.params.tripId

    console.log(meals);

    // updateTrip function from ApplicationViews.js patches the trip, fetches the user's trips, and moves the user back to the trip dashboard.

    this.props.updateTrip(id, meals)
    this.props.history.push('/trips')
  }

  componentDidMount() {
    this.perDiemMealRates()
  }

  render() {

    // Providing the user with a visual per diem reference is still in progress. The API fetch works, now I need to display the relevant data in the cells of the table.

    return (

      <React.Fragment>
        <div className='meals-form'>

          {/* The form below collects the user's meal cost and room tax input, sets it to state, and calls the patchTrip function when the "Add M&IE" button is clicked. The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

          <style>{`
    body > div,
    body > div > div,
    body > div > div > div.login-form {
      height: 100%;
    }
  `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <br></br>
            <br></br>

              <Header as='h2' color='brown' textAlign='left'>
                <Image src={meal} /> Add meals &amp; incidental expenses &#40;M&amp;IE&#41; to this trip
            </Header>
              <Form size='large' >
                <Segment stacked>
                  <Form.Input
                    placeholder='M&amp;IE (total)'
                    id='mealCost'
                    onChange={this.handleFieldChange}
                    type='number'
                    icon='utensils'
                    iconPosition='left'
                  />
                  <Button type='submit'
                    color='brown'
                    fluid size='large'
                    onClick={() => this.patchTrip()}
                  >Add M&amp;IE</Button><br></br>
                  <Button
                    color='grey'
                    fluid size='large'
                    onClick={() => this.props.history.push('/trips')}>
                    Cancel</Button>
                </Segment>
              </Form>

              <Table celled>
                {console.log(this.state.tripRate)}
                {console.log(this.state.dailyMealRates)}
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>Destination information</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                <Table.Row>
                    <Table.Cell>ZIP Code</Table.Cell>
                    <Table.Cell>{this.state.tripRate.Zip}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>City</Table.Cell>
                    <Table.Cell>{this.state.tripRate.City}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>State</Table.Cell>
                    <Table.Cell>{this.state.tripRate.State}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>M&amp;IE (daily)</Table.Cell>
                    <Table.Cell>${this.state.tripRate.Meals}</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>M&amp;IE breakdown</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Breakfast</Table.Cell>
                    <Table.Cell>${this.state.dailyMealRates.breakfast}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Lunch</Table.Cell>
                    <Table.Cell>${this.state.dailyMealRates.lunch}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Dinner</Table.Cell>
                    <Table.Cell>${this.state.dailyMealRates.dinner}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Incidental</Table.Cell>
                    <Table.Cell>${this.state.dailyMealRates.incidental}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Travel day (first & last day)</Table.Cell>
                    <Table.Cell>${this.state.dailyMealRates.travelDay}</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                    The daily M&IE total of ${this.state.tripRate.Meals} is the sum of breakfast, lunch, dinner, and the $5 daily incidental allowance.
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>

            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}