import React, { Component } from 'react'
import { Grid, Form, Header, Segment, Image, Button } from 'semantic-ui-react'
import bed from "./bed-placeholder.png"
import DataManager from "../../modules/DataManager"

export default class TripLodging extends Component {

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

  patchTrip = () => {
    // let currentUser = Number(sessionStorage.getItem("userId"))

    const lodging = {
      roomCost: Number(this.state.roomCost),
      roomTax: Number(this.state.roomTax)
    }

    const id = this.props.match.params.tripId

    console.log(lodging);

    this.props.updateTrip(id, lodging)
    this.props.history.push('/trips')
  }

  render() {
    console.log(this.props)


    DataManager.getOneTrip(this.props.match.params.tripId)
    .then(r => DataManager.getRates(r.tripYear, r.zipCode))
    // .then(DataManager.getRates(this.tripYear, this.zipCode))

    return (
      <React.Fragment>
      <div className='lodging-form'>
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