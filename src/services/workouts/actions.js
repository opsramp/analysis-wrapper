import { WORKOUT, AUTH } from "constants/types"
import { api, authApi, formData } from "utils"

// Get Workout for Dashboard
export const getAllWorkOuts = () => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts`,
    }
    return api(data)
      .then((res) => {
        dispatch({
          type: WORKOUT.WORKOUT_SESSIONS,
          payload: res.workouts?res.workouts.filter((wo) => wo.status === "active"):[],
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Create Workout Session
export const createOrSaveWorkout = (workout, id) => {
  return (dispatch) => {
    let data = {
      method: id ? "put" : "post",
      url: `/workouts${id ? "?workoutId=" + id : ""}`,
      data: workout,
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

// Get User Workouts
export const getUserWorkouts = () => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts/user-registered-workouts`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: WORKOUT.WORKOUT_SESSIONS,
          payload: res.workouts || [],
        })
      })
      .catch((err) => {
        throw err
      })
  }
}

// Get Workout Sessions
export const getWorkOutSessions = (id) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts?personalTrainerId=${id}`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: WORKOUT.WORKOUT_SESSIONS,
          payload: res.workouts || [],
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Get Workout By Id
export const getWorkoutById = (id) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts/workout?workoutId=${id}`,
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

// Search Workout
export const searchWorktout = (keyword) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts/workout?workoutId=${keyword}`,
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

// Delete Workout Session
export const cancelWorkoutSession = (id) => {
  return (dispatch) => {
    let data = {
      method: "get",
      url: `/workouts/delete?workoutId=${id}`,
    }
    return authApi(data)
      .then((res) => {
        dispatch({
          type: WORKOUT.DELETE_SESSION,
          payload: id,
        })
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}

// Request Refund For Workout
export const refundForWorkout = (workoutId, paymentId, isDelete) => {
  return (dispatch) => {
    let data = {
      method: "put",
      url: `/workouts/remove-user`,
      data: {workoutId: workoutId, paymentUniqueId: paymentId}
    }

    return authApi(data)
      .then((res) => {
        if(isDelete)
          dispatch({
            type: WORKOUT.REFUND_WORKOUT,
            payload: paymentId,
          })
        else {
          dispatch({
            type: WORKOUT.UPDATE_SESSION,
            payload: res.workout,
          })
          dispatch({
            type: AUTH.REMOVE_PAYMENTS,
            payload: paymentId,
          })
        }
      
        return res
      })
      .catch((err) => {
        throw err
      })
  }
}
