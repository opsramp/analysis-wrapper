import React, { useState, useRef, useEffect } from "react"
import moment from "moment"
import "react-date-time-range-picker/dist/styles.css" // main style file
import "react-date-time-range-picker/dist/theme/default.css" // theme css file
import { DateRangePicker } from "react-date-time-range-picker"

import { subHours } from "date-fns"

import "./style.scss"

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

const AppDateRangePicker = ({ title }) => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState([
    {
      startDate: subHours(new Date(), 24),
      endDate: new Date(),
      key: "selection",
      label: "Last 4 Hours",
    },
  ])

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, () => setShow(false))

  const onChange = (item) => {
    setState([item.selection])
    localStorage.setItem(
      "op-filter-start-date",
      item.selection.startDate.toISOString()
    )
    localStorage.setItem(
      "op-filter-end-date",
      item.selection.endDate.toISOString()
    )
  }

  return (
    <div ref={wrapperRef}>
      {title && <p className="text-grey mb-1">{title}</p>}
      <div className="date-range-input" onClick={() => setShow(!show)}>
        <span className="mr-auto">
          {state[0].label
            ? state[0].label
            : moment(state[0].startDate).format("M/DD/YY") +
              " - " +
              moment(state[0].endDate).format("M/DD/YY")}
        </span>
        <i className="icon-chevron-down ml-auto" />
      </div>
      {show && (
        <DateRangePicker
          maxDate={new Date()}
          mylocale="enUS"
          onChange={(item) => onChange(item)}
          ranges={state}
        />
      )}
    </div>
  )
}

export default AppDateRangePicker
