import { SET_STABLE_ENTITIES, SET_STABLE_TASKS, SET_STABLE_DATA_MAIN_NAME, SET_STABLE_DATA_NAME, SET_STABLE_DATA_SEARCH_NAME, SET_STABLE_DATA_ETC } from '../../constants/backend-constants/stable-data';


export const setStableEntityByViews = (payload: any) => ({
    type: SET_STABLE_ENTITIES,
    payload
})

export const setStableDefaultTasks = (payload: any) => ({
    type: SET_STABLE_TASKS,
    payload
})


export const setStableMainName = (payload: string | undefined) => ({
    type: SET_STABLE_DATA_MAIN_NAME,
    payload
})

export const setStableSearchName = (payload: string | undefined) => ({
    type: SET_STABLE_DATA_SEARCH_NAME,
    payload
})

export const setStableName = (payload: string | undefined) => ({
    type: SET_STABLE_DATA_NAME,
    payload
})


export const setStableEtc = (payload: number) => ({
    type: SET_STABLE_DATA_ETC,
    payload
})