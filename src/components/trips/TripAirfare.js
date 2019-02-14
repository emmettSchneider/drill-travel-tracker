import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button, Icon } from 'semantic-ui-react'
import airplane from "./airplane-placeholder.png"

export default class TripAirfare extends Component {

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

  patchAirfare = () => {
    // let currentUser = Number(sessionStorage.getItem("userId"))

    const airfare = {
      airfare: Number(this.state.airfare)
    }

    const id = this.props.match.params.tripId

    console.log(airfare);

    this.props.updateAirfare(id, airfare)
    this.props.history.push('/trips')
  }

  render() {
    return (
      <div className='airfare-form'>
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
                  color='teal'
                  fluid size='large'
                  onClick={() => this.patchAirfare()}
                >Add airfare</Button>
              </Segment>
            </Form>

          </Grid.Column>
        </Grid>
      </div>
    )
  }
}