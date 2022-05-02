import { DefaultTasksTypes } from '../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export const getPaginatedData = (data: DefaultTasksTypes[], current: number, range: number) => {
    const startIndex = current * range - range;
    const endIndex = startIndex + range;
    return data.slice(startIndex, endIndex)
};