import React from 'react'
import { MaskingRulesLeft, MaskingRulesRight } from './MaskingRulesItems'

function MaskingRules() {
    return (
        <div className='masking__rules'>
            {/* <Header text={"How to create custom parameters."} headerType="big" /> */}
            <div className="masking__rules__container">
                <MaskingRulesLeft />
                <MaskingRulesRight />
            </div>
        </div>
    )
}

export default React.memo(MaskingRules)