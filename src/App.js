import React, { useState } from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

import AnalysisContext from './AnalysisContext';

import "./assets/scss/style.scss"

// All Routes
import Routes from "./Routes"

const history = createBrowserHistory()

const App = () => {
  const [analysis, setAnalysis] = useState({name: 'Untitled', is_unsaved: true});
  const value = { analysis, setAnalysis };

  return (
    <AnalysisContext.Provider value={value}>
      <Router history={history}>
        <Routes />
      </Router>
    </AnalysisContext.Provider>
  )
}

export default App
