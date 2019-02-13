import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

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

    console.log(airfare);

    this.props.updateAirfare(airfare).then(() => this.props.history.push('/trips'));
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <Form>
          <Form.Field>
            <label>Airfare</label>
            <input placeholder='Airfare (total)'
              id='airfare'
              onChange={this.handleFieldChange}
              type='number'
              icon='plane'
              iconPosition='left'
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
            onClick={() => this.patchAirfare()}
          >Add airfare</Button>
        </Form>

      </React.Fragment >
    )
  }
}