import React from 'react';
import { DeleteIcon, ToggleIcon, SuccessIcon } from '../icons';
import { DropdownHeaderToggleIconPropTypes } from '../../Dropdown.types';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../../redux/reducers/reducer.types'

function DropdownHeaderToggleIcon({ setToggle, name, requestResult, insideViews, logicalName }: DropdownHeaderToggleIconPropTypes) {

    const stepState = useSelector((state: ReducerType) => state.stepReducer);
    console.log(requestResult, 'ssusuusususu', name)

    return (
        <div className="dropdown__header__icon">
            <div onClick={setToggle} className="dropdown__header__icon__border">
                {
                    insideViews === 0 ? <SuccessIcon noDrop={stepState.step === "progress" ? true : false} success={requestResult !== undefined && requestResult} /> : (requestResult === null && <SuccessIcon success={null} />)
                }
                {/* <SuccessIcon success={requestResult !== undefined && requestResult} /> */}
            </div>
            {
                stepState.step !== "progress" && <div className="dropdown__header__icon__delete__container">
                    <DeleteIcon logicalName={logicalName} name={name} />
                </div>
            }

        </div>
    )
}

export default React.memo(DropdownHeaderToggleIcon)