import React from "react"

import MainLayout from "./MainLayout"

const AppLayout = () => {
  return (
    <div
      className="c-default-layout h-100"
      style={{ width: 320, marginTop: 30, marginLeft: 20 }}
    >
      <div className="c-wrapper h-100">
        <div className="row h-100" style={{ minHeight: "100vh" }}>
          <div className="col-12">
            <MainLayout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
