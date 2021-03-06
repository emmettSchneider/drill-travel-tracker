// This module takes the data from all the user's trips for a year and returns the amounts the user should enter on IRS Form 2106. This trip summary is the ultimate purpose of the app. The user (likely a member of the National Guard or Reserves) will be able to reduce their Adjusted Gross Income (AGI) by the amount shown in line 10. This is referred to as an "above-the-line deduction" and can be taken whether the user itemizes deductions or takes the standard deduction.

import React, { Component } from 'react'
import { Header, Label, Table } from 'semantic-ui-react'


export default class TripForm extends Component {



  render() {

    // The trip props are passed to this module, and the reduce function is used to sum the values of the pertinent trip key/value pairs.

    // Sum of miles to destination and local miles (often referred to as in-and-around mileage)
    let SumMiles = this.props.trips.reduce((prev, cur) => prev + cur.tripMiles, 0)
    let SumLocalMiles = this.props.trips.reduce((prev, cur) => prev + cur.localMiles, 0)

    // Multiplies the total miles traveled for duty by the federal mileage rate of $0.545 per mile
    let SumTotalMiles = (SumMiles + SumLocalMiles)
    let SumStdMileRate = (SumTotalMiles * 0.545)

    // Multiplies the total meal cost for the year by 0.50 because half of the meal cost is the amount allowed for this deduction
    let SumMealCost = this.props.trips.reduce((prev, cur) => prev + cur.mealCost, 0)
    let HalfSumMealCost = (SumMealCost * 0.50)


    // Takes the totals for roomCost, roomTax, airfare, rentalCar, and otherCost and sums them because they are categorically combined on Form 2106. Their separation in the application simply makes it easier for the user to enter these costs as they're incurred and trace the amounts to their receipts.
    let SumRoomCost = this.props.trips.reduce((prev, cur) => prev + cur.roomCost, 0)
    let SumRoomTax = this.props.trips.reduce((prev, cur) => prev + cur.roomTax, 0)
    let SumAirfare = this.props.trips.reduce((prev, cur) => prev + cur.airfare, 0)
    let SumRentalCar = this.props.trips.reduce((prev, cur) => prev + cur.rentalCar, 0)
    let SumOtherCost = this.props.trips.reduce((prev, cur) => prev + cur.otherCost, 0)
    let SumTravelExpenseNotMilesOrMeals = (SumRoomCost + SumRoomTax + SumAirfare + SumRentalCar + SumOtherCost)

    // Combines the sum of the federal-rate mileage expense with the cost of non-meal travel expenses, such as lodging and airfare.
    let SumMilesAndTravelExpenses = (SumStdMileRate + SumTravelExpenseNotMilesOrMeals)

    // Combines all expenses to arrive at the grand total for line 10. This is the amount the user can deduct from their AGI.

    let GrandTotal = (SumMilesAndTravelExpenses + HalfSumMealCost)

    //Console logs are to assist with app development.
    console.log(this.props.trips)
    console.log('Total Miles:', SumMiles)
    console.log('Total Local miles:', SumLocalMiles)
    console.log('Total Room cost:', SumRoomCost)
    console.log('Total Room tax:', SumRoomTax)
    console.log('Total Meal cost:', SumMealCost)
    console.log('Total Airfare:', SumAirfare)
    console.log('Total Rental car:', SumRentalCar)
    console.log('Total Other cost:', SumOtherCost)

    return (

      // The table below is intended to appear to the user as a near-replica of IRS Form 2106. The user will see the relevant amounts from their logged trip data for the year on the pertinent lines of the Form 2106 replica.

      <React.Fragment>
        <Header as='h3'>
          Trip Expense Summary for 2019
        <Header.Subheader>Below are the amounts to enter on IRS Form 2106 using the data you entered for unpaid service-related trip expenses for 2019. </Header.Subheader>
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Step 1 Enter Your Expenses</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Line</Table.HeaderCell>
              <Table.HeaderCell>Column A <br></br> Other Than Meals</Table.HeaderCell>
              <Table.HeaderCell>Column B <br></br> Meals</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>1</Label>
                Vehicle expense from line 22 or line 29
            </Table.Cell>
              <Table.Cell textAlign='center'>1</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumStdMileRate)}</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>2</Label>
                Parking fees, tolls, and transportation, including train, bus, etc., that didn't involve overnight travel or commuting to and from work
            </Table.Cell>
              <Table.Cell textAlign='center'>2</Table.Cell>
              <Table.Cell textAlign='right'>0</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>3</Label>
                Travel expense while away from home overnight, including lodging, airplane, car rental, etc. Don't include meals
            </Table.Cell>
              <Table.Cell textAlign='center'>3</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumTravelExpenseNotMilesOrMeals)}</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>4</Label>
                Business expenses not included on lines 1 through 3. Don't include meals
            </Table.Cell>
              <Table.Cell textAlign='center'>4</Table.Cell>
              <Table.Cell textAlign='right'>0</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>5</Label>
                Meals expenses &#40;see instructions&#41;
            </Table.Cell>
              <Table.Cell textAlign='center'>5</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMealCost)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>6</Label>
                Total expenses. In Column A, add lines 1 through 4 and enter the result. In Column B, enter the amount from line 5
            </Table.Cell>
              <Table.Cell textAlign='center'>6</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMilesAndTravelExpenses)}</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMealCost)}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Step 2 Enter Reimbursements Received From Your Employer for Expenses Listed in Step 1</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon >7</Label>
                Enter reimbursements received from your employer that weren't reported to you in box 1 of Form W-2. Include any reimbursements reported under code “L” in box 12 of your Form W-2
            </Table.Cell>
              <Table.Cell textAlign='center'>7</Table.Cell>
              <Table.Cell textAlign='right'>0</Table.Cell>
              <Table.Cell textAlign='right'>0</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Step 3 Figure Expenses To Deduct</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>8</Label>
                Subtract line 7 from line 6. If zero or less, enter -0-. However, if line 7 is greater than line 6 in Column A, report the excess as income on Form 1040, line 1
              <br></br>
                Note: If both columns of line 8 are zero, you can't deduct employee business expenses. Stop here and attach Form 2106 to your return.
            </Table.Cell>
              <Table.Cell textAlign='center'>8</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMilesAndTravelExpenses)}</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMealCost)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>9</Label>
                In Column A, enter the amount from line 8. In Column B, multiply line 8 by 50% &#40;0.50&#41;
            </Table.Cell>
              <Table.Cell textAlign='center'>9</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumMilesAndTravelExpenses)}</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(HalfSumMealCost)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>10</Label>
                Add the amounts on line 9 of both columns and enter the total here. Also, enter the total on Schedule 1 &#40;Form 1040&#41;, line 24 &#40;or Form 1040NR, line 34&#41;.
              <br></br>
                Employees with impairment-related work expenses, see the instructions for rules on where to enter the total on your return
            </Table.Cell>
              <Table.Cell textAlign='center'>10</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(GrandTotal)}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Part II Vehicle Expenses</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Section A—General Information &#40;You must complete this section if you are claiming vehicle expenses.&#41; </Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>12</Label>Total miles the vehicle was driven during 2018
            </Table.Cell>
              <Table.Cell textAlign='center'>12</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>13</Label>Business miles included on line 12
            </Table.Cell>
              <Table.Cell textAlign='center'>13</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumTotalMiles)}</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Section B—Standard Mileage Rates</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Label ribbon>22</Label>Multiply line 13 by 54.5¢ &#40;0.545&#41;. Enter the result here and on line 1
            </Table.Cell>
              <Table.Cell textAlign='center'>22</Table.Cell>
              <Table.Cell textAlign='right'>{Math.round(SumStdMileRate)}</Table.Cell>
              <Table.Cell bgcolor='grey'></Table.Cell>
            </Table.Row>
          </Table.Body>


          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4' textAlign='right'>
                Form 2016 &#40;2019&#41;
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    )
  }
}
