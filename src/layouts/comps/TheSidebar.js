import React from 'react'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import DateRangePicker from 'components/DateRangePicker'

const TheSidebar = () => {
  return (
    <CSidebar
      show={true}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
      </CSidebarBrand>
      <div className="h-100 bg-white p-8 sidebar-nav">
        <h6 className="mb-6 pb-5">SETTINGS</h6>
        <DateRangePicker title="Reporting Period"/>
      </div>
      {/* <CSidebarMinimizer className="c-d-md-down-none"/> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)