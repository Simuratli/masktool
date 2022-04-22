import { EntityByViewCellsType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'
import { DefaultTasksFieldsTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface DropdownCheckedTypes {
    records: boolean,
    delete: boolean
}


export interface DropdownHeaderPropsTypes {
    checked: DropdownCheckedTypes,
    setChecked: React.Dispatch<React.SetStateAction<DropdownCheckedTypes>>;
    filter: string[];
    setfilter: React.Dispatch<React.SetStateAction<string[]>>;
    name: string;
    selectData: string[]
}


export interface MultitableContainerPropTypes {
    name: string;
    fields: EntityByViewCellsType[] | DefaultTasksFieldsTypes[]
}