import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Dialog } from "opsramp-design-system"
import CopyIcon from "assets/icons/icon-copy.svg"
import EditIcon from "assets/icons/icon-edit.svg"
import RemoveIcon from "assets/icons/icon-remove.svg"
import CloseIcon from "assets/icons/close.svg"
import RenameModal from "./RenameModal"
import { API_URL } from "config"
import { localFullDate, localDate, paginationOptions } from "utils"

const SavedViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState(false)
  const [analysesData, setAnalysesData] = useState([])
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [totalSize, setTotalSize] = useState(null)

  const fetchData = (pageNo, sort = null, sizePerPage) =>
    fetch(
      `${API_URL}/analyses/?page=${pageNo}${
        sort ? `&ordering=${sort}` : ""
      }&page_size=${sizePerPage || 20}`
    )
      .then((res) => res.json())
      .then(
        (response) => {
          setTotalSize(response.count)
          setAnalysesData(response.results)
        },
        (error) => {
          console.log(error)
        }
      )

  useEffect(() => {
    if (showDialog) {
      fetchData(1)
    }
  }, [showDialog])

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    let sort = null

    if (sortField && sortOrder)
      sort = sortOrder === "asc" ? sortField : `-${sortField}`

    fetchData(page, sort, sizePerPage)
    setPage(page)
    setSizePerPage(sizePerPage)
  }

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
          remote
          wrapperClasses="responsive-table"
          keyField="id"
          data={analysesData}
          pagination={paginationFactory({
            ...paginationOptions,
            page,
            totalSize,
            sizePerPage,
          })}
          columns={columns}
          bordered={false}
          onTableChange={handleTableChange}
          bootstrap4
        />
      </div>
    </Dialog>
  )
}

export default SavedViewsModal
