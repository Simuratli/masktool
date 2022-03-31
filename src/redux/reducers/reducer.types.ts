import { NotificationStateTypes } from './notification/notification.action.type'
import { StepStateTypes } from './stepper/stepper.types'

export interface ReducerType {
    notificationReducer: NotificationStateTypes,
    stepReducer: StepStateTypes
}