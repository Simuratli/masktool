import React, { useCallback, } from 'react'
import { NotificationBox, Button, Checkbox, Header } from '../../components'
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
        [dispatch],
    )

    const onClickAgreeButton = () => {
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