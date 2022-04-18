export interface DropdownCheckedTypes {
    records: boolean,
    delete: boolean
}

export interface DropdownHeaderPropsTypes {
    checked: DropdownCheckedTypes,
    setChecked: React.Dispatch<React.SetStateAction<DropdownCheckedTypes>>;
}