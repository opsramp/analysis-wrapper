import React, { useState, useEffect } from "react"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import { Dialog } from "opsramp-design-system"

import CloseIcon from "assets/icons/close.svg"

import { API_URL } from "config"

const RunsViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [runsData, setRunsData] = useState([])

  const nameFormater = (cell, row) => {
    return <div className="text-primary">{cell}</div>
  }

  useEffect(() => {
    if (showDialog) {
      fetch(`${API_URL}/analysis-runs/`)
        .then((res) => res.json())
        .then(
          (result) => {
            setRunsData(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error)
          }
        )
    }
  }, [showDialog])

  return (
    <Dialog
      aria-label="Runs Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ width: "100%", maxWidth: "100%", height: "100%", margin: 0 }}
      className="dialog"
    >
      <div className="h-100">
        <div className="dialog-header justify-content-between">
          <h5 className="font-semibold">Runs</h5>
          <img src={CloseIcon} className="mr-2" onClick={() => closeDialog()} />
        </div>
        <BootstrapTable
          data={runsData}
          bordered={false}
          className="h-100"
          version="4"
        >
          <TableHeaderColumn
            isKey
            dataField="date_completed"
            dataFormat={nameFormater}
            dataSort
          >
            Date Run
          </TableHeaderColumn>
          <TableHeaderColumn dataField="date_launched">
            Date Submitted
          </TableHeaderColumn>
          <TableHeaderColumn dataField="date_completed">
            Analysis Period
          </TableHeaderColumn>
          <TableHeaderColumn dataField="date_completed">Scheduled</TableHeaderColumn>
          <TableHeaderColumn dataField="date_completed">
            Analysis Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="date_completed">
            Processing
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    </Dialog>
  )
}

export default RunsViewsModal
