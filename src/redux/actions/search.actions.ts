import { SEARCH } from '../constants/search'

export const setSearch = (payload: String) => ({
    type: SEARCH,
    payload
})