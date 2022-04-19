import React, { useState, useCallback } from 'react';
import { TableRowPropTypes } from '../table.types';
import TableCell from './TableCell'
import Select from '../../Select'
import Dot from '../../Dot'

function TableRow({ mask }: TableRowPropTypes) {
    const [selectedRule, setselectedRule] = useState("List")

    let example_select_data = ["Random letters", "List", "Email", "Custom", "Clear"]


    const selectRule = useCallback(
        (event) => {
            setselectedRule(event.target.textContent)
        },
        [],
    )


    return (
        <div className='table__row'>
            <TableCell>
                <div className="table__cell__name">Field</div>
            </TableCell>
            <TableCell>
                <Select data={example_select_data} placeholder={selectedRule} type="big" />
            </TableCell>
            <TableCell>
                <Select placeholder='Names' type="big" />
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