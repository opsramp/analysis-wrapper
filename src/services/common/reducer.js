import { COMMON } from "constants/types"

const initState = {
  message: null,
  type: null,
  searchKey: {}
}

const CommonReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case COMMON.TOSTIFY_ALERT:
      return {
        ...state,
        message: payload.message,
        type: payload.type
      }

    case COMMON.TOSTIFY_ALERT_CLEAR:
      return {
        ...state,
        message: null,
        type: null
      }

    case COMMON.SET_SEARCH:
      return {
        message: null,
        type: null,
        searchKey: payload
      }

    default:
      return state
  }
}

export default CommonReducer
