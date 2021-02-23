import React, {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  CHeader,
  CButton,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CDropdown,
  CLink,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInput,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { withRouter } from "react-router-dom"

import ShareModal from 'components/ShareModal'
import SavedViewsModal from 'components/SavedViewsModal'


import LogoIcon from 'assets/icons/logo.svg'
import ExportIcon from 'assets/icons/export.svg'
import ShareIcon from 'assets/icons/share.svg'
import ProfileIcon from 'assets/icons/profile_icon.png'

import "./TheHeader.scss"

const TheHeader = ({ fixed, shadow, bgColor, history }) => {
  const dispatch = useDispatch()
  const [showShareDialog, openShareDialog] = useState(false)
  const [showSavedDialog, openSavedViewDialog] = useState(false)


  return (
    <>
      <ShareModal showDialog={showShareDialog} closeDialog={() => openShareDialog(false)}/>
      <SavedViewsModal showDialog={showSavedDialog} closeDialog={() => openSavedViewDialog(false)}/>
      <CHeader
        className={`static-header px-5 ${shadow ? "shadow" : ""}`}
        fixed={fixed || false}
        style={{ zIndex: 999, backgroundColor: bgColor || "transparent" }}
      >
        {/* <div className="static-header-block">
          <CHeaderBrand className="mx-2" to="/">
            <img src={LogoIcon}/>
          </CHeaderBrand>

          <CHeaderNav>
            <div className="nav-divider"></div>
            <CHeaderNavItem className="px-2 h-100">
              <CHeaderNavLink onClick={() => openSavedViewDialog(true)}>
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.92274 1.23071V4.92302" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.91927 5.0769H11.098" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.0773 1.23071V4.92302" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H10.86C11.2118 0.5 11.5525 0.623707 11.8224 0.849483L13.4723 2.22966L14.9625 3.47624C15.3031 3.76124 15.5 4.18258 15.5 4.62676V15.2308C15.5 16.0592 14.8284 16.7308 14 16.7308H2C1.17157 16.7308 0.5 16.0592 0.5 15.2308V2Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7.99967" cy="10.4617" r="2.57692" stroke="#757575"/>
                </svg>
                SAVE
              </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem className="px-2 h-100">
              <CHeaderNavLink onClick={() => openShareDialog(true)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.3536 1.14645C14.1583 0.951184 13.8417 0.951184 13.6464 1.14645C13.4512 1.34171 13.4512 1.65829 13.6464 1.85355L15.7939 4.00103C12.3277 4.03568 9.98616 4.94722 8.51246 6.49886C7.01404 8.07652 6.5 10.225 6.5 12.5C6.5 12.7761 6.72386 13 7 13C7.27614 13 7.5 12.7761 7.5 12.5C7.5 10.3567 7.98596 8.50529 9.23754 7.18752C10.4593 5.90114 12.4944 5.03597 15.7918 5.0011L13.6464 7.14645C13.4512 7.34171 13.4512 7.65829 13.6464 7.85355C13.8417 8.04882 14.1583 8.04882 14.3536 7.85355L17.7071 4.5L14.3536 1.14645Z" fill="#757575"/>
                  <path d="M2 4C1.72386 4 1.5 4.22386 1.5 4.5V16.5C1.5 16.7761 1.72386 17 2 17H14C14.2761 17 14.5 16.7761 14.5 16.5V11.5C14.5 11.2239 14.7239 11 15 11C15.2761 11 15.5 11.2239 15.5 11.5V16.5C15.5 17.3284 14.8284 18 14 18H2C1.17157 18 0.5 17.3284 0.5 16.5V4.5C0.5 3.67157 1.17157 3 2 3H7.3C7.57614 3 7.8 3.22386 7.8 3.5C7.8 3.77614 7.57614 4 7.3 4H2Z" fill="#757575"/>
                </svg>
                SHARE
              </CHeaderNavLink>
            </CHeaderNavItem>

            <CDropdown
              inNav
              className="c-header-nav-items mx-2"
              direction="down"
            >
              <CDropdownToggle className="c-header-nav-link drop pl-2 pr-0" caret={false}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.4974 9.00249C17.219 9.00249 16.9915 9.23 16.9915 9.50844V14.0105C16.9915 15.1039 16.1018 15.9936 15.0085 15.9936L2.99151 15.9933C1.90153 15.9899 1.01188 15.1036 1.01188 14.0103V9.44027C1.01188 9.16183 0.78438 8.93433 0.505942 8.93433C0.227504 8.93433 0 9.16183 0 9.44027V14.0103C0 15.6605 1.34126 17.0018 2.99151 17.0018L15.0085 17.002C16.6587 17.002 18 15.6608 18 14.0105V9.50844C18.0034 9.23 17.7759 9.00249 17.4974 9.00249Z" fill="#757575"/>
                  <path d="M9.35841 1.14794C9.26334 1.05286 9.1343 0.998535 9.00187 0.998535C8.86605 0.998535 8.73702 1.05286 8.64534 1.14794L5.76249 4.03079C5.56554 4.22774 5.56554 4.54692 5.76249 4.74387C5.95943 4.94081 6.27862 4.94081 6.47556 4.74387L8.49933 2.72349L8.49933 12.4848C8.49933 12.7632 8.72683 12.9907 9.00527 12.9907C9.28371 12.9907 9.51121 12.7632 9.51121 12.4848L9.51121 2.72349L11.535 4.74726C11.6301 4.84234 11.7591 4.89667 11.8915 4.89667C12.0239 4.89667 12.153 4.84234 12.2481 4.74726C12.3431 4.65218 12.3975 4.52315 12.3975 4.39073C12.3975 4.2583 12.3431 4.12926 12.2481 4.03419L9.35841 1.14794Z" fill="#757575"/>
                </svg>
                SEND SNAPSHOT <i className="icon-chevron-down ml-auto"/>
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem to="/home">
                  Send to myself
                </CDropdownItem>
                <CDropdownItem to="/user/account">
                  Send to others
                </CDropdownItem>
                <CDropdownItem>
                  See all sends
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <div className="nav-divider"></div>
            <CDropdown
              inNav
              className="c-header-nav-items mx-3"
              direction="down"
            >
              <CDropdownToggle className="c-header-nav-link p-0" caret={false}>
                <img src={ProfileIcon}/>
              </CDropdownToggle>
              <CDropdownMenu placement="bottom-end">
                <CDropdownItem to="/home">
                  Return to Opsramp
                </CDropdownItem>
                <CDropdownItem to="/user/account">
                  Log out
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CHeaderNav>
        </div> */}
      </CHeader>
    </>
  )
}

export default withRouter(TheHeader)
