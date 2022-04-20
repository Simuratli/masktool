import React from "react";
import { ToggleIcon, SuccessIcon, DeleteIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types'
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector } from 'react-redux';
import ProgressLoader from '../../ProgressLoader'
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon'

function DropdownHeader({ setToggle, name, actions, success }: DropdownHeaderPorpTypes) {
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step)


    return (
        <div className={`dropdown__header ${success}`}>
            <h1 onClick={() => { setToggle((prev: boolean) => !prev); }}>
                <SuccessIcon success={success} />
                <span>{name}</span>
            </h1>
            <p onClick={() => { setToggle((prev: boolean) => !prev); }}>
                {stepState === "progress" ? <ProgressLoader bgcolor="#80BB5B" completed={50} /> : <span>{actions}</span>}
            </p>
            <DropdownHeaderToggleIcon setToggle={setToggle} />
        </div>
    );
}

export default React.memo(DropdownHeader);
