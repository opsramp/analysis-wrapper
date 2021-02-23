import { STRIPE } from "constants/types"

const initState = {
  toggleStripeModal: false,
  selectedWorkout: {},
}

const StripeReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case STRIPE.OPEN_STRIPE_MODAL:
      return {
        ...state,
        toggleStripeModal: true,
        selectedWorkout: payload,
      }

    case STRIPE.CLOSE_STRIPE_MODAL:
      return {
        ...state,
        toggleStripeModal: false,
        selectedWorkout: {},
      }

    default:
      return state
  }
}

export default StripeReducer
