import { FUNDS } from "constants/types"
import { authApi } from "utils"

// Get funds
export const getFundslist = (id) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/funds?trainerId=${id}`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: FUNDS.FETCH_FUNDS,
          payload: res || [],
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Get funds
export const getFundsOverview = (id) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/funds/overview?trainerId=${id}`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: FUNDS.FETCH_FUNDS_SUMMARY,
          payload: res || [],
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Create User Profile
export const fundWithdraw = (workoutId) => {
  return (dispatch, getState) => {
    const { auth } = getState()
    const profile = auth.profile

    let data = {
      method: "post",
      url: `/funds/withdraw/${workoutId}`,
      data: {},
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: FUNDS.FUND_WITHDRAW,
          payload: res,
        })
        dispatch(getFundslist(profile.userId))

        return res
      })
      .catch((err) => {
        console.log("err: ", err)
      })
  }
}
