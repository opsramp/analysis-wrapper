import React from "react"
import { Dialog, Button } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"

const RenameModal = ({ showDialog, closeDialog, selectedRow }) => {
  const onSave = () => {
    closeDialog()
  }

  return (
    <Dialog
      aria-label="Share Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ maxWidth: 500 }}
      className="dialog"
    >
      <div className="dialog-header justify-content-between">
        <h5 className="font-semibold">Rename Analysis</h5>
        <img
          src={CloseIcon}
          className="mr-2 cursor-pointer"
          onClick={() => closeDialog()}
        />
      </div>
      <div className="dialog-content bg-grey-100">
        <p className="mb-5">Enter a new name for the analysis</p>
        <div className="form-group">
          <label>New Name</label>
          <input className="form-control" value={selectedRow.name}></input>
        </div>
      </div>
      <div className="dialog-footer justify-content-end bg-grey-100">
        <a
          onClick={closeDialog}
          className="d-flex text-black text-bold cursor-pointer"
        >
          CANCEL
        </a>
        <Button className="ml-4 px-5" onClick={() => onSave()}>
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default RenameModal
