import React from 'react';
import { FilteredTableRowPropTypes } from '../table.types';
import { RandomDate, RandomLine, CustomRule, RandomLetters } from './FilteredRowItems'

function FilteredTableRow({ name, rowName, searchName, rule, itemName, mainName , attributeTypeCode}: FilteredTableRowPropTypes) {

  if (rule === "RandomLetters" || rule === "RandomLetter" || rule === 14) {
    return <RandomLetters itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "RandomDate" || rule === 2 || rule === "BirthDay Dates") {
    return <RandomDate itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "MultiLine" || rule === 7) {
    return <RandomLetters itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "CustomRule") {
    return <CustomRule attributeTypeCode={attributeTypeCode} itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else if (rule === "RandomLine") {
    return <RandomLine itemName={itemName} searchName={searchName} mainName={mainName} rowName={rowName} />
  }
  else {
    return <div></div>;
  }

}

export default FilteredTableRow