import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react'

const test = "test"

export default class TripList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className='trips'>
          {this.props.trips.map(trip =>
            <Card
              href='#'
              header={`${trip.tripStart}–${trip.tripEnd}`}
            >

            </Card>
          )
          }
        </section>
      </React.Fragment>
    )
  }
}