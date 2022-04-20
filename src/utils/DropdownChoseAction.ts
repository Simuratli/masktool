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
        case "delete":
            initialValues = {
                ...initialValues,
                delete: true
            }
            return initialValues
        case "masking":
            initialValues = {
                ...initialValues,
                delete: false
            }
            return initialValues
        default:
            return initialValues;
    }

}