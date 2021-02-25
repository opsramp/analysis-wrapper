import React from 'react'
import Select, { components } from "react-select"

const customStyles = {
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provide) => ({
      color: "black",
      marginRight: 15
    }),
  }

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <i className="icon-chevron-down ml-auto"/>
      </components.DropdownIndicator>
    );
};

const CustomSelect = (props) => <Select {...props} styles={customStyles} components={{ DropdownIndicator }} />

export default CustomSelect