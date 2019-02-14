import React, { Component } from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
// import DataManager from '../../modules/DataManager';

export default class TripList extends Component {

  render() {
    return (
      <React.Fragment>
        <section className='trips'>
          {this.props.trips.map(trip =>
            <Card
              key={trip.id}
              fluid color='green'>
              <Card.Content>
                <Card.Header>Trip dates</Card.Header>
                <Card.Meta>{`${trip.datesRange}`}</Card.Meta>
                <p>Destination ZIP Code: {trip.zipCode} <br></br>
                  Miles round-trip: {trip.tripMiles}<br></br>
                  Meals &amp; incidental expenses: {trip.mealCost} <br></br>
                  Lodging cost: {trip.roomCost} <br></br>
                  Lodging tax: {trip.roomTax}</p>
                <Button.Group widths='3'>
                  <Button animated='vertical'
                    onClick={() => {
                      console.log("lodging button clicked!")
                      this.props.history.push(`/trips/lodging/${trip.id}`)
                    }} >
                    <Button.Content visible>
                      <Icon name='bed' />
                    </Button.Content>
                    <Button.Content hidden>
                      Add lodging
                  </Button.Content>
                  </Button>
                  <Button animated='vertical'
                    onClick={() => {
                      console.log("meals button clicked!")
                      this.props.history.push(`/trips/meals/${trip.id}`)
                    }} >
                    <Button.Content visible>
                      <Icon name='utensils' />
                    </Button.Content>
                    <Button.Content hidden>Add meals
                    </Button.Content>
                  </Button>
                  <Button animated='vertical'
                    onClick={() => {
                      console.log("airfare button clicked!")
                      this.props.history.push(`/trips/airfare/${trip.id}`)
                    }} >
                    <Button.Content visible>
                      <Icon name='plane' />
                    </Button.Content>
                    <Button.Content hidden>Add airfare
                    </Button.Content>
                  </Button>
                </Button.Group>
                <Button.Group widths='3'>
                  <Button animated='vertical'>
                    <Button.Content visible>
                      <Icon name='car' />
                    </Button.Content>
                    <Button.Content hidden>Add rental car
                    </Button.Content>
                  </Button>
                  <Button animated='vertical'>
                    <Button.Content visible>
                      <Icon name='suitcase' />
                    </Button.Content>
                    <Button.Content hidden>Add other expenses
                    </Button.Content>
                  </Button>
                  <Button animated='vertical'
                    onClick={() => {
                      console.log("delete button clicked!")
                      console.log(this.props)
                      this.props.deleteTrip(trip.id)
                    }}>
                    <Button.Content visible>
                      <Icon name='trash' />
                    </Button.Content>
                    <Button.Content hidden>Delete trip
                    </Button.Content>
                  </Button>
                </Button.Group>
              </Card.Content>

              {/* <Link to={`/trips/edit/${trip.id}`}></Link> */}
              {/* <Button animated>
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
              <Button animated='vertical'>
                <Button.Content hidden>Shop</Button.Content>
                <Button.Content visible>
                  <Icon name='shop' />
                </Button.Content>
              </Button>
              <Button animated='fade'>
                <Button.Content visible>Sign-up for a Pro account</Button.Content>
                <Button.Content hidden>$12.99 a month</Button.Content>
              </Button> */}

            </Card>
          )
          }
        </section>
      </React.Fragment>
    )
  }
}