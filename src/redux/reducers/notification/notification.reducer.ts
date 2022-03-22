import { AGREE_WITH_NOTIFICATION, APPROVE_NOTIFICATION_AGREEMENT } from '../../constants/notification'
import { NotificationStateTypes, NotificationReducerTypes } from './notification.action.type'

const initialState: NotificationStateTypes = {
    agree: false,
    approveAgreement:false
}

export const notificationReducer = (state = initialState, action: NotificationReducerTypes) => {
    switch (action.type) {
        case AGREE_WITH_NOTIFICATION:
            return {
                ...state,
                agree: action.payload
            }
        case APPROVE_NOTIFICATION_AGREEMENT:
            return{
                ...state,
                approveAgreement:action.payload
            }
        default:
            return { ...state }
    }
}   