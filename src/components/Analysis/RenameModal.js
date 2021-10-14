import React, { useState } from "react"
import { Dialog, Button } from "opsramp-design-system"
import CloseIcon from "assets/icons/close.svg"
import { getBasePath } from "utils"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenameAnalysisModal = ({ showDialog, closeDialog, analysis, reloadTable }) => {
  const [newName, setNewName] = useState(analysis.name)

  const BASE_PATH = getBasePath();

  const onSave = () => {
    fetch(`${BASE_PATH}/analyses/${analysis.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName
      }),
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Renamed successfully.");
        reloadTable();
        closeDialog();
      })
      .catch(error => {
        toast.error("Sorry, something is wrong.");
        console.log('Error:', error);
      })
  }

  return (
    <Dialog
      aria-label="Rename Analysis Modal"
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
        <Button className="ml-4 px-5" onClick={() => onSave()}>
          SAVE
        </Button>
      </div>
      <ToastContainer />
    </Dialog>
  )
}

export default RenameAnalysisModal
