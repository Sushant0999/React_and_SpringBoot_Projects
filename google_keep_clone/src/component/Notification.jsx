import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Tooltip } from '@mui/material'
import React from 'react'

export default function Notification() {

    const notificationList = [
        1, 2, 3, 4
    ];

    return (
        <div>
            <Tooltip title={'Notification'}>
                <Badge badgeContent={notificationList.length} color='primary'>
                    <FontAwesomeIcon icon={faBell} size='2x' onClick={() => { console.log('Notification') }} />
                </Badge>
            </Tooltip>
        </div>
    )
}
