import React, { useState, useCallback, useEffect } from 'react';
import { TableRowPropTypes } from '../table.types';
import TableCell from './TableCell';
import FilteredTableRow from './FilteredTableRow'
import Select from '../../Select';
import Dot from '../../Dot';
import { useSelector, useDispatch } from 'react-redux';
import { setAllViewsByEntity, setDefaultTasks } from '../../../redux/actions'
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { ruleFilterUtil, changeMaskingRule } from '../../../utils/FilteredTableRowUtils';
import TableChosenValue from './TableChosenValue'

function TableRow({ mask, name, rule, searchName, rowName, mainName, value, attributeTypeCode }: TableRowPropTypes) {
    const dispatch = useDispatch()
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const [selectedRule, setSelectedRule] = useState(customRulesState.rules[0].name)
    const [maskingRuleDropdownData, setmaskingRuleDropdownData] = useState<string[]>()

    useEffect(() => {
        console.log(attributeTypeCode, 'rule')
        if (attributeTypeCode === 14) {
            setmaskingRuleDropdownData(['RandomLine', 'RandomLetters', 'ClearValue', 'CustomRule'])
        } else if (attributeTypeCode === 2) {
            setmaskingRuleDropdownData(['RandomDate', 'CustomRule', 'ClearValue'])
        } else if (attributeTypeCode === 7) {
            setmaskingRuleDropdownData(['RandomLetters', 'RandomLine', 'ClearValue', 'CustomRule'])
        } else {
            setmaskingRuleDropdownData(['RandomLetters', 'RandomLine', 'Email', 'RandomDate', 'CustomRule', 'ClearValue'])
        }
    }, [attributeTypeCode])


    const SelectRule = useCallback(
        (e) => {
            setSelectedRule(e);

            let newMaskingRule = changeMaskingRule(searchName, defaultTasksState, viewsByEntityState, rowName, name, e, mainName)
            if (newMaskingRule.for === "entities") {
                dispatch(setDefaultTasks(newMaskingRule.data))
            } else {
                dispatch(setAllViewsByEntity(newMaskingRule.data))
            }
            console.log(newMaskingRule,'newMaskingRule')

            console.log(defaultTasksState,'defaultTasksState')
            console.log(viewsByEntityState,'viewsByEntityState')
        },
        [defaultTasksState, mainName, name, rowName, searchName, viewsByEntityState],
    )

    return (
        <div className='table__row'>
            <TableCell>
                <div className="table__cell__name">{name}</div>
            </TableCell>
            <TableCell>
                <Select onChange={SelectRule} data={maskingRuleDropdownData} placeholder={rule ? ruleFilterUtil(rule) : selectedRule} type="big" />
            </TableCell>
            <TableCell>
                <FilteredTableRow attributeTypeCode={attributeTypeCode} mainName={mainName} itemName={name} rule={rule} rowName={rowName} searchName={searchName} name={selectedRule} />
            </TableCell>
            <TableCell>
                <div className="table__cell__dot"><Dot type={mask} /></div>
            </TableCell>
            <TableCell>
                <TableChosenValue rule={rule} value={value} />
            </TableCell>
        </div>
    )
}

export default TableRow