import { combineReducers } from 'redux';
import notificationReducer from './notification'
import stepReducer from './stepper'
import multipleSelectReducer from './multipleselect'
import codeEditorReducer from './codeEditor'
import modalReducer from './modal'
import loaderReducer from './loader'
import defaultTasksReducer from './backend-reducers/default-tasks'

export default combineReducers({
    notificationReducer,
    stepReducer,
    multipleSelectReducer,
    codeEditorReducer,
    modalReducer,
    loaderReducer,
    defaultTasksReducer
})