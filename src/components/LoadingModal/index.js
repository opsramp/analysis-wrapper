import React from "react"

const LoadingModal = ({title}) => (
  <div className="data-loading">
    <div className="data-loading__bar d-flex align-items-center justify-content-center">
      <div className="lds-ring">
        <div />
        <div />
        <div />
      </div>
      <p className="text-primary mb-0">
        <strong>{title}</strong>
      </p>
    </div>
  </div>
)

export default LoadingModal
