import React from "react"
import { CFooter, CLink, CRow, CCol } from "@coreui/react"

import "../../App.scss"

const TheFooter = () => {
  return (
    <CFooter fixed={false} className="static-footer py-5 px-5">

    </CFooter>
  )
}

export default React.memo(TheFooter)
