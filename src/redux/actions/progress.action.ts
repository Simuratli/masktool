import { PROGRESS_ADD, RESET_PROGRESS } from '../constants/progress';

export const setProgressAdd = (payload: number) => {
    return {
        type: PROGRESS_ADD,
        payload
    }
}


export const setProgressReset = () => {
    return {
        type: RESET_PROGRESS,
    }
}