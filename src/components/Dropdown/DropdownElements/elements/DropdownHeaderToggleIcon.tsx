import React from 'react';
import { DeleteIcon, ToggleIcon, SuccessIcon } from '../icons';
import { DropdownHeaderToggleIconPropTypes } from '../../Dropdown.types';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../../redux/reducers/reducer.types'

function DropdownHeaderToggleIcon({ setToggle, name, requestResult }: DropdownHeaderToggleIconPropTypes) {

    const stepState = useSelector((state: ReducerType) => state.stepReducer);


    return (
        <div className="dropdown__header__icon">
            <div onClick={setToggle} className="dropdown__header__icon__border">
                <SuccessIcon success={requestResult !== undefined && requestResult} />
            </div>

            {
                stepState.step !== "progress" && <div className="dropdown__header__icon__delete__container">
                    <DeleteIcon name={name} />
                </div>
            }

        </div>
    )
}

export default React.memo(DropdownHeaderToggleIcon)