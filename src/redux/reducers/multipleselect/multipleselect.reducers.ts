import { SELECT_ITEM_IN_MULTIPLE_SELECT } from '../../constants/multipleselect';
import { MultipleSelectActionTypes, MultipleSelectStateTypes } from './multipleSelect.types';

const initialState: MultipleSelectStateTypes = {
    data: [],
}

export const multipeSelectReducer = (state = initialState, action: MultipleSelectActionTypes) => {
    switch (action.type) {
        case SELECT_ITEM_IN_MULTIPLE_SELECT:
            if (action.payload.checked) {
                return {
                    ...state,
                    data: [...state.data, action.payload.data,]
                }
            }else{
                return {
                    ...state,
                    data: state.data.filter(word => word !== action.payload.data)
                }
            }
        default:
            return { ...state }
    }
}   