import React from "react"
import PropTypes from "prop-types"

import { ThePanel } from "./comps"

const AppLayout = ({ children }) => {
  return (
    <div className="c-default-layout h-100" style={{width: 320, marginTop: 30, marginLeft: 20}}>
      <div className="c-wrapper h-100">
        <div className="row h-100" style={{minHeight: '100vh'}}>
          <div className="col-12">
            <ThePanel/>
          </div>
        </div>
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.any,
}

export default AppLayout
