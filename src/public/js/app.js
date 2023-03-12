const messageList = document.querySelector("ul")
const nickForm = document.querySelector("#nick")
const messageForm = document.querySelector("#message")

const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type, payload) {
  const msg = {type, payload}
  return JSON.stringify(msg)
}

socket.addEventListener('open', () => {
  console.log("Connected to Browser ✅")
})

socket.addEventListener('message', (msg) => {


})

socket.addEventListener('close', () => {
  console.log('Closed from Server ❌')
})



messageForm.addEventListener("submit", (event)=>{
  event.preventDefault()
  const input = messageForm.querySelector('input')
  socket.send(makeMessage("new_message", input.value))
  const li = document.createElement('li')
  li.innerText = `You ${input.value.toString()}`
  messageList.append(li)
  input.value = ""
})

function handleNickSubmit(event) {
  event.preventDefault()
  const input = nickForm.querySelector('input')
  socket.send(makeMessage("nickname", input.value))
  input.value=""
}
nickForm.addEventListener('submit', handleNickSubmit)
