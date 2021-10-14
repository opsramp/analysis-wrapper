import React from "react"
import { Dialog, Button } from "opsramp-design-system"

import CloseIcon from "assets/icons/close.svg"

const ConfirmModal = ({ isOpen, setIsOpen, action, title, message }) => {
  return (
    <Dialog
      aria-label="Confirm Delete Modal"
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      style={{
        maxWidth: 500,
        margin: "calc(10% + 150px) auto",
        overflow: "hidden",
      }}
      className="dialog"
    >
    <div className="dialog-header justify-content-between">
      <h5 className="font-semibold">{title}</h5>
      <img
        src={CloseIcon}
        className="mr-2 cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
    </div>
    <div className="dialog-content bg-grey-100">
      <p className="mb-5">{message}</p>
    </div>
    <div className="dialog-footer justify-content-between bg-grey-100">
      <span></span>
      <div className="d-flex align-items-center">
        <span>
          <a
            onClick={() => setIsOpen(false)}
            className="d-flex text-black text-bold cursor-pointer"
          >
            CANCEL
          </a>
        </span>
        <span>
          <Button className="ml-4 px-5" onClick={action}>
            CONFIRM
          </Button>
        </span>
      </div>
    </div>
    </Dialog>
  )
}

export default ConfirmModal
