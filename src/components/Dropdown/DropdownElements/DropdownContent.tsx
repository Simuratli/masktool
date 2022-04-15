import React from 'react'
import { Box } from '../../../containers'
import {DropdownContentPorpTypes} from '../Dropdown.types'

function DropdownContent({table}:DropdownContentPorpTypes) {
    return (
        <div className="dropdown__content">
            <div className="dropdown__content__head">
                <Box type='small'>
                    salam
                </Box>
            </div>

            <div className="dropdown__content__table">
                    {table}
            </div>
        </div>
    )
}

export default React.memo(DropdownContent)