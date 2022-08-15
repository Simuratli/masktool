import { NotificationStateTypes } from './notification/notification.action.type';
import { StepStateTypes } from './stepper/stepper.types';
import { MultipleSelectStateTypes } from './multipleselect/multipleSelect.types';
import { CodeEditorStateTypes } from './codeEditor/codeeditor.types';
import { ModalStateTypes } from './modal/modal.reducer.types';
import { LoaderReducerStateType } from './loader/loader.reducer.types';
import { PaginationStateTypes } from './pagination/pagination.types'
import { DefaultTasksStateTypes, PaginatedStateTypes } from './backend-reducers/default-tasks/default-tasks.types';
import { GetEntitiesReducerStateTypes } from './backend-reducers/get-entities/get-entities.types';
import { EntityByViewStateTypes } from './backend-reducers/entity-by-view/entity-by-view.types';
import { CustomRulesStateTypes } from './backend-reducers/custom-rules/custom-rules.types';
import { GetVocabularyListStateTypes } from './backend-reducers/get-vocabulary-list/get-vocabulary-list.types';
import { ProgressStateTypes } from './progress/progress.types';
import { PreparedDeleteEntitesStateTypes } from './backend-reducers/prepare-delete/prepare-delete.types';
import { requestProgressStateTypes } from './backend-reducers/request-progress/requestProgress.types'
import { CustomParametersStateTypes } from './backend-reducers/custom-parameters/custom-parameter.types'
import {StableDataReducerStateTypes} from './backend-reducers/stablep-data/stable-data.types'
import {SearchStateTypes} from './search/search.types'
export interface ReducerType {
    notificationReducer: NotificationStateTypes;
    stepReducer: StepStateTypes;
    multipleSelectReducer: MultipleSelectStateTypes;
    codeEditorReducer: CodeEditorStateTypes;
    modalReducer: ModalStateTypes;
    loaderReducer: LoaderReducerStateType;
    defaultTasksReducer: DefaultTasksStateTypes;
    getEntitiesReducer: GetEntitiesReducerStateTypes;
    getEntitiesByViewReducer: EntityByViewStateTypes;
    customRulesReducer: CustomRulesStateTypes;
    vocabularyListReducer: GetVocabularyListStateTypes;
    paginationReducer: PaginationStateTypes,
    progressReducer: ProgressStateTypes,
    paginatedTasksdReducer: PaginatedStateTypes,
    preParedDeleteEntites: PreparedDeleteEntitesStateTypes,
    requestProgressReducer:requestProgressStateTypes;
    customParametersReducer:CustomParametersStateTypes,
    stableDataReducer:StableDataReducerStateTypes,
    erroredTaskReducer:DefaultTasksStateTypes,
    searchReducer:SearchStateTypes
}