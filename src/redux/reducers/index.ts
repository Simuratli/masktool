import { combineReducers } from 'redux';
import notificationReducer from './notification'
import stepReducer from './stepper'

export default combineReducers({
    notificationReducer,
    stepReducer
})