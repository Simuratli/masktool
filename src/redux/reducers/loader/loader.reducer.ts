import { SET_TOGGLE_LOADER } from '../../constants/loader'
import { LoaderReducerStateType, LoaderActionType } from './loader.reducer.types'

const initialState: LoaderReducerStateType = {
    loading: true,
}

export const loaderReducer = (state = initialState, action: LoaderActionType) => {
    switch (action.type) {
        case SET_TOGGLE_LOADER:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return { ...state }
    }
}   