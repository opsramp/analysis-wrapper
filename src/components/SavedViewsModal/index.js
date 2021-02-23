import React from 'react'
import  { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Dialog, Grid } from 'opsramp-design-system'
import {
    CDropdownToggle,
    CDropdownItem,
    CDropdownMenu,
    CDropdown
  } from "@coreui/react"

import CloseIcon from 'assets/icons/close.svg'

const SavedViewsModal = ({showDialog, closeDialog}) => {
    var products = [{
        id: 1,
        name: 'North America',
        create_at: "Sep 15, 2020",
        modified_at: "Sep 22, 2020",
        owner: 'Me'
    }, {
        id: 1,
        name: 'North America',
        create_at: "Sep 15, 2020",
        modified_at: "Sep 22, 2020",
        owner: 'Guest'
    }];

    const nameFormater = (cell, row) => {
        return <div className="text-primary">{cell}</div>
    }

    const actionFormater = (cell, row) => {
        return (
            <CDropdown
              direction="down"
            >
              <CDropdownToggle className="c-header-nav-link drop pl-2 pr-0" caret={false}>
                Actions <i className="icon-chevron-down ml-auto"/>
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem to="/home">
                  Share...
                </CDropdownItem>
                <CDropdownItem to="/user/account">
                  Rename...
                </CDropdownItem>
                <CDropdownItem>
                  Make a copy...
                </CDropdownItem>
                <CDropdownItem>
                  Remove
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
        )
    }

    const sortOwner = (a, b, order) => {
        if (order === 'desc') {
            return a.owner - b.owner;
          } else {
            return b.owner - a.owner;
          }
    }

    return (
        <Dialog
            aria-label="Share Modal"
            isOpen={showDialog}
            onDismiss={closeDialog}
            style={{width: '100%', maxWidth: '100%', height: '100%', margin: 0}}
            className="dialog"
        >
            <div className="h-100">
                <div className="dialog-header">
                    <img src={CloseIcon} className="mr-2" onClick={() => closeDialog()}/>
                    <h5 className="font-semibold">Saved Views</h5>
                </div>
                <BootstrapTable data={products} bordered={ false } className="h-100" version='4'>
                    <TableHeaderColumn isKey dataField='name' dataFormat={ nameFormater }>View Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='create_at'>Creation Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='modified_at'>Last Modified</TableHeaderColumn>
                    <TableHeaderColumn dataField='owner' dataSort >Owner</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataFormat={actionFormater}></TableHeaderColumn>
                </BootstrapTable>
            </div>
        </Dialog>
    )
}

export default SavedViewsModal
