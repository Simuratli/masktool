import React, { useState, useCallback } from 'react';
import { TableRowPropTypes } from '../table.types';
import TableCell from './TableCell';
import FilteredTableRow from './FilteredTableRow'
import Select from '../../Select';
import Dot from '../../Dot';
import { useSelector } from 'react-redux'
import { ReducerType } from '../../../redux/reducers/reducer.types'

function TableRow({ mask, name }: TableRowPropTypes) {

    let example_select_data = ["Random letters", "List", "Email", "Custom", "Clear", "Address", "Custom date"]
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)

    const [selectedRule, setSelectedRule] = useState({
        name: customRulesState.rules[0].name,
        attributeTypeCode: customRulesState.rules[0].attributeTypeCode
    })


    const SelectRule = useCallback(
        (e) => {
            let attributeTypeCodeVariable = 0
            customRulesState.rules.map((rule) => {
                if (e === rule.name) {
                    attributeTypeCodeVariable = rule.attributeTypeCode
                }
                return attributeTypeCodeVariable
            })
            setSelectedRule((previous) => ({
                ...previous,
                name: e,
                attributeTypeCode: attributeTypeCodeVariable
            }))
        },
        [],
    )


    return (
        <div className='table__row'>
            <TableCell>
                <div className="table__cell__name">{name}</div>
            </TableCell>
            <TableCell>
                <Select onChange={SelectRule} data={customRulesState.names} placeholder={selectedRule.name} type="big" />
            </TableCell>
            <TableCell>
                <FilteredTableRow attributeTypeCode={selectedRule.attributeTypeCode} />
            </TableCell>
            <TableCell>
                <div className="table__cell__dot"><Dot type={mask} /></div>
            </TableCell>
            <TableCell>
                <div className="table__cell__chosen">8 symbols</div>
            </TableCell>
        </div>
    )
}

export default React.memo(TableRow)