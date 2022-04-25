let initialValues = {
    records: true,
    delete: true
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




export const choseDeleteOrMask = async (array: any, name: string, actionName: string) => {
    switch (actionName) {
        case "masking":
            return array.map((task: any) => {
                if (task.entityName === name) {
                    task.delete = false
                }
                return task
            })
        case "delete":
            return array.map((task: any) => {
                if (task.entityName === name) {
                    task.delete = true
                }
                return task
            })
        default:
            return array;
    }

}