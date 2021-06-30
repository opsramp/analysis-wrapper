import React, { useState, useRef, useEffect } from "react"
import moment from "moment"
import "react-date-time-range-picker/dist/styles.css" // main style file
import "react-date-time-range-picker/dist/theme/default.css" // theme css file
import { DateRangePicker } from "react-date-time-range-picker"

import { subDays, subHours } from "date-fns"

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

const AppDateRangePicker = ({ title, setReportPeriod, analysis, setAnalysis }) => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState([{}])

  useEffect(() => {
    let startDate;
    let endDate = new Date();

    if (analysis.params.period == 'Last Hour') {
      startDate = subHours(new Date(), 1);
    } else if (analysis.params.period == 'Last 4 Hours') {
      startDate = subHours(new Date(), 4);
    } else if (analysis.params.period == 'Last 8 Hours') {
      startDate = subHours(new Date(), 8);
    } else if (analysis.params.period == 'Last 24 Hours') {
      startDate = subHours(new Date(), 24);
    } else if (analysis.params.period == 'Last 7 Days') {
      startDate = subDays(new Date(), 7);
    } else if (analysis.params.period == 'Last 30 Days') {
      startDate = subDays(new Date(), 30);
    }

    const selection = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
      label: analysis.params.period,
    };

    setState([selection]);
    setReportPeriod(selection);
  }, [analysis.id]);

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, () => setShow(false))

  const onChange = (item) => {
    setState([item.selection]);
    setReportPeriod(item.selection);
    const is_unsaved = !analysis.id || analysis.params.period !== item.selection.label;
    setAnalysis(prevState => ({ ...prevState, is_unsaved }));
  }

  return (
    <div ref={wrapperRef}>
      <p className="text-grey mb-1">{title}</p>
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
