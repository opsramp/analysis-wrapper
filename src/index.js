import "react-app-polyfill/ie11" // For IE 11 support
import "react-app-polyfill/stable"
import "./polyfill"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import "opsramp-design-system/lib/opsramp-design-system.css"
import "opsramp-design-system/lib/tailwind.css"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

ReactDOM.render(
  <App />,
  document.getElementById("AnalyticsAppsUI-sidebar-container")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
