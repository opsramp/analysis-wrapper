import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import { Dialog } from "opsramp-design-system"
import CopyIcon from "assets/icons/icon-copy.svg"
import EditIcon from "assets/icons/icon-edit.svg"
import RemoveIcon from "assets/icons/icon-remove.svg"
import CloseIcon from "assets/icons/close.svg"
import RenameModal from "./RenameModal"
import { API_URL } from "config"
import { localFullDate, localDate } from "utils"

const SavedViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(false)
  const [analysesData, setAnalysesData] = useState([])

  useEffect(() => {
    if (showDialog) {
      fetch(`${API_URL}/analyses/`)
        .then((res) => res.json())
        .then(
          (response) => {
            setAnalysesData(response.results)
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }, [showDialog])

  const columns = [
    {
      dataField: "name",
      text: "Analysis Name",
      sort: true,
      formatter: (cell, row) => <div className="text-primary">{cell}</div>,
    },
    {
      dataField: "params",
      text: "Analysis Period",
      formatter: (cell, row) =>
        `${localDate(cell.start_date)} - ${localDate(cell.end_date)}`,
    },
    {
      dataField: "created",
      text: "Creation Date",
      formatter: (cell, row) => localFullDate(cell),
    },
    {
      dataField: "action",
      text: "",
      formatter: (cell, row) => {
        return (
          <div className="d-flex">
            <button className="action-btn">
              <img src={CopyIcon} />
            </button>
            <button
              className="action-btn"
              onClick={() => {
                setRenameModalVisible(true)
                setSelectedRow(row)
              }}
            >
              <img src={EditIcon} />
            </button>
            <button className="action-btn">
              <img src={RemoveIcon} />
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <Dialog
      aria-label="Share Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ width: "100%", maxWidth: "100%", height: "100%", margin: 0 }}
      className="dialog"
    >
      <div className="h-100">
        <RenameModal
          showDialog={renameModalVisible}
          closeDialog={() => setRenameModalVisible(false)}
          selectedRow={selectedRow}
        />
        <div className="dialog-header justify-content-between">
          <h5 className="font-semibold">Saved Analysis</h5>
          <img src={CloseIcon} className="mr-2" onClick={() => closeDialog()} />
        </div>
        <BootstrapTable
          keyField="id"
          data={analysesData}
          columns={columns}
          bordered={false}
          bootstrap4
        />
      </div>
    </Dialog>
  )
}

export default SavedViewsModal
