import React from 'react';
import { TableHeader, TableRow } from './elements';
import { TablePropTypes } from './table.types'

function Table({ fields }: TablePropTypes) {
  return (
    <div className='table'>
      <TableHeader />

      {fields.length !== 0 ? fields.map((field) => (
        <TableRow name={field.displayName ? field.displayName : field.logicalName} mask="mask" />
      ))
        : <div className='table__nodata'>NO DATA</div>
      }

    </div>
  )
}

export default React.memo(Table)