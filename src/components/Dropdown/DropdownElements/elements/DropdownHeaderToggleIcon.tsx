import React from 'react';
import { DeleteIcon } from '../icons';
import { DropdownHeaderToggleIconPropTypes } from '../../Dropdown.types';

function DropdownHeaderToggleIcon({ setToggle, name }: DropdownHeaderToggleIconPropTypes) {
    return (
        <div className="dropdown__header__icon">
            <div className="dropdown__header__icon__delete__container">
                <DeleteIcon name={name} />
            </div>
        </div>
    )
}

export default React.memo(DropdownHeaderToggleIcon)