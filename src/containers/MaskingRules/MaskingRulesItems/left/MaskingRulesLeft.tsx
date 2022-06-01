import React from 'react'

function MaskingRulesLeft() {
  return (
    <div className='masking__rules__left'>
      <p>
        Custom masking rule is available for multiline and text fields.
      </p>
      <p>
        You need to specify a template in the input field to set your parameters. This template may contain:
      </p>
      <ul className='list'>
        <li>static text;</li>
        <li>an arbitrary sequence of functions;</li>
        <li>an arbitrary sequence of functions and static text.</li>
      </ul>
      <p className='note'>
        *Note. Specify the function inside curly brackets, and the function's parameters (like list names or numbers) — inside round brackets.
      </p>
    </div>
  )
}

export default React.memo(MaskingRulesLeft)