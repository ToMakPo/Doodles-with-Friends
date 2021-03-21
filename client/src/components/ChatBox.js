import { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { LobbyContext } from "../utils/GameContext"
import { useAuthenticatedUser } from '../utils/auth'
import '../styles/Chat.css'

const ChatMessage = ({ sender, message }) => {
    return (
        <div className='chat-message'>
            <small>{sender.username}</small>
            <span>{message}</span>
        </div>
    )
}
const GuessMessage = ({ sender, guess }) => {
    return (
        <div className='guess-message'>
            <small>{sender.username}</small>
            <span>{guess}</span>
        </div>
    )
}
const AnswerMessage = ({ sender, answer }) => {
    return (
        <div className='answer-message'>
            <span><strong>{sender.username}</strong> got it!!!!</span>
            <small>The answer is:</small>
            <h3>{answer}</h3>
        </div>
    )
}

const ChatBox = ({lobby, user}) => {
    // const {lobby} = useContext(GameContext)
    // const activeUser = useAuthenticatedUser()
    // const lobby = {id: 'D5EA12C14'} // TODO: fix this 
    // const activeUser = {username: 'ToMakPo'}
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [guessing, setGuessing] = useState(false)

    const socketRef = useRef()

    // useEffect(() => {
    //     socketRef.current = io.connect('/')

    //     socketRef.current.on(`${lobby.id}-logMessage`, logMessage)
    // }, [lobby])

    /// EVENT HANDLERS ///
    function logMessage(data) {
        setMessages([...messages, data])
    }

    function chatInputOnInput(event) {
        const isGuess = event.target.value[0] === '?'
        const value = isGuess ? event.target.value.substr(1) : event.target.value

        isGuess !== guessing && setGuessing(isGuess)
        value !== message && setMessage(value)
    }

    function chatSubmitOnClick(event) {
        event.preventDefault()
        socketRef.emit(guessing ? 'logGuess' : 'logMessage', lobby.id, user, message)
    }

    return (
        <div id='chat-component'>
            <div id='chat-log'>{
                messages.map((data, i) => {
                    switch (data.type) {
                        case 'chat': return <ChatMessage key={i} {...data} />
                        case 'quess': return <GuessMessage key={i} {...data} />
                        case 'answer': return <AnswerMessage key={i} {...data} />
                        default: return ''
                    }
                })
            }</div>
            <div id='chat-input-box'>
                <input
                    id='chat-input'
                    type="text"
                    onInput={chatInputOnInput}
                />
                <input
                    id='chat-submit'
                    type='submit'
                    className='chat-button'
                    value={guessing ? '❓' : '💬'}
                    onClick={chatSubmitOnClick}
                />
            </div>
        </div>
    )
}

export default ChatBox