import React,{useEffect} from 'react'
import Axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {saveMessage} from '../_actions/message_actions'
import {List,Icon,Avatar} from 'antd'
function Chatbot() {
    const dispatch=new useDispatch();
    const messagesFromRedux=new useSelector(state=>state.message.messages);
    useEffect(() => {
        eventQuery('Welcome1')
        
    }, [])
    const textQuery = async (text)=>{
        let conversations=[]
        let conversation={
            who:'user',
            content:{
                text:{
                    text:text
                }
            }
        }
        dispatch(saveMessage(conversation))
        console.log(conversation)
        const textQueryVariables={
            text
        }
        try{
        const response=await Axios.post('/api/dialogflow/textQuery',textQueryVariables)
        const content= response.data.fulfillmentMessages[0]
        conversation={
            who:'bot',
            content:content
        }
        dispatch(saveMessage(conversation))
        console.log(conversation)
        }catch(error){
            conversation={
                who:'bot',
                content:{
                    text:{
                        text:"Error just ocurred, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
            console.log(conversation)
        }
    }
    const eventQuery = async (event)=>{
        let conversations=[]
        const eventQueryVariables={
            event
        }
        try{
        const response=await Axios.post('/api/dialogflow/eventQuery',eventQueryVariables)
        const content= response.data.fulfillmentMessages[0]
        let conversation={
            who:'bot',
            content:content
        }
        dispatch(saveMessage(conversation))
        console.log(conversation)
        }catch(error){
            console.log(error)
            let conversation={
                who:'bot',
                content:{
                    text:{
                        text:"Error just ocurred, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
            console.log(conversation)
        }
    }
    const keyPressHanlder=(e)=>{
        if(e.key==="Enter"){
            if(!e.target.value){
                return alert('you need to type somthing first')
            }
            textQuery(e.target.value)
            e.target.value="";
        }
    }
    const renderOneMessage=(message,i)=>{
        console.log('message',message)
        return <div>
                <List.Item key={i} style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon />}
                        title={message.who}
                        description={message.content.text.text}
                    />
                </List.Item>
            </div>
    }
    const renderMessage=(returnedMessages)=>{
        if(returnedMessages){
            return returnedMessages.map((message,i)=>{
                return renderOneMessage(message,i)
            })
        }else{
            return null
        }
    }
    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(messagesFromRedux)}
            </div>
            <input style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="text"
            />
        </div>
    )
}

export default Chatbot
