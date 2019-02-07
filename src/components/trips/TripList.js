import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react'

export default class TripList extends Component {
  render() {
    return (
      <React.Fragment>
      <Card
        href='#'
        header='This is the header'
        description='This is a placeholder description'

      />
      <Card
        href='#'
        header='This is the header'
        description='This is a placeholder description'
      />
      </React.Fragment>
    )
  }
}