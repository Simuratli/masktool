import React, { useCallback, useEffect } from 'react';
import { Box } from '../../../containers';
import { RadioButton, Table } from '../..';
import { MultitableContainerPropTypes } from './DropdownContent.types';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setAllViewsByEntity } from '../../../redux/actions';
import { addDeleteOrMaskIndividual } from '../../../utils/ViewsByEntityUtils'

function MultitableContainer({ mainName, name, fields, deleteOrMask }: MultitableContainerPropTypes) {
    const dispatch = useDispatch()
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)



    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let newViewsByEntities = await addDeleteOrMaskIndividual(viewsByEntityState.entities, e.target.name, mainName, name)
            dispatch(setAllViewsByEntity(newViewsByEntities))
        },
        [viewsByEntityState, mainName, name],
    )



   

    return (
        <div className='multitable_container'>
            <Box type='small'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <span className="dropdown__box__container__main__text">{name}</span>
                    </div>
                    <div className="dropdown__box__container__actions">
                        <RadioButton name="delete" color="green" checked={typeof deleteOrMask === "boolean" && deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                        <RadioButton name="masking" color="green" checked={!deleteOrMask} onChange={handleSelectFilter} label={"Maksing"} />
                    </div>
                </div>
            </Box>
            <Table fields={fields} />
        </div>
    )
}

export default React.memo(MultitableContainer)