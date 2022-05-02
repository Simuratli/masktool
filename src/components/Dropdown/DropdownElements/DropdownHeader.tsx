/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { SuccessIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector, useDispatch } from 'react-redux';
import ProgressLoader from '../../ProgressLoader';
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon';
import { GetViewsByEntity } from '../../../api';
import { setViewsByEntity, setAllViewsByEntity } from '../../../redux/actions';
import { EntityByViewType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';
import { addDeleteOrMaskViaHeader } from '../../../utils/ViewsByEntityUtils';
import { ToggleIcon } from './icons'


function DropdownHeader({ setToggle, deleteOrMask, name, etc, actions, success }: DropdownHeaderPorpTypes) {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)

    let fetchViewsByEntityFunction = async () => {
        let viewsByEntity = await GetViewsByEntity(name, etc);
        viewsByEntity.map((view: EntityByViewType) => {
            view.delete = deleteOrMask
        })
        dispatch(setViewsByEntity({ name: name, data: viewsByEntity }))

    }

    useEffect(() => {
        fetchViewsByEntityFunction()
    }, [])

    useEffect(() => {
        let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState.entities, name, deleteOrMask)
        dispatch(setAllViewsByEntity(newViewByEntityState))
    }, [deleteOrMask])


    const scrollView = () => {
        let element: HTMLElement | null = document.getElementById(name)
        element && element.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    }


    return (
        <div id={name} onClick={scrollView} className={`dropdown__header ${success}`}>
            <h1 onClick={(e: any) => { setToggle((prev: boolean) => !prev); }}>
                <div onClick={() => { setToggle((prev: boolean) => !prev); }} className="dropdown__header__icon__border">
                    <ToggleIcon />
                </div>
                <SuccessIcon success={success} />
                <span>{name}</span>
            </h1>
            <p onClick={(e) => { setToggle((prev: boolean) => !prev); window.scrollTo(0, 0) }}>
                {stepState === "progress" ? <ProgressLoader bgcolor="#80BB5B" completed={50} /> : <span>{actions}</span>}
            </p>
            <DropdownHeaderToggleIcon name={name} setToggle={setToggle} />
        </div>
    );
}

export default DropdownHeader
