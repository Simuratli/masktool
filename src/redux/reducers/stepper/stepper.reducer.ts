import { CHANGE_STEP } from '../../constants/stepper'
import { StepReducerTypes } from './stepper.types'

const initialState: any = {
    step: "main",
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