import React from 'react'
import { Header } from '../../components'
import { MaskingRulesLeft, MaskingRulesRight } from './MaskingRulesItems'
import { TutorialDropdown } from '../'

function MaskingRules() {
    return (
        <div className='masking__rules'>
            <TutorialDropdown/>
            <Header text={"How to create custom parameters."} headerType="big" />
            <div className="masking__rules__container">
                <MaskingRulesLeft />
                <MaskingRulesRight />
            </div>
        </div>
    )
}

export default React.memo(MaskingRules)