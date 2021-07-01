import React, { useState } from "react"
import { Dialog, Button } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"

const SaveAnalysisModal = ({ showDialog, closeDialog, analysis, saveAnalysis }) => {
  const [newName, setNewName] = useState(analysis.name)

  return (
    <Dialog
      aria-label="Save Analysis Modal"
      isOpen={showDialog}
      onDismiss={closeDialog}
      style={{ maxWidth: 500 }}
      className="dialog"
    >
      <div className="dialog-header justify-content-between">
        <h5 className="font-semibold">{ analysis.id ? "Save As Analysis" : "Save Analysis" }</h5>
        <img
          src={CloseIcon}
          className="mr-2 cursor-pointer"
          onClick={() => closeDialog()}
        />
      </div>
      <div className="dialog-content bg-grey-100">
        <p className="mb-5">{ analysis.id ? "Enter a new name for the analysis" : "Enter a name for the analysis" }</p>
        <div className="form-group">
          <label>{ analysis.id ? "New Name" : "Name" }</label>
          <input className="form-control" type="text" defaultValue={analysis.name} onChange={(e) => setNewName(e.target.value)}></input>
        </div>
      </div>
      <div className="dialog-footer justify-content-end bg-grey-100">
        <a
          onClick={closeDialog}
          className="d-flex text-black text-bold cursor-pointer"
        >
          CANCEL
        </a>
        <Button className="ml-4 px-5" onClick={() => saveAnalysis(newName, true)}>
          SAVE
        </Button>
      </div>
    </Dialog>
  )
}

export default SaveAnalysisModal
