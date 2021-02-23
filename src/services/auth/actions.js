import { AUTH, WORKOUT, COMMON } from "constants/types"
import { api, authApi, formData } from "utils"
import { filterErrorMsg } from "utils/filter_factory"

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

// Create User Profile
export const createUserProfile = (profile) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/profiles`,
      data: formData(profile),
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: res.profile,
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Image Liked/Dislike Operation
export const likeProfileImage = (profileId, imageId) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/profiles/like`,
      data: { profileId: profileId, imageId: imageId },
    }
    return authApi(data)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

export const dislikeProfileImage = (profileId, imageId, userId) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/profiles/unlike`,
      data: { profileId: profileId, imageId: imageId },
    }
    return authApi(data)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Give rate to trainer
export const giveRateToTrainer = (profileId, rate, workoutId, rerate) => {
  return (dispatch) => {
    let data = {
      method: rerate?"put":"post",
      url: `/profiles/ratings`,
      data: { trainerProfileId: profileId, rating: rate },
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: WORKOUT.ADD_RATE,
          payload: { rate: rate, workoutId: workoutId },
        })
        return res
      })
      .catch((err) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'error',
            message: err.data.errors.msg
          }
        })
        throw err
      })
  }
}

// Edit Profile
export const editUserProfile = (profile) => {
  return (dispatch) => {
    let data = {
      method: "put",
      url: `/profiles`,
      data: formData(profile),
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: res.profile,
        })
        return res
      })
      .catch((err) => {
        throw err
      })
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

// Remove Gallery Image
export const removeProfileImage = (imageId) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/profiles/remove-gallery-item?imageId=${imageId}`,
    }
    return authApi(data)
      .then((res) => {
        if (!res.error) {
          dispatch({
            type: AUTH.REMOVE_GALLERY,
            payload: imageId,
          })
          return res
        } else {
          throw new Error("Auth Failed")
        }
      })
      .catch((err) => {
        throw err
      })
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

// Login
export const login = (obj) => (dispatch) =>
  api
    .post("/login", obj)
    .then((res) => {
      if(res.code === 200) {
        dispatch({
          type: AUTH.SIGNED_IN,
        })
        window.localStorage.setItem("accessToken", res.user.token)
      } else {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'info',
            message: res.message
          }
        })
      }
      return res
    })
    .catch((err) => {
      dispatch({
        type: COMMON.TOSTIFY_ALERT,
        payload: {
          type: 'error',
          message: err.data.errors.msg
        }
      })
      throw err
    })

//Reigster
export const register = (obj, type) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/pt-${type}-sign-up`,
      data: obj,
    }
    return api(data)
      .then((res) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'success',
            message: res.message
          }
        })

        // window.localStorage.setItem("accessToken", res.user.token)
        return res
      })
      .catch((err) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'error',
            message: filterErrorMsg(err.data.errors)
          }
        })
        throw err
      })
  }
}

// Resend Email Verification
export const sendEmailAgain = (email) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/resend-email`,
      data: {email}
    }

    return api(data).then((res) => {
      dispatch({
        type: COMMON.TOSTIFY_ALERT,
        payload: {
          type: 'success',
          message: res.message
        }
      })
    })
  }
}

// Email Verification Callback
export const emailVerify = (obj) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/email-verify`,
      data: obj,
    }
    return api(data)
      .then((res) => {
        dispatch({
          type: AUTH.SIGNED_IN,
        })
        dispatch({
          type: AUTH.USER_INFO,
          payload: res.user,
        })

        window.localStorage.setItem("accessToken", res.user.token)
        return res
      })
      .catch((err) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'error',
            message: err.data.errors.msg
          }
        })
        throw err
      })
  }
}

// Get User Workouts
export const getUserWorkouts = () => {
  let data = {
    method: "get",
    url: `/workouts/user-registered-workouts`,
  }
  return authApi(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

// Get User Billings
export const getUserbillings = () => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/payments`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: AUTH.PAYMENTS,
          payload: res
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Get user account
export const getUserAccount = () => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/user`,
    }
    return authApi(data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        throw err
      })
  }
}

// Change Password
export const changePassword = (new_password) => {
  return (dispatch) => {
    let data = {
      method: "put",
      url: `/user`,
      data: { user: new_password },
    }
    return authApi(data)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Forgot Password
export const forgotPassword = (email) => {
  return (dispatch) => {
    let data = {
      method: "post",
      url: `/reset-password`,
      data: email,
    }
    return api(data)
      .then((res) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'success',
            message: res.message
          }
        })
        return res
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'error',
            message: err.data.errors.msg
          }
        })
        throw err
      })
  }
}

// Reset Password
export const resetPassword = (obj) => {
  return (dispatch) => {
    let data = {
      method: "put",
      url: `/change-password`,
      data: obj,
    }
    return api(data)
      .then((res) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'success',
            message: res.message
          }
        })
        return res
      })
      .catch((err) => {
        dispatch({
          type: COMMON.TOSTIFY_ALERT,
          payload: {
            type: 'error',
            message: err.data.errors.message
          }
        })
        throw err
      })
  }
}

// Get Trainer List
export const getTrainerList = () => {
  let data = {
    method: "get",
    url: `/profiles/view-trainers`,
  }
  return api(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      throw err
    })
}

//Removing the Auth token from Local Storage. 
export const logOut = () => {
  window.localStorage.removeItem("accessToken")
  window.localStorage.removeItem("remember")
  window.localStorage.removeItem("email")
  window.localStorage.removeItem("password")
  return (dispatch) => {
    dispatch({
      type: AUTH.SIGNED_OUT,
    })
  }
}

export const openLoginModal = () => {
  return (dispatch) => {
    dispatch({ type: AUTH.OPEN_LOGIN_MODAL })
  }
}

export const closeLoginModal = () => {
  return (dispatch) => {
    dispatch({ type: AUTH.CLOSE_LOGIN_MODAL })
  }
}

export const openForgotPwdModal = () => {
  return (dispatch) => {
    dispatch({ type: AUTH.OPEN_FORGOT_PASSWORD_MODAL })
  }
}

export const closeForgotPwdModal = () => {
  return (dispatch) => {
    dispatch({ type: AUTH.CLOSE_FORGOT_PASSWORD_MODAL })
  }
}
