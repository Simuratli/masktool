import { EntityByViewCellsType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types'
import { DefaultTasksFieldsTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'

export interface DropdownCheckedTypes {
    records: boolean,
}


export interface DropdownHeaderPropsTypes {
    checked: DropdownCheckedTypes,
    setChecked: React.Dispatch<React.SetStateAction<DropdownCheckedTypes>>;
    filter: string[];
    name: string;
    deleteOrMask?: boolean;
    selectData: string[];
    records: boolean;
    logicalName: string | undefined
}


export interface MultitableContainerPropTypes {
    name: string;
    fields: EntityByViewCellsType[] | DefaultTasksFieldsTypes[];
    deleteOrMask?: boolean,
    mainName: string;
    searchName?: string;
    etc: number;
    errorText?: string;
    logicalName: string | undefined;
    filter:string[];
    id: string
}