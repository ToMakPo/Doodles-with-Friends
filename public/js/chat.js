const chatLog = document.querySelector('#chat-log')
const chatInput = document.querySelector('#chat-input')

let chatMessage = ''

function handleChatOnInput(message) {
    chatMessage = message
}

function handleChatSubmitOnClick() {
    chatMessage = chatMessage.trim()

    if (chatMessage.length == 0) return

    if (chatMessage[0] === '?') {
        chatMessage = chatMessage.substr(1)
        logGuess(self, chatMessage)
        emit.logGuess(self, chatMessage)
    } else {
        logMessage(self, chatMessage)
        emit.logMessage(self, chatMessage)
    }

    chatInput.focus()
    chatInput.value = ''
    chatMessage = ''
}

function logMessage(sender, message) {
    const item = document.createElement('div')
    item.textContent = `${sender.name}: ${message}`
    item.classList.add('chat-item')
    
    if (sender.id == self.id) {
        item.classList.add('self')
    }
    appendLog(item)
}

function logGuess(sender, guess) {
    const item = document.createElement('div')
    item.textContent = `${sender.name}: ${guess}`
    item.classList.add('chat-item')
    item.classList.add('guess')
    appendLog(item)
}

function logCorrect(sender, answer) {
    const item = document.createElement('div')
    item.innerHTML = `${sender.name} got it!!!<br><br><small>The answer is:</small><strong>${answer}</strong><br>`
    item.classList.add('chat-item')
    item.classList.add('answer')
    appendLog(item)
}

function appendLog(item) {
    chatLog.appendChild(item)
    chatLog.scrollTo({top: chatLog.scrollHeight, behavior: 'smooth'})
}

// for (let i = 0; i < 50; i++) {
//     const msg = i + ': sdfljksdh flaksjdfh lasdkjf'
//     logMessage(self, msg)
//     // emit.logMessage(self, msg)
// }