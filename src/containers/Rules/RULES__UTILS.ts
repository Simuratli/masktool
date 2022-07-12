import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export const awaitForMainLoop = async (defaultTasksState: DefaultTasksTypes[], entityName: string, successRecords: number, totalRecords: number, taskStatus: number, statusRequest: any, resolve: any, interval: any, errorMessage: string) => {

    defaultTasksState.map((task) => {
        if (task.entityName === entityName) {
            task.successRecords = successRecords
            task.totalRecords = totalRecords

            if (taskStatus === 2) {
                task.errorMessage = true
                task.errortext = errorMessage
            }

            if (taskStatus === 3) {
                task.errorMessage = false
            }

            if (taskStatus === 1 || taskStatus === 0) {
                task.errorMessage = null
            }

            if (!statusRequest.some((value: any) => value.taskStatus === 0 || value.taskStatus === 1)) {
                resolve('foo');
                clearInterval(interval)
            }
        }
    })
    return defaultTasksState
}



export const makeMapForViews = (viewArray: any[], defaultTaskArray: any[], entity: any, requestSecond: any) => {


}