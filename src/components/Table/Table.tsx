import React from 'react';
import { TableHeader, TableRow } from './elements';
import { TablePropTypes } from './table.types';

function Table({ fields, name, searchName, mainName, etc, logicalName }: TablePropTypes) {

  return (
    <div className='table'>
      <TableHeader logicalName={logicalName} etc={etc} name={name} searchName={searchName} mainName={mainName} />
      {fields.length !== 0 ? fields.map((field: any) => {
        if (field.attributeTypeCode === 14 || field.attributeTypeCode === 2 || field.attributeTypeCode === 7) {
          return <TableRow logicalName={logicalName} parameter={field.parameters} requiredLevel={field.requiredLevel} attributeTypeCode={field.attributeTypeCode} value={field.value} mainName={mainName} rowName={name} searchName={searchName} rule={field.rule ? field.rule : field.attributeTypeCode} name={field.displayName ? field.displayName : field.logicalName} mask="nomask" />
        }
      })
        : <div className='table__nodata'>NO DATA</div>
      }

    </div>
  )
}

export default Table