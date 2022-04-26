import React from 'react';
import { FilteredTableRowPropTypes } from '../table.types';

import { Input, Calendar } from '../../'

function FilteredTableRow({ attributeTypeCode }: FilteredTableRowPropTypes) {
  switch (attributeTypeCode) {
    case 14:
      return <Input className='filtered' placeholder="8 symbols" name="Name" type="text" />
    case 2:
      return <Calendar/>
    default:
      return <div></div>;
  }
}

export default React.memo(FilteredTableRow)