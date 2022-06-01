import React, { useCallback, useEffect } from 'react';
import { Box } from '../../../containers';
import { RadioButton, Table } from '../..';
import { MultitableContainerPropTypes } from './DropdownContent.types';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { setAllViewsByEntity, prepareEntitiesForDelete, prepareEntitiesForDeleteItemsFromArray, prepareEntitiesForDeleteItemsPutThemAll } from '../../../redux/actions';
import { addDeleteOrMaskIndividual } from '../../../utils/ViewsByEntityUtils';
import { prepareCells } from '../../../utils/run.utils';


function MultitableContainer({ mainName, name, fields, deleteOrMask, searchName, etc }: MultitableContainerPropTypes) {

    const dispatch = useDispatch()
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer)
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);

    useEffect(() => {

        viewsByEntityState.entities.map((view) => {
            if (view.name === mainName) {
                view.data.map(async (item) => {
                    if (item.name === name) {
                        if (item.maskOperation) {
                            let newCells = await prepareCells(item.cells)
                            dispatch(prepareEntitiesForDelete({
                                entityName: mainName,
                                maskOperation: item.maskOperation,
                                filterViewId: item.viewId,
                                fields: newCells
                            }))
                        } else {
                            dispatch(prepareEntitiesForDelete({
                                entityName: mainName,
                                maskOperation: item.maskOperation,
                                filterViewId: item.viewId,
                            }))
                        }

                    }
                })
            }
        })


        return () => {

            viewsByEntityState.entities.map((view) => {
                if (view.name === mainName) {
                    view.data.map((item) => {
                        if (item.name === name) {
                            dispatch(prepareEntitiesForDeleteItemsFromArray(item.viewId))
                        }
                    })
                }
            })

        };

    }, [viewsByEntityState.entities, deleteOrMask])



    const handleSelectFilter = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            let newViewsByEntities = await addDeleteOrMaskIndividual(viewsByEntityState.entities, e.target.name, mainName, name)
            dispatch(setAllViewsByEntity(newViewsByEntities))
        },
        [viewsByEntityState, mainName, name],
    )



    return (
        <div className='multitable_container'>
            <Box type='small-multiple'>
                <div className="dropdown__box__container">
                    <div className="dropdown__box__container__main">
                        <span className="dropdown__box__container__main__text">{name}</span>
                    </div>
                    <div className="dropdown__box__container__actions">
                        <RadioButton name="delete" color="green" checked={typeof deleteOrMask === "boolean" && !deleteOrMask} onChange={handleSelectFilter} label={"Delete"} />
                        <RadioButton name="masking" color="green" checked={typeof deleteOrMask === "boolean" && deleteOrMask} onChange={handleSelectFilter} label={"Maksing"} />
                    </div>
                </div>
            </Box>
            <Table etc={etc} name={name} mainName={mainName} searchName={searchName} fields={fields} />
        </div>
    )
}

export default MultitableContainer