import React, { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Dialog } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"
import { dateTimeFormatter, dateFormatter, triggerRunLoading, paginationOptions, getBasePath } from "utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emptyDataMessage = () => { return 'No Data to Display';}

const AnalysisRunsList = ({ showDialog, closeDialog, analysis, setRunId }) => {
  const [runsData, setRunsData] = useState([])
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [sort, setSort] = useState(null)
  const [totalSize, setTotalSize] = useState(null)

  const BASE_PATH = getBasePath();

  const fetchData = () => {
    let url = `${BASE_PATH}/analysis-runs/?analysis_id=${analysis.id}&page=${page}&page_size=${sizePerPage}`;
    if (sort) {
      url = url + `&ordering=${sort}`
    }

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        setTotalSize(data.count)
        setRunsData(data.results)
      })
      .catch(error => {
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  const loadRun = (run) => {
    setRunId(run.id);
    triggerRunLoading(run.id);
    closeDialog();
  }

  useEffect(() => {
    if (showDialog && analysis.id) {
      fetchData();
    } else {
      setRunsData([]);
      setTotalSize(0);
    }
  }, [showDialog])

  const columns = [
    {
      dataField: "date_completed",
      text: "Date Run",
      sort: true,
      formatter: (cell, row) => (
        <div className="btn btn-link" style={{fontSize: 14}} onClick={()=>loadRun(row)}>{dateTimeFormatter(cell)}</div>
      ),
    },
    {
      dataField: "date_launched",
      text: "Date Submitted",
      sort: true,
      formatter: (cell) => dateTimeFormatter(cell),
    },
    {
      dataField: "period",
      text: "Analysis Period",
      formatter: (cell, row) => (
        <div>{dateFormatter(row.params.start_date)} - {dateFormatter(row.params.end_date)}</div>
      )
    },
    {
      dataField: "scheduled",
      text: "Scheduled",
      formatter: () => ('N/A')
    },
    {
      dataField: "analysis_name",
      text: "Analysis Name",
      formatter: (cell, row) => (
        <div>{cell} {!row.is_saved && '(unsaved)'}</div>
      ),
    },
    {
      dataField: "processing",
      text: "Processing",
      formatter: () => ('Complete')
    },
  ]

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    let sort = null

    if (sortField && sortOrder) {
      sort = sortOrder === "asc" ? sortField : `-${sortField}`
    }

    setPage(page);
    setSort(sort);
    setSizePerPage(sizePerPage);
    fetchData();
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
        <BootstrapTable
          wrapperClasses="responsive-table"
          noDataIndication={emptyDataMessage}
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
      </div>
      <ToastContainer />
    </Dialog>
  )
}

export default AnalysisRunsList
