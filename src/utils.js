import React from "react"
import Moment from 'react-moment';

export const dateTimeFormatter = (date) => date ? <Moment date={new Date(date)} format="MM/DD/YY hh:mm:ss A" /> : '-'
export const dateFormatter = (date) => date ? <Moment date={new Date(date)} format="MM/DD/YY" /> : '-'


export const getApiUrl = () => (window.OAP_API_URL);
export const getAppId = () => (window.OAP_APP_ID);
export const getInStoreId = () => (window.OAP_IN_STORE_ID || "_oap_data_in_");

export const triggerRunLoading = (runId) => {
  const oapInStoreId = getInStoreId();
  localStorage.setItem(oapInStoreId, JSON.stringify(runId));
  let e = new StorageEvent({});
  e.initStorageEvent(
    "storage",
    false,
    false,
    oapInStoreId,
    null,
    JSON.stringify(runId)
  );
  window.dispatchEvent(e);
}

export const downloadReport = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const paginationTotalRenderer = (from, to, size) => (
  <span className="pagination-total">{size} Results</span>
)

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
  <span className="pagination-size-per-page" role="group">
    <label>Rows:</label>
    <select
      className="form-control"
      onChange={(e) => onSizePerPageChange(e.target.value)}
      defaultValue={currSizePerPage}
    >
      {options.map((option) => {
        return (
          <option value={option.page} key={option.text}>
            {option.text}
          </option>
        )
      })}
    </select>
  </span>
)

export const paginationOptions = {
  showTotal: true,
  sizePerPage: 20,
  sizePerPageList: [
    {
      text: "20",
      value: 20,
    },
    {
      text: "30",
      value: 30,
    },
    {
      text: "40",
      value: 40,
    },
    {
      text: "50",
      value: 50,
    },
  ],
  paginationTotalRenderer,
  sizePerPageRenderer,
}
