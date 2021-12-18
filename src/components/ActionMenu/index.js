import React from "react"

import {
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CDropdown,
} from "@coreui/react"
  
const ActionMenu = ({
  openAnalysesListDialog,
  exportReport,
  setIsOpenSendAnalysisModal,
  setIsSchedule,
  onSaveAnalysis,
  onNewAnalysis,
  analysis,
  runId
}) => {
  return <CDropdown>
    <CDropdownToggle className="action-btn p-0" caret={false}>•••</CDropdownToggle>
    <CDropdownMenu placement="bottom-start">
      <CDropdownItem onClick={() => onNewAnalysis()}>New</CDropdownItem>
      <CDropdownItem onClick={() => openAnalysesListDialog(true)}>Open</CDropdownItem>
      <CDropdownItem><hr /></CDropdownItem>
      <CDropdownItem onClick={() => onSaveAnalysis(false)}>Save</CDropdownItem>
      <CDropdownItem disabled={!analysis.id} onClick={() => onSaveAnalysis(true)}>Save As</CDropdownItem>
      <CDropdownItem><hr /></CDropdownItem>
      <CDropdownItem disabled={!runId} onClick={() => exportReport()}>Export</CDropdownItem>
      <CDropdownItem disabled={!analysis.id || analysis.is_unsaved} onClick={() => {setIsOpenSendAnalysisModal(true); setIsSchedule(false);}}>
        Send Now
      </CDropdownItem>
      <CDropdownItem disabled={!analysis.id || analysis.is_unsaved} onClick={() => {setIsOpenSendAnalysisModal(true); setIsSchedule(true);}}>
        Send On A Schedule
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
}

export default ActionMenu;
