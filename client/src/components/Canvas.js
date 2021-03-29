/* eslint-disable no-eval */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react'
// import LobbyContext from '../utils/LobbyContext'
import io from 'socket.io-client'

import PropTypes from 'prop-types'
import '../styles/Canvas.css'

const restingPosition = {
    bottom: 35,
    right: 30,
    transform: `translate(50%, 50%)` 
}
const penSizeRange = {min: 1, max: 50}
const defaultPenColor = '#000000'
const defaultPenSize = 35

let _color = defaultPenColor
let _size = defaultPenSize
let _penSize = defaultPenSize
let _eraserSize = penSizeRange.max
let _tool = null
let _position = restingPosition
let _lastPoint = null

/**
 * @param {Boolean} isArtist True if this is the active player (Required)
 */
const Canvas = ({isArtist, code}) => {
    const penTool = useRef()
    const penBody = useRef()
    const eraserTool = useRef()
    const canvasCursor = useRef()
    const canvas = useRef()

    const socket = useRef()
    const context = useRef()
    
    const [tool, setTool] = useState(penTool)
    const [tools] = useState({penTool, eraserTool})
    const [color, setColor] = useState(defaultPenColor)
    const [size, setSize] = useState(defaultPenSize)
    const [penSize, setPenSize] = useState(defaultPenSize)
    const setEraserSize = useState(penSizeRange.max)[1]
    const setPosition = useState(restingPosition)[1]

    const emit = {
        changeColor: color => socket.current.emit('changeColor', code, color),
        changeSize: size => socket.current.emit('changeSize', code, size),
        clearDrawing: _ => socket.current.emit('clearDrawing', code),
        startLine: (thisPoint) => socket.current.emit('startLine', code, thisPoint),
        drawLine: (thisPoint) => socket.current.emit('drawLine', code, thisPoint),
        endLine: _ => socket.current.emit('endLine', code),
        changeTool: (toolName) => socket.current.emit('changeTool', code, toolName)
    }

    useEffect(_ => {
        setupSockets()
        context.current = canvas.current.getContext('2d')
        context.current.strokeStyle = color
        context.current.fillStyle = color
        context.current.lineWidth = size
        _tool = penTool

        // canvas.current.addEventListener('mousemove', event => {
             // console.log('canvasOnMouseMove')
        //     const viewportOffset = canvas.current.getBoundingClientRect();

        //     const x = event.clientX - viewportOffset.x
        //     const y = event.clientY - viewportOffset.y

        //     _position = {
        //         top: y,
        //         left: x,
        //         transform: `translate(-50%, -50%)`
        //     }
        //     setPosition(_position)
        
        //     if (_lastPoint !== null) {
        //         drawLine([x, y], _lastPoint)
        //         emit.drawLine([x, y], _lastPoint)
        //     }
        // })
        // canvas.current.addEventListener('mousedown', event => {
             // console.log('canvasOnMouseDown')
        //     const viewportOffset = canvas.current.getBoundingClientRect();

        //     const x = event.clientX - viewportOffset.x
        //     const y = event.clientY - viewportOffset.y

        //     startLine([x, y])
        //     emit.startLine([x, y])
        // })
        // canvas.current.addEventListener('mouseup', _ => {
             // console.log('canvasOnMouseUp')
        //     if (_lastPoint !== null) {
        //         endLine()
        //         emit.endLine()
        //     }
        // })
        // canvas.current.addEventListener('mouseout', _ => {
             // console.log('canvasOnMouseOut')
        //     if (_lastPoint !== null) {
        //         endLine()
        //         emit.endLine()
        //     }
        //     _position = restingPosition
        //     setPosition(_position)
        // })
        // canvas.current.addEventListener('wheel', event => {
        //     event.preventDefault()
        
        //     const changeBy = 5
        //     const value = event.deltaY * -(changeBy / 100)
        //     const newSize = (size.value * 1) + value
        
        //     changeSize(newSize)
        // }, {passive: false})
    }, [])

    useEffect(_ => {
        const clr = tool === penTool ? color : '#ffffff'
        context.current.strokeStyle = clr
        context.current.fillStyle = clr
    }, [color, tool])

    useEffect(_ => {
        context.current.lineWidth = size
    }, [size])

    /// EVENT LISTENERS ///
    function canvasOnMouseMove(event) {
        // console.log('canvasOnMouseMove')
        const viewportOffset = canvas.current.getBoundingClientRect();

        const x = event.clientX - viewportOffset.x
        const y = event.clientY - viewportOffset.y

        _position = {
            top: y,
            left: x,
            transform: `translate(-50%, -50%)`
        }
        setPosition(_position)
    
        if (_lastPoint !== null) {
            drawLine([x, y])
            emit.drawLine([x, y])
        }
    }
    function canvasOnMouseDown(event) {
        // console.log('canvasOnMouseDown')
        const viewportOffset = canvas.current.getBoundingClientRect();

        const x = event.clientX - viewportOffset.x
        const y = event.clientY - viewportOffset.y

        startLine([x, y])
        emit.startLine([x, y])
    }
    function canvasOnMouseUp() {
        // console.log('canvasOnMouseUp')
        if (_lastPoint !== null) {
            endLine()
            emit.endLine()
        }
    } 
    function canvasOnMouseOut() {
        // console.log('canvasOnMouseOut')
        canvasOnMouseUp()
        _position = restingPosition
        setPosition(_position)
    }

    // function canvasOnMouseWheel(event) {
    //     // event.preventDefault()
    
    //     const changeBy = 5
    //     const value = event.deltaY * -(changeBy / 100)
    //     const newSize = (size * 1) + value
        
    //     changeSize(newSize)
    // }

    function penToolOnClick() {
        // console.log('penToolOnClick')
        changeTool('penTool')
        changeSize(_penSize)
        emit.changeTool('penTool')
        emit.changeSize(_penSize)
    }
    function eraserToolOnClick() {
        // console.log('eraserToolOnClick')
        changeTool('eraserTool')
        changeSize(_eraserSize)
        emit.changeTool('eraserTool')
        emit.changeSize(_eraserSize)
    }
    function clearDrawingButtonOnClick() {
        // console.log('clearDrawingButtonOnClick')
        clearDrawing()
        emit.clearDrawing()

        penToolOnClick()
    }
    function colorPickerOnInput(event) {
        // console.log('colorPickerOnInput')
        const color = event.target.value
        changeColor(color)
        emit.changeColor(color)
    }
    function sizePickerOnInput(event) {
        // console.log('sizePickerOnInput')
        const value = event.target.value * 1
        const size = Math.min(penSizeRange.max, Math.max(penSizeRange.min, value))

        changeSize(size)
        emit.changeSize(size)
        
        switch(_tool) {
            case penTool: _penSize = size; setPenSize(_penSize); break
            case eraserTool: _eraserSize = size; setEraserSize(_eraserSize); break
            default: break
        }
    }

    /// ACTIONS ///
    function changeColor(color) {
        // console.log('changeColor')
        _color = color
        setColor(_color)
    }
    function changeSize(size) {
        // console.log('changeSize')
        _size = size
        setSize(_size)
    }

    function changeTool(toolName) {
        // console.log('changeTool')
        _tool = tools[toolName]
        // console.log(_tool)
        setTool(_tool)
        // console.log({toolName, _tool, tool, tools})
    }
    
    function startLine(thisPoint) {
        // console.log('startLine')
        const ctx = context.current
        ctx.beginPath()
        ctx.arc(...thisPoint, _size / 2, 0, 2 * Math.PI)
        ctx.fill()
        _lastPoint = thisPoint
    }

    function drawLine(thisPoint) {
        // console.log('drawLine')
        // console.log({_lastPoint})
        if (_lastPoint !== null) {
            const ctx = context.current
            // console.log({ctx, thisPoint, lastPoint: _lastPoint, _size})
            ctx.beginPath()
            ctx.moveTo(..._lastPoint)
            ctx.lineTo(...thisPoint)
            ctx.stroke()
            
            ctx.beginPath()
            ctx.arc(...thisPoint, _size / 2, 0, 2 * Math.PI)
            ctx.fill()
    
            _lastPoint = thisPoint
        }
    }

    function endLine() {
        // console.log('endLine')
        _lastPoint = null
    }

    function clearDrawing() {
        // console.log('clearDrawing')
        const ctx = context.current
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    }

    /// SOCKETS ///
    function setupSockets() {
        // console.log('setupSockets')
        socket.current = io.connect('/')

        socket.current.on(`${code}-changeColor`, changeColor)
        socket.current.on(`${code}-changeSize`, changeSize)
        socket.current.on(`${code}-clearDrawing`, clearDrawing)
        socket.current.on(`${code}-startLine`, startLine)
        socket.current.on(`${code}-drawLine`, drawLine)
        socket.current.on(`${code}-endLine`, endLine)
        socket.current.on(`${code}-changeTool`, changeTool)
    }

    return (
        // <div className="card canvasCard">
        // <div className="card-body ">
        // <div className="canvasContainer">
        <div id='canvas-component'>
            <div id='draw-area'>
                <canvas
                    width={600}
                    height={500}
                    onMouseMove={canvasOnMouseMove}
                    onMouseDown={canvasOnMouseDown}
                    onMouseUp={canvasOnMouseUp}
                    onMouseOut={canvasOnMouseOut}
                    // onWheel={canvasOnMouseWheel}
                    ref={canvas}
                ></canvas>
                {isArtist && <>
                    <span id='canvas-cursor' 
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: tool === penTool ? color : '#ffffff88',
                            ..._position
                        }} 
                        ref={canvasCursor}></span>
                    <div id='tools'>
                        <div>
                            <svg
                                id='pen-tool'
                                className={`tool${tool === penTool ? ' selected' : ''}`}
                                ref={penTool}
                                onClick={penToolOnClick}
                                style={{
                                    width: 24, 
                                    height: 120,
                                    // pointerEvents: _lastPoint === null ? 'all' : 'none'
                                }}>
                                <path
                                    id='pen-tip'
                                    d='M 9.96296,2.125 2,15.996524 V 20.125 H 22 V 15.996524 L 14.03702,2.125 Z'
                                    style={{ fill: '#ffffff' }} />
                                <path
                                    id='pen-body'
                                    ref={penBody}
                                    d='M 2,20 H 22 V 94 H 2 Z'
                                    style={{ fill: color }} />
                                <path
                                    id='pen-bracket'
                                    d='m 2,94 h 20 v 12 H 2 Z'
                                    style={{ fill: '#e6e6e6' }} />
                                <path
                                    id='pen-eraser'
                                    d='m 2,106 v 6 c 0,3.31371 2.6862916,6 6,6 h 8 c 3.313708,0 6,-2.68629 6,-6 v -6 z'
                                    style={{ fill: '#ff9999' }} />
                                <path
                                    id='pen-outline'
                                    d='m 19.867188,16.625 -0.004,0.0039 c 0.08807,0.150606 0.135202,0.321633 0.13672,0.496092 v 1 h -16 v -1 c -3.512e-4,-0.175432 0.045456,-0.347869 0.13282,-0.5 L 9.218664,7.8164 h 5.5625 l 5.085938,8.808592 m 3.460938,-2 -7,-12.121092 -0.004,0.0039 C 15.432924,0.961117 13.784843,0.006808 11.99982,0.003894 L 12,0 C 10.212775,0.0023 8.5626948,0.95842 7.671876,2.507814 l -0.004,-0.0039 -7,12.121092 0.0078,0.0039 C 0.23546754,15.387293 0.00244896,16.248114 0,17.125 V 112 c 0,4.41828 3.581722,8 8,8 h 8 c 4.418278,0 8,-3.58172 8,-8 V 17.125 C 23.9987,16.24846 23.767004,15.387663 23.328126,14.628908 M 4,22.125 H 20 V 92 H 4 Z M 4,96 h 16 v 8 H 4 Z m 0,12 h 16 v 4 c 0,2.20914 -1.790861,4 -4,4 H 8 c -2.209139,0 -4,-1.79086 -4,-4 z'
                                    style={{ fill: '#4d4d4d' }} />
                            </svg>
                            <svg
                                id='eraser-tool'
                                className={`tool${tool === eraserTool ? ' selected' : ''}`}
                                ref={eraserTool}
                                onClick={eraserToolOnClick}
                                style={{
                                    width: 32, 
                                    height: 120,
                                    // pointerEvents: _lastPoint === null ? 'all' : 'none'
                                }}>
                                <path
                                    id='eraser-top'
                                    d='m 29.999995,17.500006 v -9.68519 c 0,-3.313701 -2.686291,-6 -6,-6 H 7.9999938 c -3.3137084,0 -6.0000001,2.686299 -6.0000001,6 v 9.68519 z'
                                    style={{ fill: '#ffffff' }} />
                                <path
                                    id='eraser-body'
                                    d='M 1.9999937,17.500006 H 29.999984 V 102.49999 H 1.9999937 Z'
                                    style={{ fill: '#80d4ff' }} />
                                <path
                                    id='eraser-bottom'
                                    d='m 1.9999937,102.49999 v 9.68523 c 0,3.3137 2.6862917,6 6.0000001,6 H 23.999995 c 3.313709,0 6,-2.6863 6,-6 v -9.68523 z'
                                    style={{ fill: '#ffffff' }} />
                                <path
                                    id='eraser-outline'
                                    d='M 8.0000013,0 C 3.5817222,0 0,3.581707 0,8.000013 V 111.99999 C 0,116.41833 3.5817222,120 8.0000013,120 H 23.999999 C 28.418282,120 32,116.41833 32,111.99999 V 8.000013 C 32,3.581707 28.418282,0 23.999999,0 Z m 0,3.999988 H 23.999999 c 2.209141,0 4.000002,1.790891 4.000002,4.000025 v 7.999975 H 3.9999988 V 8.000013 c 0,-2.209134 1.7908611,-4.000025 4.0000025,-4.000025 z M 3.9999988,20.000013 H 28.000001 V 99.999991 H 3.9999988 Z m 0,83.999997 H 28.000001 v 7.99998 c 0,2.20917 -1.790861,4.00002 -4.000002,4.00002 H 8.0000013 c -2.2091414,0 -4.0000025,-1.79085 -4.0000025,-4.00002 z'
                                    style={{ fill: '#4d4d4d' }} />
                            </svg>
                        </div>
                    </div>
                </>}
            </div>
            {isArtist &&
                <div id='canvas-input-box'>
                    <input
                        id='color-picker' 
                        type="color"
                        value={color}
                        onInput={colorPickerOnInput}/>
                    <input
                        id='size-picker'
                        type="range"
                        onInput={sizePickerOnInput}
                        {...penSizeRange}
                        value={penSize}/>
                    <button 
                        id='clear-drawing-button'
                        className="btn btn-primary"
                        type="button" 
                        onClick={clearDrawingButtonOnClick}>
                        Clear Drawing
                    </button>
                </div>
            }
        </div>
        // </div>
        // </div>
        // </div>
    )
}

Canvas.propTypes = {
    isArtist: PropTypes.bool.isRequired
}

export default Canvas