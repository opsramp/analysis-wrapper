import React from "react"

export const localFullDate = (date) => new Date(date).toLocaleString()
export const localDate = (date) => new Date(date).toLocaleDateString()

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
