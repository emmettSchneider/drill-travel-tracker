import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'


export default class TripForm extends Component {

  // I want to access specific values in each



  render() {

    let SumAirfare = this.props.trips.reduce((prev, cur) => prev + cur.airfare, 0)
    let SumMiles = this.props.trips.reduce((prev, cur) => prev + cur.tripMiles, 0)

    console.log(this.props.trips)
    console.log('Total Airfare:', SumAirfare)
    console.log('Total Miles:', SumMiles)

    return (

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Step 1 Enter Your Expenses</Table.HeaderCell>
            <Table.HeaderCell>Line</Table.HeaderCell>
            <Table.HeaderCell>Column A</Table.HeaderCell>
            <Table.HeaderCell>Column B</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>1</Label>
              Vehicle expense from line 22 or line 29
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>2</Label>
              Parking fees, tolls, and transportation, including train, bus, etc., that didn't involve overnight travel or commuting to and from work
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>3</Label>
              Travel expense while away from home overnight, including lodging, airplane, car rental, etc. Don't include meals
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>4</Label>
              Business expenses not included on lines 1 through 3. Don't include meals
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>5</Label>
              Meals expenses &#40;see instructions&#41;
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Label ribbon>6</Label>
              Total expenses. In Column A, add lines 1 through 4 and enter the result. In Column B, enter the amount from line 5
            </Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}
