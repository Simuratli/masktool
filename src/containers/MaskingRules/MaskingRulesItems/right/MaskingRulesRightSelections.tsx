import React from 'react'
import { Select, MultipleSelect } from '../../../../components'

function MaskingRulesRightSelections() {
    return (
        <div className="masking__rules__right__selectitems">
            <MultipleSelect />
            <Select />
        </div>
    )
}

export default React.memo(MaskingRulesRightSelections)