import React from 'react'
import {List,Icon,Avatar} from 'antd'
function Message(props) {
    const AvatarSrc=props.who==='bot' ? <Icon type="robot" /> : <Icon type="smile" />
    return (
        <List.Item key={props.key} style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={props.who}
                        description={props.content}
                    />
                </List.Item>
    )
}

export default Message
