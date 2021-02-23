import { STRIPE } from "constants/types"
import { api, authApi, formData } from "utils"

export const openStripeModal = (workout) => {
  return (dispatch) => {
    dispatch({ type: STRIPE.OPEN_STRIPE_MODAL, payload: workout })
  }
}

export const closeStripeModal = () => {
  return (dispatch) => {
    dispatch({ type: STRIPE.CLOSE_STRIPE_MODAL })
  }
}

export const getSecret = async (amount, userId, workoutId) => {
  return await authApi.post("/workouts/payment", {
    amount:amount,
    userId: userId,
    workoutId: workoutId,
  }).then((res) => {
    return { success: true, key: res.key}
  })
  .catch((err) => {
    return { success: false, error: err.data.errors.msg}
  })
}

export const workoutPayment = (
  workoutId,
  paymentId,
  userId,
  userProfileId,
  trainerId,
  trainerProfileId,
  amount
) => {
  return (dispatch) => {
    return authApi
      .post("/workouts/add-user", {
        workoutId: workoutId,
        StripesPaymentId: paymentId,
        participantsUserId: userId,
        participantsProfileId: userProfileId,
        TrainersUserId: trainerId,
        TrainersProfileId: trainerProfileId,
        amountPaid: amount,
      })
      .then((res) => {
        return { success: true, msg: res.msg }
      })
      .catch((err) => {
        return { success: false, msg: err.data.errors.msg }
      })
  }
}

export const addUserToWorkout = (workoutId, paymentId, userId) => {
  return (dispatch) => {
    return authApi
      .post("/workouts/add-user", {
        workoutId: workoutId,
        paymentId: paymentId,
        userId: userId,
      })
      .then((res) => {
        return { success: true, msg: res.msg }
      })
      .catch((err) => {
        return { success: false, msg: err.data.errors.msg }
      })
  }
}
