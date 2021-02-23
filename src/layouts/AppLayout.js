import React from "react"
import PropTypes from "prop-types"
import { CContainer, CFade } from "@coreui/react"

import { TheFooter, TheHeader, TheSidebar, ThePanel } from "./comps"

const AppLayout = ({ children }) => {
  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeader fixed={true} bgColor="white" />
        {/* <TheSidebar/> */}
        <div className="c-body">
          <main className="c-main">
            <CContainer fluid className="mt-4 h-100">
              <div className="row h-100">
                <div className="col-3 h-100">
                  <ThePanel/>                  
                </div>
                <div className="col-9 h-100">
                  <CFade>{children}</CFade>
                </div>
              </div>
            </CContainer>
          </main>
        </div>
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.any,
}

export default AppLayout
