import { SEARCH } from '../../constants/search'
import { SearchReducerTypes, SearchStateTypes } from './search.types'

const initialState: SearchStateTypes = {
    search: "",
}

export const searchReducer = (state = initialState, action: SearchReducerTypes) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                search: action.payload
            }
        default:
            return { ...state }
    }
}   