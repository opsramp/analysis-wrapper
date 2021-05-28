import React, { useState, useEffect } from "react"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import { Dialog } from "opsramp-design-system"
import CopyIcon from "assets/icons/icon-copy.svg"
import EditIcon from "assets/icons/icon-edit.svg"
import RemoveIcon from "assets/icons/icon-remove.svg"

import CloseIcon from "assets/icons/close.svg"
import RenameModal from "./RenameModal"

import { API_URL } from "config"

const SavedViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(false)

  const [analysesData, setAnalysesData] = useState([])

  const nameFormater = (cell, row) => {
    return <div className="text-primary">{cell}</div>
  }

  const actionFormater = (cell, row) => {
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
  }

  useEffect(() => {
    if (showDialog) {
      fetch(`${API_URL}/analyses`)
        .then((res) => res.json())
        .then(
          (result) => {
            setAnalysesData(result)
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
          data={analysesData}
          bordered={false}
          className="h-100"
          version="4"
        >
          <TableHeaderColumn isKey dataField="name" dataFormat={nameFormater}>
            Analysis Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="created">Analysis Period</TableHeaderColumn>
          <TableHeaderColumn dataField="created" dataSort>
            Creation Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="action"
            dataFormat={actionFormater}
          ></TableHeaderColumn>
        </BootstrapTable>
      </div>
    </Dialog>
  )
}

export default SavedViewsModal
