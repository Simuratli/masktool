import { combineReducers } from 'redux';
import notificationReducer from './notification'
import stepReducer from './stepper'
import multipleSelectReducer from './multipleselect'

export default combineReducers({
    notificationReducer,
    stepReducer,
    multipleSelectReducer
})