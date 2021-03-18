import { useState, useRef, useContext, useEffect } from 'react'
import io from 'socket.io-client'
// import PropTypes from 'prop-types'
import GameContext from "../utils/GameContext"

const ChatMessage = ({datetime, sender, message}) => {

}

const ChatBox = ({width, height, active}) => {
    const {lobby} = useContext(GameContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [guessing, setGuessing] = useState(false)

    const socketRef = useRef()

    useEffect(() => {
        socketRef.current = io.connect('/')

        socketRef.current.on(`${lobby.id}-logMessage`, logMessage)
    }, [lobby])

    /// EVENT HANDLERS ///
    function logMessage(data) {
        setMessages([...messages, data])
    }

    function onInput(event) {
        const value = event.target.value
        const lastValue = message

        setMessage(value)
    }

    return (
        <div id='chat-component'>
            <div id='chat-log'>{
                messages.map((data, i) => <ChatMessage key={i} {...data}/>)
            }</div>
            <div id='chat-input-box'>
                <input
                    id='chat-input'
                    type="text"
                    onInput={onInput}
                />
                <input
                    id='chat-submit'
                    type='submit'
                    className='chat-button'
                    value={guessing ? '❓' : '💬'}
                />
            </div>
        </div>
    )
}

export default ChatBox