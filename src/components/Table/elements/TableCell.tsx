import React from 'react'
import { TableCellPropTypes } from '../table.types'

function TableCell({ children }: TableCellPropTypes) {
    return (
        <div className='table__cell'>
            {children}
        </div>
    )
}

export default TableCell