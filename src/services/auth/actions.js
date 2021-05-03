import { AUTH, WORKOUT, COMMON } from "constants/types"
import { api, authApi, formData } from "utils"

// Get User with Token
export const getCurrentUser = () => {
  return async (dispatch) => {
    let data = {
      method: "get",
      url: `/user`,
    }

    try {
      const res = await authApi(data)

      dispatch({
        type: AUTH.SIGNED_IN,
      })
      dispatch({
        type: AUTH.USER_INFO,
        payload: res.user,
      })
      await dispatch(getOwnerProfile())
    } catch (err) {
      dispatch(logOut())
    }
  }
}

// Get Self Profile
export const getOwnerProfile = () => {
  return async (dispatch) => {
    let data = {
      method: "get",
      url: `/profiles`,
    }

    try {
      const res = await authApi(data)
      dispatch({
        type: AUTH.USER_PROFILE,
        payload: res.profile,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

// Get Other Person's Profile
export const getUserProfile = (userId) => {
  let data = {
    method: "get",
    url: `/profiles/view-profile?profileId=${userId}`,
  }
  return authApi(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}
