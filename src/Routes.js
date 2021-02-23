/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from "react"
import { Switch, Redirect, Route } from "react-router-dom"

// Layouts
import AppLayout from "layouts/AppLayout"

const routesConfig = [
  {
    exact: true,
    path: "/",
    layout: AppLayout,
    component: lazy(() => import("views/dashboard")),
  },
  {
    component: () => <Redirect to="/404" />
  }
]

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<></>}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment
          const Layout = route.layout || Fragment
          const Component = route.component

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
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
