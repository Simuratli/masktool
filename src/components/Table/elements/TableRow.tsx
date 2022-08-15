import React, { useState, useCallback, useEffect } from 'react';
import { TableRowPropTypes } from '../table.types';
import TableCell from './TableCell';
import FilteredTableRow from './FilteredTableRow'
import Select from '../../Select';
import { useSelector, useDispatch } from 'react-redux';
import { setAllViewsByEntity, setDefaultTasks, prepareEntitiesForDeleteItemsPutThemAll } from '../../../redux/actions'
import { ReducerType } from '../../../redux/reducers/reducer.types';
import { ruleFilterUtil, changeMaskingRule } from '../../../utils/FilteredTableRowUtils';
import { prepareCells } from '../../../utils/run.utils';
import TableChosenValue from './TableChosenValue';

import Star from './requiredStar'

function TableRow({ mask, name, rule, searchName, rowName, mainName, value, attributeTypeCode, parameter, requiredLevel, logicalName }: TableRowPropTypes) {
    const dispatch = useDispatch()
    const customRulesState = useSelector((state: ReducerType) => state.customRulesReducer)
    const viewsByEntityState = useSelector((state: ReducerType) => state.getEntitiesByViewReducer);
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);
    const [selectedRule, setSelectedRule] = useState(customRulesState.rules[0].name)
    const erroredState = useSelector((state: ReducerType) => state.erroredTaskReducer);
    const [maskingRuleDropdownData, setmaskingRuleDropdownData] = useState<string[]>()
    const deleteEntitiesReducer = useSelector((state: ReducerType) => state.preParedDeleteEntites.delete);
    const [deleteRow, setdeleteRow] = useState(false)


    useEffect(() => {
        if (attributeTypeCode === 14) {
            if (requiredLevel === 1 || requiredLevel === 2) {
                setmaskingRuleDropdownData(['List', 'Random letters', 'Custom rule'])
            } else {
                setmaskingRuleDropdownData(['List', 'Random letters', 'Clear value', 'Custom rule'])
            }
        } else if (attributeTypeCode === 2) {
            if (requiredLevel === 1 || requiredLevel === 2) {
                setmaskingRuleDropdownData(['Random date', 'Custom rule',])
            } else {
                setmaskingRuleDropdownData(['Random date', 'Custom rule', 'Clear value'])
            }
        } else if (attributeTypeCode === 7) {

            if (requiredLevel === 1 || requiredLevel === 2) {
                setmaskingRuleDropdownData(['Random letters', 'List', 'Custom rule'])
            } else {
                setmaskingRuleDropdownData(['Random letters', 'List', 'Clear value', 'Custom rule'])
            }
        } else {
            if (requiredLevel === 1 || requiredLevel === 2) {
                setmaskingRuleDropdownData(['Random letters', 'List', 'Email', 'Random date', 'Custom rule'])
            } else {
                setmaskingRuleDropdownData(['Random letters', 'List', 'Email', 'Random date', 'Custom rule', 'Clear value'])
            }
        }
    }, [attributeTypeCode, requiredLevel])


    const SelectRule = useCallback(
        (e) => {

            defaultTasksState.tasks.map((task) => {
                console.log(task, 'allalal', mainName, logicalName)
                if (task.entityName.toLowerCase() === (mainName && mainName.toLowerCase()) || task.logicalName === logicalName) {
                    if (task.errorMessage) {
                        task.errorMessage = null
                        task.errortext = ''
                        if (task.filter.length !== 0) {
                            task.text = `You are going to edit fields in ${task.filter.join(', ')}`
                        } else {
                            if (task.maskOperation) {
                                task.text = `You are going to mask ${task.fields.length} fields in all records.`
                            } else {
                                task.text = `You are going to delete all records.`
                            }
                        }
                        dispatch(setDefaultTasks(defaultTasksState.tasks))
                    }
                }
            })

            viewsByEntityState.entities.map((view) => {
                if (view.name === (logicalName ? logicalName : mainName)) {
                    console.log(view, 'dsfsdfsdfsdfsdfsdfsdf view')
                    view.data.map((item) => {
                        if (item.name === rowName) {
                            if (item.errorMessage) {
                                item.errorMessage = null
                                item.errortext = ""
                                dispatch(setAllViewsByEntity(viewsByEntityState.entities));
                            }
                        }
                    })
                }
            })
            console.log(e, '2dasda')
            setSelectedRule(e);
            let newMaskingRule = changeMaskingRule(searchName, defaultTasksState, viewsByEntityState, rowName, name, e, logicalName ? logicalName : mainName)
            if (newMaskingRule.for === "entities") {
                dispatch(setDefaultTasks(newMaskingRule.data))
            } else {
                dispatch(setAllViewsByEntity(newMaskingRule.data))
            }

        },
        [defaultTasksState, dispatch, logicalName, mainName, name, rowName, searchName, viewsByEntityState],
    )


    useEffect(() => {
        let ruleNew: string = ruleFilterUtil(rule)

        let newMaskingRule = changeMaskingRule(searchName, defaultTasksState, viewsByEntityState, rowName, name, ruleNew, logicalName ? logicalName : mainName)
        if (newMaskingRule.for === "entities") {
            dispatch(setDefaultTasks(newMaskingRule.data))
        } else {

            dispatch(setAllViewsByEntity(newMaskingRule.data))
        }
        // SelectRule(ruleNew)
    }, [])




    const deleteIndividualItem = () => {
        if (searchName === 'views') {

            viewsByEntityState.entities.map((view) => {
                console.log(view.name, mainName, name, rowName, searchName, logicalName, 'anosenisilitom')
                if (view.name === mainName || view.name === logicalName) {
                    view.data.map(async (item) => {
                        if (item.name === rowName) {
                            let newCells = item.cells.filter((data) => data.displayName !== name)
                            let newPreparedCells = await prepareCells(newCells)

                            deleteEntitiesReducer.map((entity) => {
                                if (entity.entityName === mainName) {
                                    entity.cells = newPreparedCells
                                }
                            })

                            dispatch(prepareEntitiesForDeleteItemsPutThemAll(deleteEntitiesReducer))

                            item.cells = newCells
                            console.log(newCells, 'newcellls')
                        }
                    })
                }
            })

            setdeleteRow(true)

            setTimeout(() => {
                setdeleteRow(false)
            }, 100);
            dispatch(setAllViewsByEntity(viewsByEntityState.entities))
        }
        else {
            defaultTasksState.tasks.map((task) => {
                if (task.entityName === rowName) {
                    let newFields = task.fields.filter((item) => item.displayName !== name);
                    task.fields = newFields
                    task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.`
                }
            })
            dispatch(setDefaultTasks(defaultTasksState.tasks))
        }





    }


    return (
        <>
            {!deleteRow && <div className='table__row'>
                <TableCell>
                    <div className="table__cell__name">{requiredLevel === 1 || requiredLevel === 2 ? <Star /> : ''}{name}</div>
                </TableCell>
                <TableCell>
                    <Select selectedValueForRule={ruleFilterUtil(rule)} onChange={SelectRule} data={maskingRuleDropdownData} placeholder={ruleFilterUtil(rule)} type="big" />
                </TableCell>

                <TableCell>
                    <FilteredTableRow logicalName={logicalName} parameter={parameter} attributeTypeCode={attributeTypeCode} mainName={mainName} itemName={name} rule={ruleFilterUtil(rule)} rowName={rowName} searchName={searchName} name={selectedRule} />
                </TableCell>
                {/* <TableCell>
                <div className="table__cell__dot"><Dot type={mask} /></div>
            </TableCell> */}
                <TableCell>
                    <TableChosenValue rule={ruleFilterUtil(rule)} value={value} />
                </TableCell>
                <div style={{ position: 'absolute', right: 60 }}>
                    <svg onClick={deleteIndividualItem} className="dropdown__header__icon__delete" width="16.44" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.22222 0C9.76269 0 11.0216 1.20574 11.1065 2.72496L11.1111 2.88889H15.7778C16.146 2.88889 16.4444 3.18737 16.4444 3.55556C16.4444 3.89306 16.1936 4.17199 15.8682 4.21614L15.7778 4.22222H15.0702L13.9323 15.7948C13.8144 16.994 12.8431 17.92 11.6557 17.9951L11.4996 18H4.94483C3.73986 18 2.72325 17.124 2.53229 15.9497L2.51212 15.7948L1.37333 4.22222H0.666667C0.329159 4.22222 0.0502303 3.97142 0.00608593 3.64602L0 3.55556C0 3.21805 0.250803 2.93912 0.576204 2.89497L0.666667 2.88889H5.33333C5.33333 1.2934 6.62673 0 8.22222 0ZM13.7307 4.22222H2.71289L3.83905 15.6643C3.89127 16.1952 4.31141 16.6083 4.83186 16.661L4.94483 16.6667H11.4996C12.033 16.6667 12.4853 16.289 12.5887 15.7762L12.6054 15.6643L13.7307 4.22222ZM9.77778 6.66667C10.1153 6.66667 10.3942 6.91747 10.4384 7.24287L10.4444 7.33333V13.5556C10.4444 13.9237 10.146 14.2222 9.77778 14.2222C9.44027 14.2222 9.16134 13.9714 9.1172 13.646L9.11111 13.5556V7.33333C9.11111 6.96514 9.40959 6.66667 9.77778 6.66667ZM6.66667 6.66667C7.00417 6.66667 7.2831 6.91747 7.32725 7.24287L7.33333 7.33333V13.5556C7.33333 13.9237 7.03486 14.2222 6.66667 14.2222C6.32916 14.2222 6.05023 13.9714 6.00609 13.646L6 13.5556V7.33333C6 6.96514 6.29848 6.66667 6.66667 6.66667ZM8.22222 1.33333C7.40607 1.33333 6.73672 1.96188 6.67182 2.76131L6.66667 2.88889H9.77778C9.77778 2.02978 9.08133 1.33333 8.22222 1.33333Z" fill="#CE1E1E" />
                    </svg>
                </div>
            </div>}
        </>
    )
}

export default TableRow