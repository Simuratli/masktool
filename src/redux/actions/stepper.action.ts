import { CHANGE_STEP } from '../constants/stepper'

export const setStep = (payload: String) => ({
    type: CHANGE_STEP,
    payload
})