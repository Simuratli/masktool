
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgresItemPropTypes } from '../progress.types';
import { Dvider } from './';
import { setStep, setDefaultTasks, setProgressAdd, setPaginatedTasks, setAllViewsByEntity, setAllErroredTasks, setAllEntities, setAllVocabularies, getCustomRules, setLoader } from '../../../redux/actions';
import { getPaginatedData } from '../../../utils/pagiantionUtil'
import { defaultTaskAddETC } from '../../../utils/DefaultTaskETC'
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { DefaultTasksTypes } from '../../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import { GetEntities, GetDefaultTasks, GetAttributesByEntity, GetCustomRules, GetVocabularesList, GetTasksStatus } from '../../../api'

function getDifference(array1: DefaultTasksTypes[], array2: DefaultTasksTypes[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.entityName.toLowerCase() === object2.entityName.toLowerCase();
        });
    });
}


function PorgressItem({ icon, text, id, disabled }: ProgresItemPropTypes) {
    const dispatch = useDispatch();
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const stepState = useSelector((state: ReducerType) => state.stepReducer);


    const travelBetweenSteps = async () => {

        if (stepState.step !== 'progress' && stepState.step !== id) {
            // if (id === 'rules') {
            //     console.log(stepState, 'statattaa')
            //     if (count === 0) {
            //         await getEntitiesAndTasks()
            //     }
            // }
            !disabled && id !== "progress" && dispatch(setStep(id));
        }
    }

    useEffect(() => {
        if (stepState.step === 'rules') {
            defaultTasksState.tasks.map((task) => {
                task.errorMessage = null
                task.errortext = ''
                task.progress = 'NULL'
                task.filter = []
                task.records = true;
                if (task.maskOperation) {
                    task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                } else {
                    task.text = "You are going to delete all records."
                }
            })

            dispatch(setDefaultTasks(defaultTasksState.tasks))
        }
    }, [stepState.step])





    return (
        <>
            <div onClick={travelBetweenSteps} style={{ cursor: stepState.step !== "progress" ? "pointer" : "no-drop" }} className={`progress__item ${disabled && 'progress__item--disable'}`}>
                <span className='progress__item__text'>{text}</span>
                {icon}
            </div>
            {id !== "progress" && <Dvider />}
        </>
    )
}

export default React.memo(PorgressItem)