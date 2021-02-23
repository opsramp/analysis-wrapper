import { combineReducers } from "redux"
import AuthReducer from "./auth/reducer"
import StripeReducer from "./stripe/reducer"
import WorkoutReducer from "./workouts/reducer"
import CommonReducer from "./common/reducer"
import instaReducer from "./feed/reducer"
import fundsReducer from "./fund/reducer"


const reducer = combineReducers({
  auth: AuthReducer,
  stripe: StripeReducer,
  workouts: WorkoutReducer,
  common: CommonReducer,
  insta: instaReducer,
  funds: fundsReducer
})

export default reducer
