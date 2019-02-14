import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button } from 'semantic-ui-react'
import meal from "./meal-placeholder.png"

export default class TripMeals extends Component {

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

  patchTrip = () => {
    // let currentUser = Number(sessionStorage.getItem("userId"))

    const meals = {
      mealCost: Number(this.state.mealCost)
    }

    const id = this.props.match.params.tripId

    console.log(meals);

    this.props.updateTrip(id, meals)
    this.props.history.push('/trips')
  }

  render() {
    return (
      <div className='meals-form'>
        {/*
    Heads up! The styles below are necessary for the correct render of this example.
    You can do same with CSS, the main idea is that all the elements up to the `Grid`
    below must have a height of 100%.
  */}
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