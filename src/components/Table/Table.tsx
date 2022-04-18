import React from 'react';
import { TableHeader } from './elements';

function Table() {
  return (
    <div className='table'>
      <TableHeader />
    </div>
  )
}

export default React.memo(Table)