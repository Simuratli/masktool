import { DefaultTasksTypes } from '../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

let initialValues = {
    records: true,
}

export const choseActionForRecords = (name: string) => {
    switch (name) {
        case "all":
            initialValues = {
                ...initialValues,
                records: true
            }
            return initialValues
        case "special":
            initialValues = {
                ...initialValues,
                records: false
            }
            return initialValues
        default:
            return initialValues;
    }

}

export const choseDeleteOrMask = async (array: DefaultTasksTypes[], name: string, actionName: string) => {
    switch (actionName) {
        case "masking":
            return array.map((task: DefaultTasksTypes) => {
                if (task.entityName === name) {
                    task.maskOperation = false
                    task.text = "Delete"
                }
                return task
            })
        case "delete":
            return array.map((task: DefaultTasksTypes) => {
                if (task.entityName === name) {
                    task.maskOperation = true
                    task.text = `All Records ${task.fields.length} fields are masked`
                }
                return task
            })
        default:
            return array;
    }

}