import React, { useState, useCallback, } from 'react'
import { NotificationBox, Button, Checkbox, Dropdown } from '../../components'
import { notificationData } from './notification.data'
import { setNotificationAllowance, setAproveNotificationAgreement, setStep } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'


function Notification() {

    const dispatch = useDispatch()
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)


    const agreeWithNotification = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNotificationAllowance(e.target.checked))
        },
        [],
    )


    return (
        <div className='notification'>

            {
                notificationData.map((data) => {
                    return <NotificationBox key={data.text} text={data.text} button={false} />
                })
            }


            <div className='notification__agreement'>
                <Checkbox
                    onChange={agreeWithNotification}
                    checked={notificationState.agree}
                    text={"I have read all the warnings"}
                />
                <Button
                    disabled={!notificationState.agree}
                    onClick={() => {
                        dispatch(setAproveNotificationAgreement(true));
                        dispatch(setStep('tutorial'))
                    }}
                    text="I agree"
                />
            </div>

        </div>
    )
}

export default React.memo(Notification)