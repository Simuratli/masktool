import { NotificationStateTypes } from './notification/notification.action.type'
import { StepStateTypes } from './stepper/stepper.types'
import { MultipleSelectStateTypes } from './multipleselect/multipleSelect.types'
import { CodeEditorStateTypes } from './codeEditor/codeeditor.types'
export interface ReducerType {
    notificationReducer: NotificationStateTypes,
    stepReducer: StepStateTypes,
    multipleSelectReducer: MultipleSelectStateTypes,
    codeEditorReducer: CodeEditorStateTypes
}