import React from "react"
import Select, { components } from "react-select"

const customStyles = {
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provide) => ({
    color: "black",
    marginRight: 10,
  }),
  multiValue: () => ({
    backgroundColor: "white",
    display: "flex",
    borderRadius: 15,
    marginRight: 5,
    border: "1px solid #ced4da",
  }),
  multiValueLabel: () => ({
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingRight: 10,
  }),
  multiValueRemove: () => ({
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    paddingRight: 5,
  }),
}

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <i className="icon-chevron-down ml-auto" />
    </components.DropdownIndicator>
  )
}

const CustomSelect = (props) => (
  <Select {...props} styles={customStyles} components={{ DropdownIndicator }} />
)

export default CustomSelect
