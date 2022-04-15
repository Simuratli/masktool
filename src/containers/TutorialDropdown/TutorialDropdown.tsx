import React, { useState, useCallback } from 'react'
import { notificationData } from '../Notification/notification.data'
import { NotificationBox, NotificationDropdown } from '../../components'

function TutorialDropdown() {
    const [openNotifications, setopenNotifications] = useState<boolean>(false)
    const notificationDropdown = useCallback(
        () => {
            setopenNotifications(!openNotifications);
        },
        [openNotifications],
    )

    return (
        <div>
            <NotificationBox
                text="See all notifications"
                button={true}
                rotate={openNotifications}
                onClick={notificationDropdown}
            />
            <NotificationDropdown open={openNotifications}>
                {
                    notificationData.map((data) => {
                        return <NotificationBox key={data.id} text={data.text} button={false} />
                    })
                }
            </NotificationDropdown>
        </div>
    )
}

export default React.memo(TutorialDropdown)