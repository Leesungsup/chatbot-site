import React,{useEffect} from 'react'
import Axios from 'axios'

function Chatbot() {
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
        console.log(conversation)
        const textQueryVariables={
            text
        }
        try{
        const response=await Axios.post('/api/dialogflow/textQeury',textQueryVariables)
        const content= response.data.fulfillmentMessage[0]
        conversation={
            who:'bot',
            content:content
        }
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
            console.log(conversation)
        }
    }
    const eventQuery = async (event)=>{
        let conversations=[]
        const eventQueryVariables={
            event
        }
        try{
        const response=await Axios.post('/api/dialogflow/eventQeury',eventQueryVariables)
        const content= response.data.fulfillmentMessage[0]
        let conversation={
            who:'bot',
            content:content
        }
        console.log(conversation)
        }catch(error){
            let conversation={
                who:'bot',
                content:{
                    text:{
                        text:"Error just ocurred, please check the problem"
                    }
                }
            }
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
    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>

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
