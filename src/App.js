import React, { useState } from "react"
import { createBrowserHistory } from "history"
import { Router } from "react-router-dom"

import AnalysisContext from './AnalysisContext';
import Routes from "./Routes"

import "./assets/scss/style.scss"

const history = createBrowserHistory()

const App = () => {
  const [analysis, setAnalysis] = useState({name: 'Untitled', is_unsaved: true, params: {period: 'Last 24 Hours'}});
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
