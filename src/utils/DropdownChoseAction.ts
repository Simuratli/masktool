export const choseActionForRecords = (name: string) => {
    let initialValues = {
        records: true,
        delete: false
    }

    switch (name) {
        case "all":
            return {
                ...initialValues,
                records: true
            }
        case "special":
            return {
                ...initialValues,
                records: false
            }
        case "delete":
            return {
                ...initialValues,
                delete: true
            }
        case "masking":
            return {
                ...initialValues,
                delete: false
            }
        default:
            return initialValues;
    }

}