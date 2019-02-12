import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Card } from 'semantic-ui-react'

export default class TripList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className='trips'>
          {this.props.trips.map(trip =>
            <Card key = {trip.id}
            fluid color ='green'
              href='#'
              header='Trip dates'
              description={`${trip.datesRange}`}
            >

            </Card>
          )
          }
        </section>
      </React.Fragment>
    )
  }
}