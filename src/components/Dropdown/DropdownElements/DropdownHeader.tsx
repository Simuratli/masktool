/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { SuccessIcon } from "./icons";
import { DropdownHeaderPorpTypes } from '../Dropdown.types';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { useSelector, useDispatch } from 'react-redux';
import ProgressLoader from '../../ProgressLoader';
import DropdownHeaderToggleIcon from './elements/DropdownHeaderToggleIcon';
import { GetViewsByEntity } from '../../../api';
import { setViewsByEntity, setAllViewsByEntity } from '../../../redux/actions';
import { EntityByViewType } from '../../../redux/reducers/backend-reducers/entity-by-view/entity-by-view.types';
import { addDeleteOrMaskViaHeader } from '../../../utils/ViewsByEntityUtils'


function DropdownHeader({ setToggle, deleteOrMask, name, etc, actions, success }: DropdownHeaderPorpTypes) {
    const dispatch = useDispatch();
    const stepState = useSelector((state: ReducerType) => state.stepReducer.step);
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer.entities)

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
        let newViewByEntityState = addDeleteOrMaskViaHeader(viewsByEntityState, name, deleteOrMask)
        dispatch(setAllViewsByEntity(newViewByEntityState))
    }, [deleteOrMask])


    const scrollView = () => {
        console.log('scroll')
        let element: HTMLElement | null = document.getElementById(name)
        element && element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    return (
        <div id={name} onClick={scrollView} className={`dropdown__header ${success}`}>
            <h1 onClick={(e: any) => { setToggle((prev: boolean) => !prev); }}>
                <SuccessIcon success={success} />
                <span>{name}</span>
            </h1>
            <p onClick={(e) => { setToggle((prev: boolean) => !prev); window.scrollTo(0, 0) }}>
                {stepState === "progress" ? <ProgressLoader bgcolor="#80BB5B" completed={50} /> : <span>{actions}</span>}
            </p>
            <DropdownHeaderToggleIcon setToggle={setToggle} />
        </div>
    );
}

export default React.memo(DropdownHeader);
