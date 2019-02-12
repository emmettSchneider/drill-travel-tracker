import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react'
import DataManager from '../../modules/DataManager'
import { Link } from 'react-router-dom'

export default class TripList extends Component {

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <section className='trips'>
          {this.props.trips.map(trip =>
            <Card
              key={trip.id}
              fluid color='green'
              header='Trip dates'
            >
              <Card.Content>
                <Card.Header>Trip dates</Card.Header>
                <Card.Meta>{`${trip.datesRange}`}</Card.Meta>
                <Button animated
                size='medium'>
                  <Button.Content visible>
                    <Icon name='bed' />
                  </Button.Content>
                  <Button.Content hidden>
                    Add lodging
                  </Button.Content>
                </Button>
                <Button animated='vertical'>
                  <Button.Content hidden></Button.Content>
                  <Button.Content visible>
                    <Icon name='shop' />
                  </Button.Content>
                </Button>
                <Button animated='fade'>
                  <Button.Content visible>Sign-up for a Pro account</Button.Content>
                  <Button.Content hidden>$12.99 a month</Button.Content>
                </Button>
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