import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const Socket = ({lobby}) => {
    const socket = useRef()

    useEffect(() => {
        socket.current = io.connect('/')

        socket.current.on(`${lobby.code}-addPlayer`, player)
    })
}

export default Socket