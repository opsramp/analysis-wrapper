import React, { useState, useEffect, useContext } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Dialog } from "opsramp-design-system"
import CopyIcon from "assets/icons/icon-copy.svg"
import EditIcon from "assets/icons/icon-edit.svg"
import RemoveIcon from "assets/icons/icon-remove.svg"
import CloseIcon from "assets/icons/close.svg"
import RenameAnalysisModal from "./RenameAnalysisModal"
import { dateTimeFormatter, paginationOptions, getApiUrl, getAppId } from "utils"
import AnalysisContext from '../../AnalysisContext';

const AnalysesList = ({ showDialog, closeDialog }) => {
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState(false)
  const [analysesData, setAnalysesData] = useState([])
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [sort, setSort] = useState(null)
  const [totalSize, setTotalSize] = useState(null)
  const { analysis, setAnalysis } = useContext(AnalysisContext);

  const API_URL = getApiUrl();
  const APP_ID = getAppId();

  const fetchData = () =>
    fetch(
      `${API_URL}/analyses/?app=${APP_ID}&page=${page}${
        sort ? `&ordering=${sort}` : ""
      }&page_size=${sizePerPage}`
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
      fetchData();
    }
  }, [showDialog])

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

  const loadAnalysis = (analysis) => {
    setAnalysis(analysis);
    closeDialog();
  }

  const columns = [
    {
      dataField: "name",
      text: "Analysis Name",
      sort: true,
      formatter: (cell, row) => <div className="btn btn-link" style={{fontSize: 14}} onClick={()=>loadAnalysis(row)}>{cell}</div>
    },
    {
      dataField: "params",
      text: "Analysis Period",
      formatter: (cell) => (cell.period)
    },
    {
      dataField: "created",
      text: "Creation Date",
      sort: true,
      formatter: (cell) => dateTimeFormatter(cell)
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
                setSelectedAnalysis(row)
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
      aria-label="Saved Analyses Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ width: "100%", maxWidth: "100%", height: "100%", margin: 0 }}
      className="dialog"
    >
      <div className="h-100">
        <RenameAnalysisModal
          showDialog={renameModalVisible}
          closeDialog={() => setRenameModalVisible(false)}
          analysis={selectedAnalysis}
          reloadTable={fetchData}
        />
        <div className="dialog-header justify-content-between">
          <h5 className="font-semibold">Saved Analyses</h5>
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

export default AnalysesList
