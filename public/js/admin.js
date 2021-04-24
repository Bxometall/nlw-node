const socket = io()

let connectionsUsers = []

socket.on('admin_list_all_users', connections => {
  connectionsUsers = connections
  document.getElementById('list_users').innerHTML = ''

  let template = document.getElementById('template').innerHTML

  connections.forEach(conn => {
    const rendered = Mustache.render(template, {
      email: conn.user.email,
      id: conn.socketId
    })

    document.getElementById('list_users').innerHTML += rendered
  });
})

function call(id) {

  const connection = connectionsUsers.find( conn => conn.socketId === id )

  const template = document.getElementById('admin_template').innerHTML

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.userId
  })

  document.getElementById('supports').innerHTML += rendered

  const params = { userId: connection.userId }

  socket.emit('admin_in_support', params)

  socket.emit('admin_list_messages_by_user', params, messages => {

    const divMessages = document.getElementById(`allMessages${connection.userId}`) // literal template

    messages.forEach(msg => {
      
      const createDiv = document.createElement('div')
      
      if (msg.adminId == null) {
        createDiv.className = 'admin_message_client'

        createDiv.innerHTML = `<span>${connection.user.email}</span>`
        createDiv.innerHTML += `<span>${msg.text}</span>`
        createDiv.innerHTML += `<span class="admin_date">${dayjs(msg.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`

        divMessages.appendChild(createDiv)
      } else {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.className = 'admin_wrapper'

        createDiv.className = 'admin_message_admin'

        createDiv.innerHTML = `<span>Atendente:</span>`
        createDiv.innerHTML += `<span>${msg.text}</span>`
        createDiv.innerHTML += `<span class="admin_date">${dayjs(msg.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`

        wrapperDiv.appendChild(createDiv)
        divMessages.appendChild(wrapperDiv)
      }
    })
  })
}

function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`)

  const params = {
    text: text.value,
    userId: id
  }

  socket.emit('admin_send_message', params)

  const divMessages = document.getElementById(`allMessages${id}`)

  const wrapperDiv = document.createElement('div')
  wrapperDiv.className = 'admin_wrapper'
  const createDiv = document.createElement('div')
  createDiv.className = 'admin_message_admin'

  createDiv.innerHTML = `<span>Atendente:</span>`
  createDiv.innerHTML += `<span>${params.text}</span>`
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format('DD/MM/YYYY HH:mm:ss')}</span>`

  wrapperDiv.appendChild(createDiv)
  divMessages.appendChild(wrapperDiv)

  text.value = ''
}

socket.on('admin_receive_message', data => {
  
  const { message } = data

  const connection = connectionsUsers.find(conn => conn.socketId === data.socketId)

  const divMessages = document.getElementById(`allMessages${connection.userId}`)

  const createDiv = document.createElement('div')
  createDiv.className = 'admin_message_client'

  createDiv.innerHTML = `<span>${connection.user.email}</span>`
  createDiv.innerHTML += `<span>${message.text}</span>`
  createDiv.innerHTML += `<span class="admin_date">${dayjs(message.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>`

  divMessages.appendChild(createDiv)

})