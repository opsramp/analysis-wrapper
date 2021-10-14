import React, { useState, useContext } from "react"
import { Dialog, Button } from "opsramp-design-system"
import { Formik } from "formik"
import * as Yup from "yup"
import CustomSelect from "../CustomSelect"
import AnalysisContext from '../../AnalysisContext';
import { getBasePath } from 'utils'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmModal from 'components/ConfirmModal';

const formatOptions = [
  { value: "pdf", label: "PDF" },
  { value: "excel", label: "Excel" }
]

const frequencyOptions = [
  { value: "0 0 * * *", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "0 0 1 * *", label: "Monthly" },
  { value: "0 0 1 * MON", label: "Quarterly" },
]

const weekOptions = [
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
]

const recipientOptions = [
  { value: "thirupathaiah.m@opsramp.com", label: "Thirupathi Reddy" },
  { value: "raju.mummidi@opsramp.com", label: "Raju Mummidi" },
  { value: "it.corridor051@gmail.com", label: "Don Lafranchi" },
]

const AnalysisSendModal = ({ showDialog, closeDialog, isSchedule, setLoading }) => {
  const [selectedFrequency, setFrequency] = useState(frequencyOptions[0].value)
  const [weekday, setWeekDay] = useState(weekOptions[0].value)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const { analysis, setAnalysis } = useContext(AnalysisContext);

  const BASE_PATH = getBasePath();

  const handleSubmit = (values) => {
    let cron = null;
    if (isSchedule) {
      cron = selectedFrequency;
      if (selectedFrequency == 'weekly') {
        cron = "0 0 * * " + weekday;
      };
    }

    setLoading('SENDING')
    fetch(`${BASE_PATH}/analysis-sends/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        analysis_id: analysis.id,
        recepients: values.recepients,
        schedule: cron
      }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Analysis Sent.");
        closeDialog();
        setLoading(false);
      })
      .catch(error => {
        closeDialog();
        setLoading(false);
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  const deleteSchedule = () => {
    fetch(`${BASE_PATH}/analysis-sends/${analysis.id}/`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setOpenConfirmModal(false)
        closeDialog()
        setLoading(false)
      })
      .catch((error) => {
        setOpenConfirmModal(false)
        setLoading(false)
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  return (
    <>
      <ConfirmModal
        title="Confirm Delete Scheduled Send"
        message="This will delete the existing Scheduled Send for this analysis."
        isOpen={openConfirmModal}
        setIsOpen={setOpenConfirmModal}
        action={deleteSchedule}
      />
      <Dialog
        aria-label="Share Modal"
        isOpen={showDialog}
        onDismiss={closeDialog}
        style={{ maxWidth: 700, margin: "5% auto", overflow: "hidden" }}
        className="dialog"
      >
        <Formik
          onSubmit={(values) => {
            handleSubmit(values)
          }}
          initialValues={{
            subject: "",
            format: "pdf",
            schedule: "",
            message: "",
            recepients: "",
          }}
          validationSchema={Yup.object().shape({
            subject: Yup.string().required("Subject is required"),
            format: Yup.string(),
            schedule: Yup.string(),
            message: Yup.string(),
            recepients: Yup.string().required("Recepients is required"),
          })}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="dialog-header">
                <h5 className="font-semibold">
                  Send {isSchedule ? "On A Schedule" : "Now"} - Analysis:{" "}
                  <i>{analysis.name}</i>
                </h5>
              </div>
              <div className="dialog-content bg-grey-100">
                <p className="mb-5">
                  Analysis will be sent to recipients according to their
                  communication preferences (e.g. email, notification, etc.)
                </p>
                <div className="form-group mb-2">
                  <label>Receipients</label>
                  <CustomSelect
                    options={recipientOptions}
                    isMulti
                    id="recepients"
                    name="recepients"
                    className={
                      props.errors.recepients && props.touched.recepients
                        ? "select-is-invalid is-invalid"
                        : ""
                    }
                    onChange={(option) => {
                      props.handleChange("recepients")(
                        (option || []).map((op) => op.value).toString()
                      )
                    }}
                  />
                  {props.errors.recepients && props.touched.recepients && (
                    <div className="invalid-feedback">{props.errors.recepients}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={props.handleChange}
                    value={props.values.subject}
                    className={
                      props.errors.subject && props.touched.subject
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {props.errors.subject && props.touched.subject && (
                    <div className="invalid-feedback">{props.errors.subject}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label>Format</label>
                  <div className="row">
                    <div className="col-4">
                      <CustomSelect
                        id="format"
                        name="format"
                        options={formatOptions}
                        defaultValue={formatOptions[0]}
                        onChange={(option) => {
                          props.handleChange("format")(option.value)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {isSchedule && (
                  <div className="form-group mb-2">
                    <label>Frequency</label>
                    <div className="row">
                      <div className="col-4">
                        <CustomSelect
                          id="schedule"
                          name="schedule"
                          options={frequencyOptions}
                          defaultValue={frequencyOptions[0]}
                          onChange={(option) => {
                            props.handleChange("schedule")(
                              option ? option.value : ""
                            )
                            setFrequency(option ? option.value : "")
                          }}
                        />
                      </div>
                      <div className="col-4">
                        {selectedFrequency === "weekly" && (
                          <CustomSelect
                            id="day"
                            name="day"
                            options={weekOptions}
                            defaultValue={weekOptions[0]}
                            onChange={(option) => {
                              props.handleChange("day")(
                                option ? option.value : ""
                              )
                              setWeekDay(option ? option.value : "")
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group mb-2">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    onChange={props.handleChange}
                    value={props.values.message}
                  ></textarea>
                </div>
              </div>
              <div className="dialog-footer justify-content-between bg-grey-100">
                <span>
                {
                  isSchedule &&
                  <a
                    onClick={() => setOpenConfirmModal(true)}
                    className="d-flex text-black text-bold cursor-pointer"
                  >
                    DELETE SECHEDULED SEND
                  </a>
                }
                </span>
                <div className="d-flex align-items-center">
                  <span>
                    <a
                      onClick={closeDialog}
                      className="d-flex text-black text-bold cursor-pointer"
                    >
                      CANCEL
                    </a>
                  </span>
                  <span>
                    <Button className="ml-4 px-5" type="submit">
                      Save
                    </Button>
                  </span>
                </div>
              </div>
            </form>
          )}
        </Formik>
        <ToastContainer />
      </Dialog>
    </>
  )
}

export default AnalysisSendModal
