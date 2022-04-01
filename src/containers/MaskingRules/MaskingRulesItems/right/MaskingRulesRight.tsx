import React from 'react'
import { Select, CodeEditor, Button, Input, MultipleSelect } from '../../../../components'

function MaskingRulesRight() {

  let FAKE_DATA = [
    {
      name: "Text rules",
      item: ["Custom 1", "Custom 2", "Custom 3"]
    },
    {
      name: "Data rules",
      item: ["Custom 6", "Custom 7", "Custom 9"]
    }
  ]

  return (
    <div className='masking__rules__right'>
      <div className="masking__rules__right__container">
        <div className="masking__rules__right__actionbox">
          <div className="masking__rules__right__selectitems">
            <MultipleSelect />
            <Select />
          </div>
          <CodeEditor />
          <div className="masking__rules__right__actions">
            <Button disabled={true} type='outlined' size='small' text="Validate" />
            <div className="masking__rules__right__actions__input">
              <Input disabled={true} stil="together" type='text' placeholder='Create name' name='name' />
              <Button disabled={true} type="together" size='small' text="Save As New" />
            </div>
            <Button disabled={true} size='small' text="Save Changes" />
          </div>
        </div>
        <div className="masking__rules__right__saved">
          <p className="masking__rules__right__saved__header">
            Your last saved parameters:

            {FAKE_DATA.map((data)=>{
              return <>
                  <p className="masking__rules__right__saved__main">{data.name}</p>
                  {data.item.map(item=>{
                    return <p className="masking__rules__right__saved__item">{item}</p>
                  })}
              </>
            })}
          </p>
        </div>
      </div>


      <div className="masking__rules__right__next">
        <Button text="Next" />
      </div>
    </div>
  )
}

export default React.memo(MaskingRulesRight)