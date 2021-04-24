let socket_admin_id = null
let email_user = null
let socket = null

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io() // initialing the connection with backend (server.ts)

  const chat_help = document.getElementById('chat_help')
  chat_help.style.display = 'none'

  const chat_in_support = document.getElementById("chat_in_support")
  chat_in_support.style.display = 'block'

  const email = document.getElementById('email').value
  email_user = email
  const text = document.getElementById('txt_help').value
  
  const params = { email, text }
  
  socket.on('connect', () => {
    socket.emit('client_first_access', params, (callback, error) => {
      if (error) {
        console.error(error)
      } else {
        console.log(callback)
      }
    })
  })

  socket.on('client_list_all_messages', messages => {
    var template_client = document.getElementById('message-user-template').innerHTML
    var template_admin = document.getElementById('admin-template').innerHTML

    messages.forEach(message => {
      if (message.adminId === null) {
        const rendered = Mustache.render(template_client, {
          message: message.text,
          email
        })

        document.getElementById('messages').innerHTML += rendered
      } else {
        const rendered = Mustache.render(template_admin, {
          message_admin: message.text
        })
        document.getElementById('messages').innerHTML += rendered
      }
    });
  })

  socket.on('admin_send_to_client', (message) => {
    
    socket_admin_id = message.socketId

    const template_admin = document.getElementById('admin-template').innerHTML

    const rendered = Mustache.render(template_admin, {
      message_admin: message.text
    })

    document.getElementById('messages').innerHTML += rendered
  })
});


document.querySelector('#send_message_button').addEventListener('click', (event) => {

  const text = document.getElementById('message_user')

  const params = {
    text: text.value,
    socketAdminId: socket_admin_id
  }

  socket.emit('client_send_to_admin', params)
  
  const template_client = document.getElementById('message-user-template').innerHTML

  const rendered = Mustache.render(template_client, {
    message: text.value,
    email: email_user
  })

  document.getElementById('messages').innerHTML += rendered
})