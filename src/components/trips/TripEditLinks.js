import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class TripEditLinks extends Component {

  render() {
    return (
      <React.Fragment>
      <div>
        <Button icon labelPosition='left'>
          <Icon name='pause' />
          Pause
    </Button>
        <Button icon labelPosition='right'>
          Next
      <Icon name='right arrow' />
        </Button>
      </div>
      </React.Fragment>
    )
  }
}