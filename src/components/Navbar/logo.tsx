import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GetAttributesByEntity, GetDefaultTasks,GetViewsByEntity } from '../../api';
import { setStableEntityByViews, setStableDefaultTasks } from '../../redux/actions'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { DefaultTasksTypes } from '../../redux/reducers/backend-reducers/default-tasks/default-tasks.types'
import { defaultTaskAddETC } from '../../utils/DefaultTaskETC';

function Logo() {
    const dispatch = useDispatch();
    const stableDataReducer = useSelector((state: ReducerType) => state.stableDataReducer)
    const entitesState = useSelector((state: ReducerType) => state.getEntitiesReducer.entities)

    console.log(stableDataReducer,'stableDataReducerstableDataReducer')
    const fetch = async () => {
        let viewsByEntity = await GetAttributesByEntity(stableDataReducer.logicalName ? stableDataReducer.logicalName : stableDataReducer.mainName, stableDataReducer.etc);

        dispatch(setStableEntityByViews({ name: stableDataReducer.name, data: viewsByEntity }))

        let tasks = await GetDefaultTasks();
        let newTasks = await defaultTaskAddETC(entitesState, tasks);

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


        for (const item of newTasks) {
            let viewsByEntity = await GetViewsByEntity(item.logicalName ? item.logicalName : item.entityName, item.etc);



            for (const view of viewsByEntity) {
                view.maskOperation = item.maskOperation
                view.cells.map((v: any) => {
                    for (const x of item.fields) {
                        if (x.logicalName === v.logicalName) {
                            v.requiredLevel = x.requiredLevel
                        }
                    }
                })
            }




            // if (viewsArray.some((value) => value.name === item.entityName) === false) {
                // viewsArray.push({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity })
                // dispatch(setViewsByEntity({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
                dispatch(setStableEntityByViews({ name: item.logicalName ? item.logicalName : item.entityName, data: viewsByEntity }))
            // }
        }

        return newTasks
    }




    useEffect(() => {
        fetch()
        // let newArrayForEntity: any[] = []

        // fetch().then((data) => {

        //     for (const entity of entitesState) {
        //         newArrayForEntity.push({
        //             entityName: entity.displayName,
        //             logicalName: entity.logicalName,
        //             errorMessage: null,
        //             delete: true,
        //             errorRecords: 0,
        //             etc: entity.etc,
        //             fields: [],
        //             filter: [],
        //             filterViewId: null,
        //             maskOperation: false,
        //             previousTaskId: null,
        //             progress: "NULL",
        //             requestResult: null,
        //             successRecords: 0,
        //             taskId: null,
        //             taskStatus: 0,
        //             text: "Delete",
        //             totalRecords: 0,
        //             records: true
        //         })
        //     }



        //     dispatch(setStableDefaultTasks([...data, ...newArrayForEntity]))

        // })



    }, [stableDataReducer.name,])




    return (
        <a target='_blank' rel="noreferrer" href="https://my.uds.systems/add-ons">
            <svg width="99" height="64" viewBox="0 0 99 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M33.9062 45.27H64.9053V0H33.9062V45.27Z" fill="#FF8F3E" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0 45.27H30.999V0H0V45.27Z" fill="#1A4F95" />
                <path fillRule="evenodd" clipRule="evenodd" d="M67.8086 45.27H98.8076V0H67.8086V45.27Z" fill="#1A4F95" />
                <path fillRule="evenodd" clipRule="evenodd" d="M14.9571 33.9314C13.4809 33.9314 12.1032 33.7333 10.7255 33.238C9.44619 32.7427 8.26527 32.1484 7.28111 31.3559C6.29702 30.5634 5.50977 29.5728 5.01772 28.5822C4.4273 27.4926 4.23047 26.4029 4.23047 25.2142V11.7422H9.15091V25.1152C9.15091 25.8086 9.34774 26.4029 9.64295 26.9973C9.93823 27.5916 10.3318 28.0869 10.9223 28.4832C11.4144 28.8794 12.1032 29.2756 12.7921 29.4738C13.4809 29.6719 14.2682 29.87 15.0555 29.87C15.8428 29.87 16.6301 29.7709 17.3189 29.4738C18.0078 29.1766 18.5983 28.8794 19.1887 28.4832C19.6807 28.0869 20.1728 27.4926 20.4681 26.9973C20.7633 26.4029 20.9601 25.8086 20.9601 25.1152V11.7422H25.8805V25.1152C25.8805 26.3039 25.5853 27.4926 25.0933 28.4832C24.5028 29.5728 23.814 30.4643 22.8298 31.2568C21.8457 32.0493 20.6648 32.6436 19.3855 33.139C17.9094 33.6343 16.4333 33.9314 14.9571 33.9314Z" fill="white" />
                <path d="M39.3633 29.4202V33.4783V33.6764H47.4329C48.7122 33.6764 49.8931 33.5774 51.074 33.2802C52.2549 33.0821 53.3375 32.6859 54.3216 32.1905C55.3057 31.6952 56.2897 31.1009 57.0771 30.4075C57.8643 29.7141 58.5532 28.9216 59.1436 28.1291C59.7341 27.2376 60.2262 26.3461 60.5214 25.4545C60.8166 24.4639 61.0134 23.4733 61.0134 22.4827C61.0134 21.3931 60.8166 20.4025 60.5214 19.5109C60.2262 18.5204 59.7341 17.6288 59.1436 16.8364C58.5532 15.9448 57.8643 15.2514 57.0771 14.558C56.1914 13.8646 55.3057 13.2702 54.3216 12.775C53.3375 12.2797 52.2549 11.9825 51.074 11.6853C49.8931 11.3881 48.7122 11.2891 47.4329 11.2891H39.3633V26.418H44.3822V15.1524H47.4329C48.6138 15.1524 49.7947 15.3505 50.7788 15.7467C51.8613 16.0439 52.747 16.6383 53.5343 17.2326C54.3216 17.926 54.912 18.6195 55.4041 19.5109C55.8961 20.4025 56.0929 21.294 56.0929 22.2847C56.0929 23.2752 55.8961 24.1668 55.4041 25.0583C54.912 25.9498 54.3216 26.7423 53.5343 27.3366C52.747 27.931 51.7629 28.4263 50.7788 28.8225C49.6963 29.2188 48.6138 29.4169 47.4329 29.4169L44.3822 29.4202H39.3633Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M73.1168 33.6343V29.6718H85.1228C85.5164 29.6718 85.91 29.5728 86.3037 29.4738C86.6973 29.3747 86.9925 29.1766 87.2878 28.9784C87.583 28.7804 87.7798 28.4832 87.9767 28.186C88.1734 27.8888 88.1734 27.4926 88.1734 27.1954C88.1734 26.8982 88.075 26.502 87.9767 26.2048C87.7798 25.9076 87.583 25.6104 87.2878 25.4123C86.9925 25.2142 86.6973 25.0161 86.3037 24.917C85.91 24.818 85.5164 24.7189 85.1228 24.7189H79.6118C78.5293 24.7189 77.4468 24.5208 76.4627 24.2236C75.4786 23.8274 74.6913 23.4311 73.9041 22.8368C73.2152 22.2424 72.6247 21.549 72.2311 20.7565C71.8375 19.9641 71.6406 19.0725 71.6406 18.181C71.6406 17.2895 71.8375 16.3979 72.2311 15.7045C72.6247 14.912 73.2152 14.2186 73.9041 13.6243C74.593 13.0299 75.4786 12.5347 76.4627 12.2375C77.4468 11.8413 78.4309 11.7422 79.6118 11.7422H92.0114V15.7045H79.6118C79.2182 15.7045 78.8245 15.8036 78.4309 15.9027C78.0373 16.0017 77.742 16.1998 77.4468 16.3979C77.1516 16.5961 76.9547 16.8932 76.758 17.1904C76.5611 17.4876 76.5611 17.8838 76.5611 18.181C76.5611 18.5772 76.6595 18.8744 76.758 19.1716C76.9547 19.4688 77.1516 19.7659 77.4468 19.9641C77.742 20.1622 78.0373 20.3603 78.4309 20.4593C78.8245 20.5584 79.2182 20.6575 79.6118 20.6575H85.1228C86.2052 20.6575 87.2878 20.8556 88.2719 21.1528C89.256 21.45 90.1417 21.9452 90.8305 22.5396C91.5193 23.134 92.1098 23.8274 92.5035 24.6199C92.8971 25.4123 93.0939 26.3039 93.0939 27.1954C93.0939 28.087 92.8971 28.9784 92.5035 29.6718C92.1098 30.4643 91.5193 31.1577 90.8305 31.7521C90.1417 32.3465 89.256 32.8418 88.2719 33.139C87.2878 33.5352 86.2052 33.6343 85.1228 33.6343H73.1168Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M99 64V48H0V64H99Z" fill="#F9FAFF" />
                <path d="M32.4382 52.7C32.9842 52.7 33.4582 52.79 33.8602 52.97C34.2682 53.15 34.5802 53.408 34.7962 53.744C35.0122 54.08 35.1202 54.479 35.1202 54.941C35.1202 55.397 35.0122 55.796 34.7962 56.138C34.5802 56.474 34.2682 56.732 33.8602 56.912C33.4582 57.092 32.9842 57.182 32.4382 57.182H31.0162V59H29.8462V52.7H32.4382ZM32.3842 56.192C32.8942 56.192 33.2812 56.084 33.5452 55.868C33.8092 55.652 33.9412 55.343 33.9412 54.941C33.9412 54.539 33.8092 54.23 33.5452 54.014C33.2812 53.798 32.8942 53.69 32.3842 53.69H31.0162V56.192H32.3842ZM39.9195 59.09C39.2775 59.09 38.6985 58.952 38.1825 58.676C37.6665 58.394 37.2615 58.007 36.9675 57.515C36.6735 57.017 36.5265 56.462 36.5265 55.85C36.5265 55.238 36.6735 54.686 36.9675 54.194C37.2615 53.696 37.6665 53.309 38.1825 53.033C38.6985 52.751 39.2775 52.61 39.9195 52.61C40.5615 52.61 41.1405 52.751 41.6565 53.033C42.1725 53.309 42.5775 53.693 42.8715 54.185C43.1655 54.677 43.3125 55.232 43.3125 55.85C43.3125 56.468 43.1655 57.023 42.8715 57.515C42.5775 58.007 42.1725 58.394 41.6565 58.676C41.1405 58.952 40.5615 59.09 39.9195 59.09ZM39.9195 58.064C40.3395 58.064 40.7175 57.971 41.0535 57.785C41.3895 57.593 41.6535 57.329 41.8455 56.993C42.0375 56.651 42.1335 56.27 42.1335 55.85C42.1335 55.43 42.0375 55.052 41.8455 54.716C41.6535 54.374 41.3895 54.11 41.0535 53.924C40.7175 53.732 40.3395 53.636 39.9195 53.636C39.4995 53.636 39.1215 53.732 38.7855 53.924C38.4495 54.11 38.1855 54.374 37.9935 54.716C37.8015 55.052 37.7055 55.43 37.7055 55.85C37.7055 56.27 37.8015 56.651 37.9935 56.993C38.1855 57.329 38.4495 57.593 38.7855 57.785C39.1215 57.971 39.4995 58.064 39.9195 58.064ZM49.2746 59L47.9876 57.155C47.9336 57.161 47.8526 57.164 47.7446 57.164H46.3226V59H45.1526V52.7H47.7446C48.2906 52.7 48.7646 52.79 49.1666 52.97C49.5746 53.15 49.8866 53.408 50.1026 53.744C50.3186 54.08 50.4266 54.479 50.4266 54.941C50.4266 55.415 50.3096 55.823 50.0756 56.165C49.8476 56.507 49.5176 56.762 49.0856 56.93L50.5346 59H49.2746ZM49.2476 54.941C49.2476 54.539 49.1156 54.23 48.8516 54.014C48.5876 53.798 48.2006 53.69 47.6906 53.69H46.3226V56.201H47.6906C48.2006 56.201 48.5876 56.093 48.8516 55.877C49.1156 55.655 49.2476 55.343 49.2476 54.941ZM53.5258 53.69H51.4378V52.7H56.7838V53.69H54.6958V59H53.5258V53.69ZM62.0314 57.542H58.8814L58.2604 59H57.0544L59.8894 52.7H61.0414L63.8854 59H62.6614L62.0314 57.542ZM61.6444 56.624L60.4564 53.87L59.2774 56.624H61.6444ZM65.2866 52.7H66.4566V58.01H69.7506V59H65.2866V52.7Z" fill="#1A4F95" />
            </svg>
        </a>
    )
}

export default React.memo(Logo)