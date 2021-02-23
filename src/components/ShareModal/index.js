import React, { useState } from 'react'
import Select, { components } from "react-select"
import { Dialog, Button, Checkbox } from 'opsramp-design-system'
import UserIcon from 'assets/icons/profile_icon.png'
import LinkIcon from 'assets/icons/link.svg'
import { lawngreen } from 'color-name';
import { isRegExpLiteral } from '@babel/types';

const options = [
    { custom: true, value: "brian.rogers@luminalto.com", user: {
        icon: UserIcon,
        name: "Brian Rogers",
        email: "brian.rogers@luminalto.com"
    },
        label: "brian.rogers@luminalto.com"
    },
];

const CustomOption = props => {
    const { data, innerRef, innerProps } = props;

    return data.custom ? (
      <div ref={innerRef} {...innerProps}>
        <div className="d-flex align-items-center p-2">
            <img className="img-round" src={UserIcon} style={{width: 40, height: 40}}/>
            <div className="d-flex flex-column ml-2">
                <div className="name"><strong>{data.user.name}</strong></div>
                <div className="email text-grey">{data.user.email}</div>
            </div>
        </div>
      </div>
    ) : (
      <components.Option {...props} />
    );
};

const UserSelects = ({onSelect}) => 
    <Select 
        className="user-select"
        components={{ Option: CustomOption }} 
        options={options} 
        placeholder="Add people"
        onChange={(items) => onSelect(items)}
        isMulti 
    />


const ShareModal = ({showDialog, closeDialog}) => {
    const [sharedUsers, setSharedUsers] = useState([
        {
            icon: UserIcon,
            name: "Charlie Consumer",
            email: "charlie.consumer@luminalto.com",
            role: 'Owner'
        }
    ])
    const [isShared, setShared] = useState(false)
    const [selectedUsers, selectUsers] = useState([])

    const onSelect = (items) => {
        if(items)
            selectUsers([...items.map(item => item.user)])
        else selectUsers([])
    }

    const onShare = () => {
        setSharedUsers([...sharedUsers, ...selectedUsers])
        
        //  TO DO sharing

        setShared(true)
        selectUsers([])
    }

    const onDone = () => {
        closeDialog()
    }

    return (
        <Dialog
            aria-label="Share Modal"
            isOpen={showDialog}
            onDismiss={closeDialog}
            style={{maxWidth: 640}}
            className="dialog"
        >
            <div className="dialog-header">
                <h5 className="font-semibold">Share With People</h5>
            </div>
            <div className="dialog-content">
                <UserSelects onSelect={(items) => onSelect(items)}/>
                <Checkbox
                    className="body-1 m-0 py-5"
                    name="one"
                    value="share_all"
                >
                    { (selectedUsers.length > 0)?"Notify people":"Share with everyone in the organization" }
                </Checkbox>
                { selectedUsers.length > 0 && 
                    <textarea className="w-100" rows={5}></textarea> 
                }
                { selectedUsers.length ===0  && 
                    <div className="shared-list">
                        {sharedUsers.map((user, index) => 
                            <div className="d-flex align-items-center p-2 position-relative" key={index}>
                                <img className="img-round" src={user.icon} style={{width: 40, height: 40}}/>
                                <div className="d-flex flex-column ml-2">
                                    <div className="name"><strong>{user.name}</strong></div>
                                    <div className="email text-grey">{user.email}</div>
                                </div>
                                <p className="position-absolute text-grey" style={{top: 10, right: 0}}>
                                    {user.role === 'Owner' ? 
                                        <i>{user.role}</i>:
                                        <div>Can view</div>
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                }
            </div>
            <div className="dialog-footer">
                <a href="" className="d-flex text-primary"><img src={LinkIcon} className="mr-2"/> Copy link</a>
                <Button className="ml-auto" onClick={() => selectedUsers.length > 0?onShare():onDone() }>
                    {selectedUsers.length > 0 && !isShared ? 'SHARE': 'DONE'}
                </Button>
            </div>
        </Dialog>
    )
}

export default ShareModal