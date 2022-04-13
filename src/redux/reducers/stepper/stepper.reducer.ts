import { CHANGE_STEP } from '../../constants/stepper'
import { StepReducerTypes,StepStateTypes } from './stepper.types'

const initialState: StepStateTypes = {
    step: "notifications",
}

export const stepReducer = (state = initialState, action: StepReducerTypes) => {
    switch (action.type) {
        case CHANGE_STEP:
            return {
                ...state,
                step: action.payload
            }
        default:
            return { ...state }
    }
}   