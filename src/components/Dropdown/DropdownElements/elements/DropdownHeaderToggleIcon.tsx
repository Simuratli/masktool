import React from 'react';
import { DeleteIcon, ToggleIcon, SuccessIcon } from '../icons';
import { DropdownHeaderToggleIconPropTypes } from '../../Dropdown.types';

function DropdownHeaderToggleIcon({ setToggle, name, requestResult }: DropdownHeaderToggleIconPropTypes) {
    console.log(requestResult,'requestResult')
    return (
        <div className="dropdown__header__icon">
            <div onClick={() => { setToggle((prev: boolean) => !prev); }} className="dropdown__header__icon__border">
                {
                    !requestResult ? <ToggleIcon /> : <SuccessIcon success={requestResult} />
                }
            </div>
            <div className="dropdown__header__icon__delete__container">
                <DeleteIcon name={name} />
            </div>
        </div>
    )
}

export default React.memo(DropdownHeaderToggleIcon)