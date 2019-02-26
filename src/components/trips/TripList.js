import React, { Component } from 'react'
import { Card, Button, Icon, Grid } from 'semantic-ui-react'
// import DataManager from '../../modules/DataManager';

export default class TripList extends Component {



  render() {
    return (
      <React.Fragment>
        <div className='trip-list'>

          {/* The form below collects the user's meal cost and room tax input, sets it to state, and calls the patchTrip function when the "Add M&IE" button is clicked. The "Cancel" button moves the user back to the trip dashboard without making any changes. Style is from Semantic UI login example */}

          <style>{`
body > div,
body > div > div,
body > div > div > div.login-form {
height: 100%;
}
`}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 750 }}>
              <br></br>
              <section className='trips'>
                {this.props.trips.map(trip =>
                  <Card
                    key={trip.id}
                    fluid color='brown'>
                    <Card.Content>
                      <Card.Header>Trip dates</Card.Header>
                      <Card.Meta><strong>{`${trip.tripStart} to ${trip.tripEnd}`}</strong></Card.Meta>
                      <p>Destination ZIP Code: {trip.zipCode} <br></br>
                        Miles round-trip: {trip.tripMiles}<br></br>
                        Airfare: {trip.airfare}<br></br>
                        Rental car cost: {trip.rentalCar}<br></br>
                        Meals &amp; incidental expenses: {trip.mealCost} <br></br>
                        Lodging cost: {trip.roomCost} <br></br>
                        Lodging tax: {trip.roomTax} <br></br>
                        Other costs: {trip.otherCost}</p>
                      <Button.Group widths='3' color='grey'>
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
                        <Button animated='vertical'
                          onClick={() => {
                            console.log("rental car button clicked!")
                            this.props.history.push(`/trips/rental_car/${trip.id}`)
                          }}>
                          <Button.Content visible>
                            <Icon name='car' />
                          </Button.Content>
                          <Button.Content hidden>Add rental car
                    </Button.Content>
                        </Button>
                        <Button animated='vertical'
                          onClick={() => {
                            console.log("other travel costs button clicked!")
                            this.props.history.push(`/trips/other_costs/${trip.id}`)
                          }}>
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
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}