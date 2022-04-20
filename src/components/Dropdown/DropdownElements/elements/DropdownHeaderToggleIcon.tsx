import React from 'react';
import { ToggleIcon, DeleteIcon } from '../icons';
import { DropdownHeaderToggleIconPropTypes } from '../../Dropdown.types';

function DropdownHeaderToggleIcon({ setToggle }: DropdownHeaderToggleIconPropTypes) {
    return (
        <div className="dropdown__header__icon">
            <div onClick={() => { setToggle((prev: boolean) => !prev); }} className="dropdown__header__icon__border">
                <ToggleIcon />
            </div>
            <div className="dropdown__header__icon__delete__container">
                <DeleteIcon />
            </div>
        </div>
    )
}

export default React.memo(DropdownHeaderToggleIcon)