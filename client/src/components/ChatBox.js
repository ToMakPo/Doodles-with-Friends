import { useState, useRef, useEffect } from 'react'
import { useAuthenticatedUser } from '../utils/auth'

import API from "../utils/API";
import io from 'socket.io-client'

import '../styles/Chat.css'

const ChatMessage = ({ username, text, fromSelf }) => {
    console.log({fromSelf});
    return (
        <div className={'chat-message' + (fromSelf ? ' fromSelf' : '')}>
            <small>{username}</small>
            <span>{text}</span>
        </div>
    )
}
const GuessMessage = ({ username, text, fromSelf }) => {
    console.log('adding guess message');
    return (
        <div className={'guess-message' + (fromSelf ? ' fromSelf' : '')}>
            <small>{username}</small>
            <span>{text}</span>
        </div>
    )
}
const AnswerMessage = ({ username, text }) => {
    return (
        <div className={'answer-message'}>
            <span><strong>{username}</strong> got it!!!!</span>
            <small>The answer is:</small>
            <h3>{text}</h3>
        </div>
    )
}
const TimedOutMessage = ({ text }) => {
    return (
        <div className={'timed-out-message'}>
            <span>Sorry! You ran out of time.</span>
            <small>The answer is:</small>
            <h3>{text}</h3>
        </div>
    )
}
const NewGameMessage = ({ text }) => {
    return (
        <div className={'new-game-message'}>
            <span>Time to start a new game.</span>
            <small>The artist for this round is:</small>
            <h3>{text}</h3>
        </div>
    )
}
const NewRoundMessage = ({ text }) => {
    return (
        <div className={'new-round-message'}>
            <span>Time to start a new round.</span>
            <small>The artist for this round is:</small>
            <h3>{text}</h3>
        </div>
    )
}
const EndGameMessage = () => {
    return (
        <div className={'end-game-message'}>
            <span>Thank you for playing</span>
            <h3>Doodle with Friends</h3>
        </div>
    )
}

const ChatBox = () => {
    const page = window.location.pathname.split('/')[1]
    const [code] = useState(window.location.pathname.split('/')[2])
    const [userId] = useState(useAuthenticatedUser()._id);
    const [username, setUsername] = useState('');

    const [chatLog, setChatLog] = useState([])
    const [text, setText] = useState('')
    const [guessing, setGuessing] = useState(false)

    const socket = useRef()
    const chatInput = useRef()

    useEffect(() => {
        (async _ => {
            // get lobby
            const data = await API.getLobby(code)
            const {data: [lobby]} = await API.getLobby(code)
            console.log({data});

            // set up sockets
            setupSockets()

            // get user
            const {data: {username}} = await API.getPlayer(userId)
            setUsername(username)

            // get log
            setChatLog(lobby.chatLog)
        })()
    }, [])

    function chatInputOnInput(event) {
        const input = event.target.value
        const isGuess = input[0] === '?'
        const value = (isGuess ? input.substr(1) : input).trim()

        isGuess !== guessing && page === 'active-game' && setGuessing(isGuess)
        value !== text && setText(value)
    }

    function chatInputFormOnSubmit(event) {
        event.preventDefault()
        if (text) {
            const data = {
                userId,
                username,
                messageType: guessing ? 'guess' : 'chat',
                text,
                timeStamp: Date.now()
            }
            setText('')
            setGuessing(false)
            chatInput.current.value = ''
            socket.current.emit('submitChat', code, data)
        }
        
        chatInput.current.focus()
    }

    ///////////////////
    ///   SOCKETS   ///
    ///////////////////
    function setupSockets() {
        socket.current = io.connect('/')
        socket.current.on(`${code}-updataChatLog`, setChatLog)
    }

    return (
        <div className="card">
            <h2 className="card-header">Chat:  </h2>
            <div className="card-body">
                <div id='chat-component'>
                    <div id='chat-log'>{
                        chatLog.map((data, i) => {
                            const fromSelf = data.userId === userId
                            console.log(data);
                            switch (data.messageType) {
                                case 'chat': return <ChatMessage key={i} {...data} fromSelf={fromSelf} />
                                case 'guess': return <GuessMessage key={i} {...data} fromSelf={fromSelf} />
                                case 'answer': return <AnswerMessage key={i} {...data} />
                                case 'timedOut': return <TimedOutMessage key={i} {...data} />
                                case 'newGame': return <NewGameMessage key={i} {...data} />
                                case 'newRound': return <NewRoundMessage key={i} {...data} />
                                case 'endGame': return <EndGameMessage key={i} />
                                default: return ''
                            }
                        })
                    }</div>
                    <form
                        id='chat-input-form'
                        onSubmit={chatInputFormOnSubmit}>
                        <input
                            id='chat-input'
                            type="text"
                            ref={chatInput}
                            onInput={chatInputOnInput}
                        />
                        <input
                            id='chat-submit'
                            type='submit'
                            className='chat-button'
                            value={guessing ? '❓' : '💬'}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatBox