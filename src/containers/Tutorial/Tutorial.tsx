import React, { useState, useCallback } from 'react'
import { Header, Button, Dropdown, NotificationBox } from '../../components'
import { useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'
import { tutorialText } from './tutorial.data'
import { notificationData } from '../Notification/notification.data'

function Tutorial() {
    const notificationState = useSelector((state: ReducerType) => state.notificationReducer)
    const [openNotifications, setopenNotifications] = useState<boolean>(false)

    const notificationDropdown = useCallback(
        () => {
            setopenNotifications(!openNotifications);
        },
        [openNotifications],
    )

    return (
        <section>
            <NotificationBox
                text="See all notifications"
                button={true}
                rotate={openNotifications}
                onClick={notificationDropdown}
            />
            <Dropdown open={openNotifications}>
                {
                    notificationData.map((data) => {
                        return <NotificationBox onClick={() => { console.log("approveAgreement") }} key={data.id} text={data.text} button={false} />
                    })
                }
            </Dropdown>
            <div className="tutorial">
                <Header
                    text="How to use it"
                    headerType="big"
                />
                {
                    tutorialText.map((item, index) => {
                        return <p key={index} className='tutorial__text'>
                            {item}
                        </p>
                    })
                }
                <div className="tutorial__video">
                    <iframe width="674" height="418" src="https://www.youtube.com/embed/PHklnuOvxfg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <div className="tutorial__button">
                    <Button disabled={!notificationState.approveAgreement} text="Next" />
                </div>
            </div>
        </section>
    )
}

export default React.memo(Tutorial)