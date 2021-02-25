import { combineReducers } from "redux"
import AuthReducer from "./auth/reducer"
import CommonReducer from "./common/reducer"


const reducer = combineReducers({
  auth: AuthReducer,
  common: CommonReducer
})

export default reducer
