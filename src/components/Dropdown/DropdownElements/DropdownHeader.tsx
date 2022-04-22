/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { SuccessIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector, useDispatch } from 'react-redux';
import ProgressLoader from '../../ProgressLoader';
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon';
import { GetViewsByEntity } from '../../../api';
import { setViewsByEntity } from '../../../redux/actions';

function DropdownHeader({ setToggle, name, etc, actions, success }: DropdownHeaderPorpTypes) {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);

    let fetchViewsByEntityFunction = async () => {
        let viewsByEntity = await GetViewsByEntity(name, etc);
        dispatch(setViewsByEntity({ name: name, data: viewsByEntity }))
    }

    useEffect(() => {
        fetchViewsByEntityFunction()
    }, [])

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
