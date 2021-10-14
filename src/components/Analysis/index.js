import React, { useState, useEffect, useContext } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { Dialog } from "opsramp-design-system"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CopyIcon from "assets/icons/icon-copy.svg"
import EditIcon from "assets/icons/icon-edit.svg"
import RemoveIcon from "assets/icons/icon-remove.svg"
import CloseIcon from "assets/icons/close.svg"
import ConfirmModal from 'components/ConfirmModal';
import RenameCopyAnalysisModal from "./RenameCopyModal"
import AnalysisContext from '../../AnalysisContext';
import { dateTimeFormatter, paginationOptions, getBasePath, getAppId } from "utils"

const AnalysesList = ({ showDialog, closeDialog }) => {
  const [isOpenRenameCopyModal, setIsOpenRenameCopyModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [renameCopyMode, setRenameCopyMode] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(false)
  const [analysesData, setAnalysesData] = useState([])
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [sort, setSort] = useState(null)
  const [totalSize, setTotalSize] = useState(null)
  const { analysis, setAnalysis } = useContext(AnalysisContext);

  const BASE_PATH = getBasePath();
  const APP_ID = getAppId();

  const fetchData = () =>
    fetch(
      `${BASE_PATH}/analyses/?app_id=${APP_ID}&page=${page}${
        sort ? `&ordering=${sort}` : ""
      }&page_size=${sizePerPage}`
    )
      .then(res => res.json())
      .then(data => {
        setTotalSize(data.count)
        setAnalysesData(data.results)
      })
      .catch(error => {
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      });

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
  
  const deleteAnalysis = () => {
    fetch(`${BASE_PATH}/analyses/${selectedAnalysis.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
        setIsOpenConfirmModal(false)
      })
      .catch(() => {
        toast.error("Sorry, something is wrong.");
      })
  }

  const openRenameModal = () => {
    setRenameCopyMode('rename');
    setModalTitle('Rename Analysis');
    setIsOpenRenameCopyModal(true);
  }

  const openCopyModal = () => {
    setRenameCopyMode('copy');
    setModalTitle('Copy Analysis');
    setIsOpenRenameCopyModal(true);
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
            <button
              className="action-btn"
              title="Copy"
              onClick={() => {
                setSelectedAnalysis(row)
                openCopyModal()
              }}
            >
              <img src={CopyIcon} />
            </button>
            <button
              className="action-btn"
              title="Rename"
              onClick={() => {
                setSelectedAnalysis(row)
                openRenameModal()
              }}
            >
              <img src={EditIcon} />
            </button>
            <button
              className="action-btn"
              title="Delete"
              onClick={() => {
                setIsOpenConfirmModal(true)
                setSelectedAnalysis(row)
              }}
            >
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
        <RenameCopyAnalysisModal
          showDialog={isOpenRenameCopyModal}
          closeDialog={() => setIsOpenRenameCopyModal(false)}
          analysis={selectedAnalysis}
          reloadTable={fetchData}
          title={modalTitle}
          mode={renameCopyMode}
        />
        <ConfirmModal
          title="Confirm Delete Analysis"
          message="This will delete the existing Analysis."
          isOpen={isOpenConfirmModal}
          setIsOpen={setIsOpenConfirmModal}
          action={deleteAnalysis}
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
      <ToastContainer />
    </Dialog>
  )
}

export default AnalysesList
