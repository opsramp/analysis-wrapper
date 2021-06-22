/* eslint-disable react/no-array-index-key */
import React, { Suspense, Fragment } from "react"
import { Switch, Route } from "react-router-dom"

// Layouts
import AppLayout from "layouts/AppLayout"

const routesConfig = [
  {
    path: "/",
    layout: AppLayout,
  },
]

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<></>}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment
          const Layout = route.layout || Fragment

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout></Layout>
                </Guard>
              )}
            />
          )
        })}
      </Switch>
    </Suspense>
  ) : null

function Routes() {
  return renderRoutes(routesConfig)
}

export default Routes
