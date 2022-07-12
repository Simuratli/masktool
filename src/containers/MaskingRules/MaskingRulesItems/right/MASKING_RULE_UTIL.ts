export const DropdownDataForSaved = async (customRuleArray: any[], attributeTypeCode: number) => {
    switch (attributeTypeCode) {
        case 14:
            return customRuleArray.filter((item) => item.name === "Line");
        case 7:
            return customRuleArray.filter((item) => item.name === "Multi line")
        case 2:
            return customRuleArray.filter((item) => item.name === "Date Type")
        default:
            return customRuleArray;
    }
}