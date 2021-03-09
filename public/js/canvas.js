const drawArea = document.querySelector('draw-area')
const canvas = document.querySelector('canvas')
canvas.width = 600
canvas.height = 500

const colorPicker = document.querySelector('#color-picker')
const sizePicker = document.querySelector('#size-picker')
const clearDrawingButton = document.querySelector('#clear-drawing-button')
const canvasCursor = document.querySelector('#canvas-cursor')

const cordsDisplay = document.querySelector('#cords')
const colorDisplay = document.querySelector('#color')
const sizeDisplay = document.querySelector('#size')

const tools = document.querySelectorAll('.tool')
const penTool = document.querySelector('#pen-tool')
const penBody = document.querySelector('#pen-body')
const eraserTool = document.querySelector('#eraser-tool')

let selectedTool = penTool
let penColor = colorPicker.value
let penSize = sizePicker.value
let eraserSize = 40

canvas.addEventListener('mousemove', event => {
    const x = event.offsetX
    const y = event.offsetY
    canvasCursor.style.top = y + 'px'
    canvasCursor.style.left = x + 'px'
    cordsDisplay.textContent = `x:${y}, y:${x}` //

    if (lastPoint !== null) {
        drawLine(x, y)
        emit.drawLine(x, y)
    }
})
canvas.addEventListener('mouseout', event => {
    endLine()
    emit.endLine()
    placePen()
})
canvas.addEventListener('mouseup', event => {
    endLine()
    emit.endLine()
    emit.consoleLog(event)

    tools.forEach(tool => tool.style.pointerEvents = 'all')
})
canvas.addEventListener('mousedown', event => {
    const x = event.offsetX
    const y = event.offsetY

    tools.forEach(tool => tool.style.pointerEvents = 'none')

    startLine(x, y)
    emit.startLine(x, y)
})
canvas.addEventListener('wheel', event => {
    event.preventDefault()

    const changeBy = 5
    const value = event.deltaY * -(changeBy / 100)
    const newSize = (sizePicker.value * 1) + value

    setSize(newSize)
    emit.setSize(newSize)
}, {passive: false})

canvas.addEventListener('touchstart', event => convertTouch('mousedown', event), {passive: false})
canvas.addEventListener('touchmove', event => convertTouch('mousemove', event), {passive: false})
canvas.addEventListener('touchend', event => convertTouch('mouseup', event), false)
canvas.addEventListener('touchcancel', event => convertTouch('mouseout', event), false)

function convertTouch(name, event) {
    event.preventDefault()
    const {y, x, width, height} = canvas.getBoundingClientRect()
    let {clientX, clientY} = event.touches[0]
    // clientX += x * 2
    // clientY += y * 2
    emit.consoleLog(name, event, clientX, clientY, canvas.getBoundingClientRect())
    canvas.dispatchEvent(new MouseEvent(name, {clientX, clientY}))
}

function handlePenToolOnClick() {
    usePen()
    emit.usePen()
}

function handleEraserToolOnClick() {
    useEraser()
    emit.useEraser()
}

function handleColorPickerOnInput(color) {
    setColor(color)
    emit.setColor(color)
}

function handleSizePickerOnInput(size) {
    setSize(size)
    emit.setSize(size)
}

function handleClearDrawingButtonOnClick() {
    clearDrawing()
    emit.clearDrawing()
}

const ctx = canvas.getContext('2d')

let lastPoint = null

function setColor(newColor) {
    ctx.strokeStyle = newColor
    ctx.fillStyle = newColor
    canvasCursor.style.backgroundColor = newColor
    colorDisplay.textContent = 'color:' + newColor //
    colorPicker.value = newColor

    switch (selectedTool) {
        case penTool: 
            penColor = newColor;
            penBody.style.fill = newColor
            break;
        case eraserTool: break;
    }
}

function setSize(newSize) {
    newSize = Math.min(50, Math.max(0, newSize))

    ctx.lineWidth = newSize
    canvasCursor.style.width = newSize + 'px'
    canvasCursor.style.height = newSize + 'px'
    sizeDisplay.textContent = 'size:' + newSize //
    sizePicker.value = newSize

    switch (selectedTool) {
        case penTool: penSize = newSize; break;
        case eraserTool: eraserSize = newSize; break;
    }
}

function startLine(x, y) {
    lastPoint = [x, y]
        
    ctx.beginPath()
    ctx.arc(x, y, sizePicker.value / 2, 0, 2 * Math.PI)
    ctx.fill()

}

function drawLine(x, y) {
    if (lastPoint !== null) {
        ctx.beginPath()
        ctx.moveTo(...lastPoint)
        ctx.lineTo(x, y)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.arc(x, y, sizePicker.value / 2, 0, 2 * Math.PI)
        ctx.fill()

        lastPoint = [x, y]
    }
}

function endLine() {
    lastPoint = null
}

function clearDrawing() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    usePen()
}

function placePen() {
    canvasCursor.style.top = (canvas.offsetHeight - 27) + 'px'
    canvasCursor.style.left = (canvas.offsetWidth - 27) + 'px'
}

function usePen() {
    selectedTool = penTool
    selectTool()
    setSize(penSize)
    setColor(penColor)
    sizePicker.value = penSize
    colorPicker.disabled = false
    canvasCursor.classList.remove('eraser')
}

function useEraser() {
    selectedTool = eraserTool
    selectTool()
    setSize(eraserSize)
    setColor('#ffffff')
    sizePicker.value = eraserSize
    colorPicker.disabled = true
    canvasCursor.classList.add('eraser')
}

function selectTool() {
    tools.forEach(tool => tool.classList.remove('selected'))
    selectedTool.classList.add('selected')
}

placePen()
usePen()
