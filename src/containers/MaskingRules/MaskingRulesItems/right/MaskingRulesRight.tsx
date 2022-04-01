import React from 'react'
import { CodeEditor, Button } from '../../../../components'
import MaskRulesRightActions from './MaskRulesRightActions'
import MaskingRulesRightSelections from './MaskingRulesRightSelections'
import MaskingRulesSavedItems from './MaskingRulesSavedItems'

function MaskingRulesRight() {
  return (
    <div className='masking__rules__right'>
      <div className="masking__rules__right__container">
        <div className="masking__rules__right__actionbox">
          <MaskingRulesRightSelections />
          <CodeEditor />
          <MaskRulesRightActions />
        </div>
        <MaskingRulesSavedItems />
      </div>
      <div className="masking__rules__right__next">
        <Button text="Next" />
      </div>
    </div>
  )
}

export default React.memo(MaskingRulesRight)