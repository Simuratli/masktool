import { AGREE_WITH_NOTIFICATION, APPROVE_NOTIFICATION_AGREEMENT } from '../constants/notification'

export const setNotificationAllowance = (payload: boolean) => ({
    type: AGREE_WITH_NOTIFICATION,
    payload
})


export const setAproveNotificationAgreement = (payload: boolean) => ({
    type: APPROVE_NOTIFICATION_AGREEMENT,
    payload
})