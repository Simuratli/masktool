import { SELECT_ITEM_IN_MULTIPLE_SELECT } from '../constants/multipleselect'
import {MultipleSelectPayloadTypes} from '../reducers/multipleselect/multipleSelect.types'

export const setSelectMultipleItem = (payload:MultipleSelectPayloadTypes ) => ({
    type: SELECT_ITEM_IN_MULTIPLE_SELECT,
    payload
})