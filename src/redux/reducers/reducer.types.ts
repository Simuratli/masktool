import { NotificationStateTypes } from './notification/notification.action.type';
import { StepStateTypes } from './stepper/stepper.types';
import { MultipleSelectStateTypes } from './multipleselect/multipleSelect.types';
import { CodeEditorStateTypes } from './codeEditor/codeeditor.types';
import { ModalStateTypes } from './modal/modal.reducer.types';
import { LoaderReducerStateType } from './loader/loader.reducer.types';
import { DefaultTasksStateTypes } from './backend-reducers/default-tasks/default-tasks.types';
import { GetEntitiesReducerStateTypes } from './backend-reducers/get-entities/get-entities.types';
import { EntityByViewStateTypes } from './backend-reducers/entity-by-view/entity-by-view.types';
export interface ReducerType {
    notificationReducer: NotificationStateTypes;
    stepReducer: StepStateTypes;
    multipleSelectReducer: MultipleSelectStateTypes;
    codeEditorReducer: CodeEditorStateTypes;
    modalReducer: ModalStateTypes;
    loaderReducer: LoaderReducerStateType;
    defaultTasksReducer: DefaultTasksStateTypes;
    getEntitiesReducer:GetEntitiesReducerStateTypes;
    getEntitiesByViewReducer:EntityByViewStateTypes;
}