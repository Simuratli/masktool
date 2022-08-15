import React, { useCallback, } from 'react'
import { NotificationBox, Button, Checkbox, Header } from '../../components'
import { notificationData } from './notification.data'
import { setNotificationAllowance, setAproveNotificationAgreement, setStep, setLoader, setAllErroredTasks, setAllEntities, getCustomRules, setAllVocabularies, setDefaultTasks } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { GetEntities, GetDefaultTasks, GetAttributesByEntity, GetCustomRules, GetVocabularesList } from '../../api'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC'
import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'


function getDifference(array1: DefaultTasksTypes[], array2: DefaultTasksTypes[]) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.entityName.toLowerCase() === object2.entityName.toLowerCase();
        });
    });
}


function Notification() {

    const dispatch = useDispatch()
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)
    const defaultTasksState = useSelector((state: ReducerType) => state.defaultTasksReducer);

    const agreeWithNotification = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNotificationAllowance(e.target.checked))
        },
        [dispatch],
    )



    const getEntitiesAndTasks = async () => {
        dispatch(setLoader(true))
        let entities = await GetEntities();
        dispatch(setAllErroredTasks([]))
        dispatch(setAllEntities(entities));
        // setAllViewsByEntity
        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entities, tasks);

        tasks.map(async (task: DefaultTasksTypes) => {

            let atributes = await GetAttributesByEntity(task.entityName, task.etc);
            atributes.map((atribute: any) => {
                task.progress = "NULL";
                task.requestResult = null
                task.filter = []
                task.records = true
                task.open = false

                task.fields.map((field) => {
                    if (atribute.logicalName === field.logicalName) {
                        field.displayName = atribute.displayName
                        field.attributeTypeCode = atribute.attributeTypeCode;
                        field.requiredLevel = atribute.requiredLevel
                    }
                })

                let filteredTasks = task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7)
                task.maskOperation ? task.text = `You are going to mask ${task.fields.filter((it) => it.attributeTypeCode === 14 || it.attributeTypeCode === 2 || it.attributeTypeCode === 7).length} fields in all records.` : task.text = "You are going to delete all records."
            })
        })

        let nenew = getDifference(newTasks, defaultTasksState.tasks)

        dispatch(setDefaultTasks(nenew));

        let customRules = await GetCustomRules();
        dispatch(getCustomRules(customRules))
        let vocabularies = await GetVocabularesList();
        dispatch(setAllVocabularies(vocabularies))
        dispatch(setLoader(false));
    }


    const onClickAgreeButton = async () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        
        dispatch(setAproveNotificationAgreement(true));
        dispatch(setStep('rules'))
    }


    return (
        <div className='notification'>

            <div className='notification_info'>
                <Header headerType="big" text='Welcome!' />

                <p>The purpose of the UDS Business Data Masking is to quickly and flexibly delete or mask your system data before sharing access to Dynamics 365 with third parties. The add-on provides you with default masking rules and parameters. You can also change the default settings according to your needs.</p>
                <p>The basic version of UDS Business Data Masking allows working with 3 field types:</p>
                <ul className='list'>
                    <li>text fields;</li>
                    <li>multiline fields;</li>
                    <li>date fields;</li>
                </ul>
            </div>

            {
                notificationData.map((data) => {
                    return <NotificationBox key={data.text} text={data.text} button={false} />
                })
            }

            <div className='notification__agreement'>
                <Checkbox
                    onChange={agreeWithNotification}
                    checked={notificationState.agree}
                    disabled={notificationState.approveAgreement}
                    text={"I have read all the warnings"}
                />
                <Button
                    type='normal__modal'
                    disabled={!notificationState.agree && !notificationState.approveAgreement}
                    onClick={onClickAgreeButton}
                    text="I agree"
                />
            </div>

        </div>
    )
}

export default React.memo(Notification)