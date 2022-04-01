import { Button, Input } from '../../../../components'
import React from 'react'

function MaskRulesRightActions() {
    return (
        <div className="masking__rules__right__actions">
            <Button disabled={true} type='outlined' size='small' text="Validate" />
            <div className="masking__rules__right__actions__input">
                <Input disabled={true} stil="together" type='text' placeholder='Create name' name='name' />
                <Button disabled={true} type="together" size='small' text="Save As New" />
            </div>
            <Button disabled={true} size='small' text="Save Changes" />
        </div>
    )
}

export default React.memo(MaskRulesRightActions)