import { FUNDS } from "constants/types"

const initState = {
  fundsList: [],
}

const FundsReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case FUNDS.FETCH_FUNDS:
      return {
        ...state,
        fundsList: payload,
      }

    case FUNDS.FUND_WITHDRAW:
      return {
        ...state,
      }

    case FUNDS.FETCH_FUNDS_SUMMARY:
      return {
        ...state,
        summary: payload,
      }

    default:
      return state
  }
}

export default FundsReducer
