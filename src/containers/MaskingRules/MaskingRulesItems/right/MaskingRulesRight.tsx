import React from 'react'
import { Select, CodeEditor } from '../../../../components'

function MaskingRulesRight() {
  return (
    <div className='masking__rules__right'>
      <Select />
      <CodeEditor/>
    </div>
  )
}

export default React.memo(MaskingRulesRight)