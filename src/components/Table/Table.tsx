import React from 'react';
import { TableHeader, TableRow } from './elements';

function Table() {
  return (
    <div className='table'>
      <TableHeader />
      <TableRow mask="nomask" />
      <TableRow mask="mask" />
      <TableRow mask="nomask" />
      <TableRow mask="nomask" />
      <TableRow mask="mask" />
      <TableRow mask="nomask" />
    </div>
  )
}

export default React.memo(Table)