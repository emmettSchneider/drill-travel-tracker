// This module allows the user to add the cost of meals & incidental expenses (M&IE) to a trip. The module also uses the previously entered trip ZIP Code to query the GSA's per diem API and return the per diem meal rate limit for the user's trip destination ZIP Code.

import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button } from 'semantic-ui-react'
import meal from "./meal-placeholder.png"

export default class TripMeals extends Component {

  // mealCost is the only states required in this module

  state = {
    mealCost: '',
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

  render() {

    // Providing the user with a visual per diem reference is still in progress. The API fetch works, now I need to display the relevant data in the cells of the table.

    return (
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
            <Header as='h2' color='teal' textAlign='left'>
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
                  color='teal'
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

          </Grid.Column>
        </Grid>
      </div>
    )
  }
}