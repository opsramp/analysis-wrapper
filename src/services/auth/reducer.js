import { AUTH } from "constants/types"

const initState = {
  is_authed: window.localStorage.getItem("accessToken") ? true : false,
  userInfo: null,
  profile: null,
  toggleLoginModal: false,
  toggleForgotPwdModal: false,
  payments: []
}

const AuthReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case AUTH.SIGNED_IN:
      return {
        ...state,
        is_authed: true,
      }

    case AUTH.SIGNED_OUT:
      return {
        ...state,
        is_authed: false,
      }

    case AUTH.PAYMENTS:
      return {
        ...state,
        payments: Object.assign([], payload),
      }

    case AUTH.REMOVE_PAYMENTS:
      return {
        ...state,
        payments: state.payments.filter(pm => pm._id !== payload),
      }

    case AUTH.USER_PROFILE:
      return {
        ...state,
        profile: payload,
      }

    case AUTH.USER_INFO:
      return {
        ...state,
        userInfo: Object.assign({}, payload),
      }

    case AUTH.REMOVE_GALLERY:
      const profile = Object.assign({}, state.profile)
      profile.gallery = profile.gallery.filter((img) => img.imageId != payload)

      return {
        ...state,
        profile: profile,
      }

    case AUTH.OPEN_LOGIN_MODAL:
      return {
        ...state,
        toggleLoginModal: true,
      }
      

    case AUTH.CLOSE_LOGIN_MODAL:
      return {
        ...state,
        toggleLoginModal: false,
      }

    case AUTH.OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        toggleForgotPwdModal: true,
      }
      

    case AUTH.CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        toggleForgotPwdModal: false,
      }

    default:
      return state
  }
}

export default AuthReducer
