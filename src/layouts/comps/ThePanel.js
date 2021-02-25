import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import DateRangePicker from 'components/DateRangePicker'
import CustomSelect from 'components/CustomSelect'

import ShareModal from 'components/ShareModal'
import SavedViewsModal from 'components/SavedViewsModal'

const options = [
    { value: "North America", label: "North America"},
    { value: "South America", label: "South America"},
    { value: "Canada", label: "Canada"},
];

const ThePanel = () => {
    const dispatch = useDispatch()
    const [showShareDialog, openShareDialog] = useState(false)
    const [showSavedDialog, openSavedViewDialog] = useState(false)

    return (
        <div className="the-panel h-100">
            <ShareModal showDialog={showShareDialog} closeDialog={() => openShareDialog(false)}/>
            <SavedViewsModal showDialog={showSavedDialog} closeDialog={() => openSavedViewDialog(false)}/>
            <div className="h-100 bg-white p-8 sidebar-nav">
                <div className="d-flex justify-content-end mb-5 flex-wrap">
                    <div className="d-flex align-items-center ml-5 mb-3 cursor-pointer" onClick={() => openSavedViewDialog(true)}>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.92274 1.23071V4.92302" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4.91927 5.0769H11.098" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.0773 1.23071V4.92302" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H10.86C11.2118 0.5 11.5525 0.623707 11.8224 0.849483L13.4723 2.22966L14.9625 3.47624C15.3031 3.76124 15.5 4.18258 15.5 4.62676V15.2308C15.5 16.0592 14.8284 16.7308 14 16.7308H2C1.17157 16.7308 0.5 16.0592 0.5 15.2308V2Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="7.99967" cy="10.4617" r="2.57692" stroke="#757575"/>
                        </svg>
                        <span className="ml-2">
                            Save    
                        </span>
                    </div>
                    <div className="d-flex align-items-center ml-5 mb-3 cursor-pointer" onClick={() => openShareDialog(true)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3536 1.14645C14.1583 0.951184 13.8417 0.951184 13.6464 1.14645C13.4512 1.34171 13.4512 1.65829 13.6464 1.85355L15.7939 4.00103C12.3277 4.03568 9.98616 4.94722 8.51246 6.49886C7.01404 8.07652 6.5 10.225 6.5 12.5C6.5 12.7761 6.72386 13 7 13C7.27614 13 7.5 12.7761 7.5 12.5C7.5 10.3567 7.98596 8.50529 9.23754 7.18752C10.4593 5.90114 12.4944 5.03597 15.7918 5.0011L13.6464 7.14645C13.4512 7.34171 13.4512 7.65829 13.6464 7.85355C13.8417 8.04882 14.1583 8.04882 14.3536 7.85355L17.7071 4.5L14.3536 1.14645Z" fill="#757575"/>
                            <path d="M2 4C1.72386 4 1.5 4.22386 1.5 4.5V16.5C1.5 16.7761 1.72386 17 2 17H14C14.2761 17 14.5 16.7761 14.5 16.5V11.5C14.5 11.2239 14.7239 11 15 11C15.2761 11 15.5 11.2239 15.5 11.5V16.5C15.5 17.3284 14.8284 18 14 18H2C1.17157 18 0.5 17.3284 0.5 16.5V4.5C0.5 3.67157 1.17157 3 2 3H7.3C7.57614 3 7.8 3.22386 7.8 3.5C7.8 3.77614 7.57614 4 7.3 4H2Z" fill="#757575"/>
                        </svg>
                        <span className="ml-2">
                            Share
                        </span>
                    </div>
                    <div className="d-flex align-items-center ml-5 mb-3 cursor-pointer" onClick={() => openShareDialog(true)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4974 9.00249C17.219 9.00249 16.9915 9.23 16.9915 9.50844V14.0105C16.9915 15.1039 16.1018 15.9936 15.0085 15.9936L2.99151 15.9933C1.90153 15.9899 1.01188 15.1036 1.01188 14.0103V9.44027C1.01188 9.16183 0.78438 8.93433 0.505942 8.93433C0.227504 8.93433 0 9.16183 0 9.44027V14.0103C0 15.6605 1.34126 17.0018 2.99151 17.0018L15.0085 17.002C16.6587 17.002 18 15.6608 18 14.0105V9.50844C18.0034 9.23 17.7759 9.00249 17.4974 9.00249Z" fill="#757575"/>
                            <path d="M9.35841 1.14794C9.26334 1.05286 9.1343 0.998535 9.00187 0.998535C8.86605 0.998535 8.73702 1.05286 8.64534 1.14794L5.76249 4.03079C5.56554 4.22774 5.56554 4.54692 5.76249 4.74387C5.95943 4.94081 6.27862 4.94081 6.47556 4.74387L8.49933 2.72349L8.49933 12.4848C8.49933 12.7632 8.72683 12.9907 9.00527 12.9907C9.28371 12.9907 9.51121 12.7632 9.51121 12.4848L9.51121 2.72349L11.535 4.74726C11.6301 4.84234 11.7591 4.89667 11.8915 4.89667C12.0239 4.89667 12.153 4.84234 12.2481 4.74726C12.3431 4.65218 12.3975 4.52315 12.3975 4.39073C12.3975 4.2583 12.3431 4.12926 12.2481 4.03419L9.35841 1.14794Z" fill="#757575"/>
                        </svg>
                        <span className="ml-2">
                            Send
                        </span>                       
                    </div>
                </div>
                <section className="mb-5">
                    <h6 className="pt-5 pb-4"><strong>Analysis:</strong></h6>
                    <CustomSelect 
                        options={options} 
                        placeholder="North America"
                    />
                </section>
                <section className="pt-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <h6 className="mb-0"><strong>Settings</strong></h6>
                        <div className="d-flex justify-content-end flex-wrap">
                            <div className="d-flex align-items-center ml-5 cursor-pointer" onClick={() => openShareDialog(true)}>
                                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1972 7.99986L1 1.86838L0.999999 14.1313L10.1972 7.99986ZM1.5547 1.03633C0.890145 0.593294 0 1.06969 0 1.86838V14.1313C0 14.93 0.890144 15.4064 1.5547 14.9634L10.7519 8.83191C11.3457 8.43609 11.3457 7.56364 10.7519 7.16781L1.5547 1.03633Z" fill="#0077C8"/>
                                </svg>

                                <span className="ml-2 text-primary">
                                    Run
                                </span>                       
                            </div>
                            <div className="action-divider"></div>
                            <div className="d-flex align-items-center ml-5 cursor-pointer" onClick={() => openShareDialog(true)}>
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1H12.5C12.7761 1 13 0.776142 13 0.5C13 0.223858 12.7761 0 12.5 0H0.5Z" fill="#424242"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.453 12.1598C11.7756 12.6864 10.9244 13 10 13C7.79086 13 6 11.2091 6 9C6 6.79086 7.79086 5 10 5C12.2091 5 14 6.79086 14 9C14 9.92429 13.6865 10.7754 13.16 11.4527L15.8533 14.1462C16.0486 14.3415 16.0486 14.6581 15.8533 14.8533C15.658 15.0486 15.3414 15.0486 15.1462 14.8533L12.453 12.1598ZM13 9C13 10.6569 11.6569 12 10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6C11.6569 6 13 7.34315 13 9Z" fill="#424242"/>
                                <path d="M0 3.5C0 3.22386 0.223858 3 0.5 3H15.5C15.7761 3 16 3.22386 16 3.5C16 3.77614 15.7761 4 15.5 4H0.5C0.223858 4 0 3.77614 0 3.5Z" fill="#424242"/>
                                <path d="M0.5 6C0.223858 6 0 6.22386 0 6.5C0 6.77614 0.223858 7 0.5 7H5.5C5.77614 7 6 6.77614 6 6.5C6 6.22386 5.77614 6 5.5 6H0.5Z" fill="#424242"/>
                                <path d="M0 9.5C0 9.22386 0.223858 9 0.5 9H4.5C4.77614 9 5 9.22386 5 9.5C5 9.77614 4.77614 10 4.5 10H0.5C0.223858 10 0 9.77614 0 9.5Z" fill="#424242"/>
                                </svg>

                                <span className="ml-2">
                                    Runs
                                </span>                       
                            </div>
                        </div>
                    </div>
                    <DateRangePicker title="Reporting Period"/>
                </section>
            </div>
        </div>
    )
}

export default ThePanel