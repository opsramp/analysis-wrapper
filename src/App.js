import React from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

import "./assets/scss/style.scss"

// All Routes
import Routes from "./Routes"

const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )
}

export default App
