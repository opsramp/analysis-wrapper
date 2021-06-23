import React, { useState } from "react"
import DateRangePicker from "components/DateRangePicker"
import {
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CDropdown,
} from "@coreui/react"

import SavedViewsModal from "components/SavedViewsModal"
import RunsListModal from "components/RunsListModal"
import AnalysisLoading from "components/AnalysisLoading"
import SendModal from "components/SendModal"
import { triggerRunLoading } from "utils"

const MoreMenu = ({
  openSavedViewDialog,
  openShareDialog,
  openSendAnalysisScheduleDialog,
  openSendAnalysisDialog,
}) => (
  <CDropdown>
    <CDropdownToggle className="action-btn p-0" caret={false}>
      •••
    </CDropdownToggle>
    <CDropdownMenu placement="bottom-start">
      <CDropdownItem>New</CDropdownItem>
      <CDropdownItem onClick={() => openSavedViewDialog(true)}>Open</CDropdownItem>
      <CDropdownItem>
        <hr />
      </CDropdownItem>
      <CDropdownItem>Save</CDropdownItem>
      <CDropdownItem>Save As</CDropdownItem>
      <CDropdownItem>
        <hr />
      </CDropdownItem>
      <CDropdownItem onClick={() => openShareDialog(true)}>Export</CDropdownItem>
      <CDropdownItem onClick={() => openSendAnalysisDialog(true)}>
        Send Now
      </CDropdownItem>
      <CDropdownItem onClick={() => openSendAnalysisScheduleDialog(true)}>
        Send On A Schedule
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
)

const AnalysisWrapper = () => {
  const [showSavedDialog, openSavedViewDialog] = useState(false)
  const [showRunsDialog, openRunsDialog] = useState(false)
  const [showSendAnalysisDialog, openSendAnalysisDialog] = useState(false)
  const [showSendAnalysisScheduleDialog, openSendAnalysisScheduleDialog] =
    useState(false)

  const [loading, setLoading] = useState(false)

  const runAnalysis = () => {
    setLoading(true)

    fetch(`https://localhost/analytics-apps/compute`, {
      // TODO
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: localStorage.getItem("op-filter-start-date"),
        end_date: localStorage.getItem("op-filter-end-date"),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          triggerRunLoading(result["analysis-run"]);
          setLoading(false)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      )
  }

  return (
    <>
      {loading && <AnalysisLoading />}
      <div className="the-panel bg-white h-100" style={{ borderRadius: 5 }}>
        <SavedViewsModal
          showDialog={showSavedDialog}
          closeDialog={() => openSavedViewDialog(false)}
        />
        <RunsListModal
          showDialog={showRunsDialog}
          closeDialog={() => openRunsDialog(false)}
        />
        <SendModal
          showDialog={showSendAnalysisDialog}
          analysis={{
            title: "North America",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }}
          closeDialog={() => openSendAnalysisDialog(false)}
        />
        <SendModal
          showDialog={showSendAnalysisScheduleDialog}
          isSchedule={true}
          analysis={{
            title: "North America",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }}
          closeDialog={() => openSendAnalysisScheduleDialog(false)}
        />
        <div className="h-100 p-5">
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center pt-0 pb-1">
              <h6 className="mb-0">
                <strong>Analysis:</strong>
              </h6>
              <span>
                <MoreMenu
                  openSavedViewDialog={openSavedViewDialog}
                  openShareDialog={openSavedViewDialog}
                  openSendAnalysisDialog={openSendAnalysisDialog}
                  openSendAnalysisScheduleDialog={openSendAnalysisScheduleDialog}
                />
              </span>
            </div>
            <p>North America</p>
          </section>
          <section className="pt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h6 className="mb-0">
                <strong>Settings</strong>
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
                  onClick={() => openRunsDialog(true)}
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
            <DateRangePicker title="Reporting Period" />
          </section>
        </div>
      </div>
    </>
  )
}

export default AnalysisWrapper
