/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import jeep from "../login/jeep-placeholder.png"
import DataManager from "../../modules/DataManager"

class Registration extends Component {

  state = {
    email: '',
    password: '',
    component: '',
    userRank: '',
    defaultZipCode: '',
    defaultMiles: ''
  }

  handleFieldChange = (e) => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }

  addNewUser = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      userService: this.state.userService,
      userRank: this.state.userRank,
      defaultZipCode: this.state.defaultZipCode,
      defaultMiles: this.state.defaultMiles
    }

    console.log(user);

    this.props.addUser(user).then(() => this.props.history.push('/login'));


  }



  // this.props.DataManager.postUser(user).then(p => {
  //   console.log(p)
  //   this.props.history.push("/login")
  //   window.location.reload();
  // })


  render() {

    return (
      <div className='login-form'>
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
            <Header as='h2' color='teal' textAlign='center'>
              <Image src={jeep} /> Register a new account
        </Header>
            <Form size='large'
              onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input
                  id='email'
                  onChange={this.handleFieldChange}
                  type='email'
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  required autoFocus="" />

                <Form.Input
                  id='password'
                  onChange={this.handleFieldChange}
                  type='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  required
                />

                <Form.Input
                  id='userService'
                  onChange={this.handleFieldChange}
                  type='text'
                  fluid
                  icon='flag'
                  iconPosition='left'
                  placeholder='Service component'
                  required
                />

                <Form.Input
                  id='userRank'
                  onChange={this.handleFieldChange}
                  type='text'
                  fluid
                  icon='double angle up'
                  iconPosition='left'
                  placeholder='Rank'
                  required
                />

                <Button type="submit"
                  onClick={() => this.addNewUser()}
                  // Redirect to="/login"
                  color='teal'
                  fluid size='large'>
                  Register account
            </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Registration