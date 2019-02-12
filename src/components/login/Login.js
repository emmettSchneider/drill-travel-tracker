/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import jeep from "./jeep-placeholder.png"
import DataManager from "../../modules/DataManager"

class Login extends Component {

  state = {
    email: '',
    password: '',
  }

  handleFieldChange = (e) => {
    const stateToChange = {}
    stateToChange[e.target.id] = e.target.value
    this.setState(stateToChange)
  }



  handleLogin = () => {
    console.log(this.state.email)
    console.log(this.state.password)
    DataManager.getAllUsers()
      .then(allUsers => {
        let usersProcessed = 1
        allUsers.forEach(user => {
          if (this.state.email === user.email && this.state.password === user.password) {
            console.log(`${user.email} with user ID ${user.id} is the current user`)
            sessionStorage.setItem('userId', user.id)
            this.props.history.push('/')
          } else if (usersProcessed === allUsers.length) {
            alert("The email and password you entered does not match the information we have on file. If you're a new user, please register an account.")
          } else {
            usersProcessed++
          }
        })
      })
    }


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
              <Image src={jeep} /> Log in to your account
        </Header>
            <Form size='large'
              onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input
                  id="email"
                  onChange={this.handleFieldChange}
                  type='email'
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  required autoFocus="" />
                <Form.Input
                  id="password"
                  onChange={this.handleFieldChange}
                  type='password'
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  required
                />

                <Button type="submit"
                  color='teal'
                  fluid size='large'>
                  Log in
            </Button>
              </Segment>
            </Form>
            <Message>
              First time? <a href='http://localhost:3000/register'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login