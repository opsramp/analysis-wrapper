import React from "react"
import { Dialog, Button } from "opsramp-design-system"

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
      <div className="dialog-header">
        <h5 className="font-semibold">Rename Analysis</h5>
      </div>
      <div className="dialog-content bg-grey-100">
        <p className="mb-5">Enter a new name for the analysis</p>
        <div className="form-group">
          <label>New Name</label>
          <input className="form-control" value={selectedRow.name}></input>
        </div>
      </div>
      <div className="dialog-footer justify-content-end bg-grey-100">
        <a href="" className="d-flex text-black">
          Cancel
        </a>
        <Button className="ml-4 px-5" onClick={() => onSave()}>
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default RenameModal
