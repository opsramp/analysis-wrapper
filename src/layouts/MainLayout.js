import React, { useState, useEffect, useContext } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DateRangePicker from "components/DateRangePicker"
import AnalysesList from "components/Analysis"
import AnalysisRunsList from "components/AnalysisRun"
import LoadingModal from "components/LoadingModal"
import AnalysisSendModal from "components/AnalysisSend/CreateModal"
import ActionMenu from "components/ActionMenu"
import SaveAnalysisModal from "components/Analysis/SaveModal"
import AnalysisContext from '../AnalysisContext'
import { triggerRunLoading, downloadReport, getBasePath, getAppId, getInStoreId } from "utils"


const MainLayout = () => {
  const [isOpenAnalysesList, setIsOpenAnalysesList] = useState(false);
  const [isOpenRunsList, setIsOpenRunsList] = useState(false);
  const [isOpenSaveAnalysisModal, setIsOpenSaveAnalysisModal] = useState(false);
  const [isOpenSendAnalysisModal, setIsOpenSendAnalysisModal] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportPeriod, setReportPeriod] = useState(null);
  const [runId, setRunId] = useState(null);
  const { analysis, setAnalysis } = useContext(AnalysisContext);

  const BASE_PATH = getBasePath();
  const APP_ID = getAppId();
  const oapInStoreId = getInStoreId();

  const runAnalysis = () => {
    setLoading('ANALYZING')

    fetch(`${BASE_PATH}/compute`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period: analysis.params.period,
        analysis_id: analysis.id
      }),
    })
      .then(res => res.json())
      .then(data => {
        setRunId(data["analysis-run"]);
        triggerRunLoading(data["analysis-run"]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  useEffect(() => {
    const rId = localStorage.getItem(oapInStoreId);
    if (rId) {
      setRunId(JSON.parse(rId));
    }
  }, []);

  const exportAnalysis = () => {
    const url = `${BASE_PATH}/analysis-exports/`
    setLoading('GENERATING')

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        run_id: runId,
      }),
    })
      .then(res => res.json())
      .then(data => {
        downloadReport(data.url, 'Report.pdf');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  const saveAnalysis = (name, isSaveAs) => {
    const isNew = isSaveAs || !analysis.id;
    const url = isNew ? `${BASE_PATH}/analyses/` : `${BASE_PATH}/analyses/${analysis.id}/`;
    const method = isNew ? 'POST' : 'PUT';
    const params = { period: reportPeriod.label };

    fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        params,
        app_id: APP_ID
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data);
        setIsOpenSaveAnalysisModal(false);
        toast.success("Analysis Saved.");
      })
      .catch((error) => {
        setIsOpenSaveAnalysisModal(false);
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  const onSaveAnalysis = (isSaveAs) => {
    // if a brand new or save as
    if (isSaveAs || !analysis.id) {
      setIsOpenSaveAnalysisModal(true);
    } else {
      saveAnalysis(analysis.name);
    }
  }

  const onNewAnalysis = () => {
    setAnalysis({
      name: 'Untitled',
      is_unsaved: true,
      params: {
        period: 'Last 24 Hours'
      }
    });
    triggerRunLoading("");
  }

  return (
    <>
      {loading && <LoadingModal title={loading} />}

      <div className="the-panel bg-white h-100" style={{ borderRadius: 5 }}>
        <AnalysesList
          showDialog={isOpenAnalysesList}
          closeDialog={() => setIsOpenAnalysesList(false)}
        />
        <AnalysisRunsList
          showDialog={isOpenRunsList}
          closeDialog={() => setIsOpenRunsList(false)}
          analysis={analysis}
          setRunId={setRunId}
        />
        <SaveAnalysisModal
          showDialog={isOpenSaveAnalysisModal}
          closeDialog={() => setIsOpenSaveAnalysisModal(false)}
          analysis={analysis}
          saveAnalysis={saveAnalysis}
        />
        <AnalysisSendModal
          showDialog={isOpenSendAnalysisModal}
          isSchedule={isSchedule}
          closeDialog={() => setIsOpenSendAnalysisModal(false)}
          setLoading={setLoading}
        />
        <div className="h-100 p-5">
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center pt-0 pb-1">
              <h6 className="mb-0">
                <strong>Analysis:</strong>
              </h6>
              <span>
                <ActionMenu
                  analysis={analysis}
                  runId={runId}
                  onNewAnalysis={onNewAnalysis}
                  openAnalysesListDialog={setIsOpenAnalysesList}
                  exportReport={exportAnalysis}
                  setIsOpenSendAnalysisModal={setIsOpenSendAnalysisModal}
                  setIsSchedule={setIsSchedule}
                  onSaveAnalysis={onSaveAnalysis}
                />
              </span>
            </div>
            <p>{analysis.name} {analysis.is_unsaved ? '(unsaved)' : ''}</p>
          </section>
          <section className="pt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h6 className="mb-0">
                <strong>Parameters</strong>
              </h6>
              <div className="d-flex justify-content-end flex-wrap">
                <div
                  className="d-flex align-items-center ml-5 cursor-pointer"
                  onClick={() => runAnalysis(true)}
                >
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.1972 7.99986L1 1.86838L0.999999 14.1313L10.1972 7.99986ZM1.5547 1.03633C0.890145 0.593294 0 1.06969 0 1.86838V14.1313C0 14.93 0.890144 15.4064 1.5547 14.9634L10.7519 8.83191C11.3457 8.43609 11.3457 7.56364 10.7519 7.16781L1.5547 1.03633Z"
                      fill="#0077C8"
                    />
                  </svg>
                  <span className="ml-2 text-primary">Run</span>
                </div>
                <div className="action-divider"></div>
                <div
                  className="d-flex align-items-center ml-5 cursor-pointer"
                  onClick={() => setIsOpenRunsList(true)}
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1H12.5C12.7761 1 13 0.776142 13 0.5C13 0.223858 12.7761 0 12.5 0H0.5Z"
                      fill="#424242"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.453 12.1598C11.7756 12.6864 10.9244 13 10 13C7.79086 13 6 11.2091 6 9C6 6.79086 7.79086 5 10 5C12.2091 5 14 6.79086 14 9C14 9.92429 13.6865 10.7754 13.16 11.4527L15.8533 14.1462C16.0486 14.3415 16.0486 14.6581 15.8533 14.8533C15.658 15.0486 15.3414 15.0486 15.1462 14.8533L12.453 12.1598ZM13 9C13 10.6569 11.6569 12 10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6C11.6569 6 13 7.34315 13 9Z"
                      fill="#424242"
                    />
                    <path
                      d="M0 3.5C0 3.22386 0.223858 3 0.5 3H15.5C15.7761 3 16 3.22386 16 3.5C16 3.77614 15.7761 4 15.5 4H0.5C0.223858 4 0 3.77614 0 3.5Z"
                      fill="#424242"
                    />
                    <path
                      d="M0.5 6C0.223858 6 0 6.22386 0 6.5C0 6.77614 0.223858 7 0.5 7H5.5C5.77614 7 6 6.77614 6 6.5C6 6.22386 5.77614 6 5.5 6H0.5Z"
                      fill="#424242"
                    />
                    <path
                      d="M0 9.5C0 9.22386 0.223858 9 0.5 9H4.5C4.77614 9 5 9.22386 5 9.5C5 9.77614 4.77614 10 4.5 10H0.5C0.223858 10 0 9.77614 0 9.5Z"
                      fill="#424242"
                    />
                  </svg>
                  <span className="ml-2">Runs</span>
                </div>
              </div>
            </div>
            <ToastContainer />
            <DateRangePicker
              title="Analysis Period"
              setReportPeriod={setReportPeriod}
              analysis={analysis}
              setAnalysis={setAnalysis}
            />
          </section>
        </div>
      </div>
    </>
  )
}

export default MainLayout
