import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Dialog } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"
import { API_URL } from "config"
import { localFullDate, paginationOptions } from "utils"

const RunsViewsModal = ({ showDialog, closeDialog, appID }) => {
  const [runsData, setRunsData] = useState([])
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [totalSize, setTotalSize] = useState(null)

  const fetchData = (pageNo, sort = null, sizePerPage) =>
    fetch(
      `${API_URL}/analysis-runs/?page=${pageNo}${
        sort ? `&ordering=${sort}` : ""
      }&page_size=${sizePerPage || 20}`
    )
      .then((res) => res.json())
      .then(
        (response) => {
          setTotalSize(response.count)
          setRunsData(response.results)
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
      sort: true,
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

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    let sort = null

    if (sortField && sortOrder)
      sort = sortOrder === "asc" ? sortField : `-${sortField}`

    fetchData(page, sort, sizePerPage)
    setPage(page)
    setSizePerPage(sizePerPage)
  }

  return (
    <Dialog
      aria-label="Runs Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ width: "100%", maxWidth: "100%", minHeight: "100vh", margin: 0 }}
      className="dialog"
    >
      <div className="h-100">
        <div className="dialog-header justify-content-between">
          <h5 className="font-semibold">Runs</h5>
          <img src={CloseIcon} className="mr-2" onClick={() => closeDialog()} />
        </div>
        {runsData.length > 0 && (
          <BootstrapTable
            wrapperClasses="responsive-table"
            remote
            keyField="id"
            data={runsData}
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
        )}
      </div>
    </Dialog>
  )
}

export default RunsViewsModal
