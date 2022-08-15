import React from 'react';
import { FilteredTableRowPropTypes } from '../table.types';
import { RandomDate, RandomLine, CustomRule, RandomLetters } from './FilteredRowItems'

function FilteredTableRow({ name, rowName, searchName, rule, itemName, mainName, attributeTypeCode, parameter , logicalName }: FilteredTableRowPropTypes) {

  if (rule === "Random letters" || rule === "Random letter" || rule === "Line" || rule === 14) {
    return <RandomLetters logicalName={logicalName} parameter={parameter} max={15} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "Random date" || rule === 2 || rule === "BirthDay dates") {
    return <RandomDate parameter={parameter} logicalName={logicalName} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "Multi line" || rule === 7) {
    return <RandomLetters logicalName={logicalName} parameter={parameter} max={52} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "Custom rule") {
    return <CustomRule parameter={parameter} logicalName={logicalName} attributeTypeCode={attributeTypeCode} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "List") {
    return <RandomLine parameter={parameter} logicalName={logicalName} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else {
    return <div></div>;
  }

}

export default FilteredTableRow