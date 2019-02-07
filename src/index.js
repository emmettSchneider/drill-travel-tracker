import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Dtt from './components/Dtt'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Router>
      <Dtt />
  </Router>
  , document.getElementById('root'))
