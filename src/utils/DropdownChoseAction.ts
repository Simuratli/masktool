import { DefaultTasksTypes } from '../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

let initialValues = {
    records: true,
}

export const choseActionForRecords = async (name: string) => {
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

