import { combineReducers } from 'redux';
import notificationReducer from './notification';
import stepReducer from './stepper';
import multipleSelectReducer from './multipleselect';
import codeEditorReducer from './codeEditor';
import modalReducer from './modal';
import loaderReducer from './loader';
import paginationReducer from './pagination';
import defaultTasksReducer from './backend-reducers/default-tasks';
import getEntitiesReducer from './backend-reducers/get-entities';
import getEntitiesByViewReducer from './backend-reducers/entity-by-view';
import customRulesReducer from './backend-reducers/custom-rules';
import vocabularyListReducer from './backend-reducers/get-vocabulary-list';
import progressReducer from './progress'
import paginatedTasksdReducer from './backend-reducers/paginated-tasks';
import preParedDeleteEntites from './backend-reducers/prepare-delete'
import requestProgressReducer from './backend-reducers/request-progress'
import customParametersReducer from './backend-reducers/custom-parameters'
import stableDataReducer from './backend-reducers/stablep-data'
import erroredTaskReducer from './erroredTasks'
import searchReducer from './search'

export default combineReducers({
    notificationReducer,
    stepReducer,
    multipleSelectReducer,
    codeEditorReducer,
    modalReducer,
    loaderReducer,
    defaultTasksReducer,
    getEntitiesReducer,
    getEntitiesByViewReducer,
    customRulesReducer,
    vocabularyListReducer,
    paginationReducer,
    progressReducer,
    paginatedTasksdReducer,
    preParedDeleteEntites,
    requestProgressReducer,
    customParametersReducer,
    stableDataReducer,
    erroredTaskReducer,
    searchReducer
})