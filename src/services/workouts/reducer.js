import { WORKOUT } from "constants/types"

const initState = {
  workoutSessions: [],
}

const WorkoutReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case WORKOUT.WORKOUT_SESSIONS:
      return {
        ...state,
        workoutSessions: payload,
      }
    
    case WORKOUT.DELETE_SESSION:
      return {
        ...state,
        workoutSessions: state.workoutSessions.filter((ws) => ws._id !== payload),
      }
    
    case WORKOUT.REFUND_WORKOUT:
      return {
        ...state,
        workoutSessions: state.workoutSessions.filter((ws) => ws.paymentUniqueId !== payload),
      }

    case WORKOUT.UPDATE_SESSION:
      return {
        ...state,
        workoutSessions: state.workoutSessions.map((ws) => {
          if(ws._id === payload._id)
            return {...ws, ...payload}
          
          return ws
        }),
      }

    case WORKOUT.ADD_RATE:
      const { rate, workoutId } = payload
      const newRate = { userGivenRating: rate, userId: null }

      return {
        ...state,
        workoutSessions: state.workoutSessions.map((ws) => {
          if (ws._id === workoutId)
            return {
              ...ws,
              trainerDetails: {
                ...ws.trainerDetails,
                ratingDetails: [...ws.trainerDetails.ratingDetails, newRate],
              },
            }

          return ws
        }),
      }

    default:
      return state
  }
}

export default WorkoutReducer
