import React from 'react'
import { BoxPropTypes } from './box.types'
function Box({ children, type }: BoxPropTypes) {
    return (
        <div className={`box ${type}`}>
            {children}
        </div>
    )
}

export default React.memo(Box)