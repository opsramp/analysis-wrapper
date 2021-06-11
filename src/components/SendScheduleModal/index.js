import React, { useState } from "react"
import { Dialog, Button } from "opsramp-design-system"
import { Formik } from "formik"
import * as Yup from "yup"
import CustomSelect from "../CustomSelect"

import { API_URL } from "config"

const formatOptions = [{ value: "PDF", label: "PDF" }]

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
]

const weekOptions = [
  { value: "Mo", label: "Monday" },
  { value: "Tu", label: "Tuesday" },
  { value: "We", label: "Wednesday" },
  { value: "Th", label: "Thursday" },
  { value: "Fr", label: "Friday" },
  { value: "Sa", label: "Saturday" },
  { value: "Su", label: "Sunday" },
]

const recipientOptions = [
  { value: "0", label: "John Smith" },
  { value: "1", label: "North America Sales" },
]

const getReceipientsArray = (recepients) => {
  return recepients.split(",").map((re) => parseInt(re))
}

const SendScheduleModal = ({
  showDialog,
  closeDialog,
  analysis,
  isSchedule = false,
}) => {
  const [selectedFrequency, setFrequency] = useState(frequencyOptions[0].value)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    fetch(`${API_URL}/analysis-sends/`, {
      method: "POST",
      body: JSON.stringify({
        ...values,
        analysis: analysis.id,
        recepients: getReceipientsArray(values.recepients),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          closeDialog()
          setLoading(false)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoading(false)
          console.log(error)
        }
      )
  }

  const deleteSchedule = () => {
    fetch(`${API_URL}/analysis-sends/${analysis.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          closeDialog()
          setLoading(false)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoading(false)
          console.log(error)
        }
      )
  }

  return (
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
          format: "PDF",
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
                Send On A Schedule - Analysis: <i>{analysis.title}</i>
              </h5>
            </div>
            <div className="dialog-content bg-grey-100">
              <p className="mb-5">
                Analysis will be sent to recipients according to their communication
                preferences (e.g. email, notification, etc.)
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
                      options={formatOptions}
                      defaultValue={formatOptions[0]}
                      isDisabled={true}
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
                          props.handleChange("schedule")(option ? option.value : "")
                          setFrequency(option ? option.value : "")
                        }}
                      />
                    </div>
                    <div className="col-4">
                      {selectedFrequency === "weekly" && (
                        <CustomSelect
                          options={weekOptions}
                          defaultValue={weekOptions[0]}
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
                <a
                  onClick={deleteSchedule}
                  className="d-flex text-black text-bold cursor-pointer"
                >
                  DELETE SECHEDULED SEND
                </a>
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
    </Dialog>
  )
}

export default SendScheduleModal
