import {combineReducers} from "redux"

import user from "./userReducer"
import message from "./messageReducer"

export default combineReducers ({
	user, message
})