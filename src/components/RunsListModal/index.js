import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import { Dialog } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"
import { API_URL } from "config"
import { localFullDate, localDate } from "utils"

const RunsViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [runsData, setRunsData] = useState([])

  useEffect(() => {
    if (showDialog) {
      fetch(`${API_URL}/analysis-runs/`)
        .then((res) => res.json())
        .then(
          (response) => {
            setRunsData(response.results)
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }, [showDialog])

  const columns = [
    {
      dataField: "date_completed",
      text: "Date Run",
      sort: true,
      formatter: (cell, row) => (
        <div className="text-primary">{localFullDate(cell)}</div>
      ),
    },
    {
      dataField: "date_launched",
      text: "Date Submitted",
      formatter: (cell) => localFullDate(cell),
    },
    {
      dataField: "date_completed",
      text: "Analysis Period",
      formatter: (cell) => localFullDate(cell),
    },
    {
      dataField: "analysis_name",
      text: "Analysis Name",
    },
    {
      dataField: "date_completed",
      text: "Processing",
    },
  ]

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
          keyField="id"
          data={runsData}
          columns={columns}
          bordered={false}
          bootstrap4
        />
      </div>
    </Dialog>
  )
}

export default RunsViewsModal
