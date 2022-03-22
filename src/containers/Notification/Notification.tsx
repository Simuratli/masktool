import React, { useState, useCallback } from 'react'
import { NotificationBox, Button, Checkbox, Dropdown } from '../../components'
import { notificationData } from './notification.data'
import { setNotificationAllowance, setAproveNotificationAgreement } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'


function Notification() {

    const dispatch = useDispatch()
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)

    const [openNotifications, setopenNotifications] = useState(false)


    const agreeWithNotification = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNotificationAllowance(e.target.checked))
        },
        [],
    )

    const notificationDropdown = useCallback(
        () => {
            setopenNotifications(!openNotifications);
        },
        [openNotifications],
    )
    


    return (
        <div className='notification'>
            {
                notificationState.approveAgreement && <NotificationBox
                    text="See all notifications"
                    button={true}
                    rotate={openNotifications}
                    onClick={notificationDropdown}
                />
            }

            {
                !notificationState.approveAgreement && notificationData.map((data) => {
                    return <NotificationBox key={data.text} text={data.text} button={false} />
                })
            }


            {
                notificationState.approveAgreement && <Dropdown open={openNotifications}>
                    {
                        notificationData.map((data) => {
                            return <NotificationBox onClick={() => { console.log("approveAgreement") }} key={data.text} text={data.text} button={false} />
                        })
                    }
                </Dropdown>
            }



            {!notificationState.approveAgreement && <div className='notification__agreement'>
                <Checkbox
                    onChange={agreeWithNotification}
                    text={"I have read and agree"}
                />
                <Button
                    disabled={!notificationState.agree}
                    onClick={() => { dispatch(setAproveNotificationAgreement(true)) }}
                    text="I agree"
                />
            </div>}

        </div>
    )
}

export default React.memo(Notification)