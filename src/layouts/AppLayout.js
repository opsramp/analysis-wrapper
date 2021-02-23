import React from "react"
import PropTypes from "prop-types"
import { CContainer, CFade } from "@coreui/react"

import { TheFooter, TheHeader, TheSidebar } from "./comps"

const AppLayout = ({ children }) => {
  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeader fixed={true} bgColor="white" />
        <TheSidebar/>
        <div className="c-body">
          <main className="c-main pt-0">
            <CContainer fluid className="p-0">
              <CFade>{children}</CFade>
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
