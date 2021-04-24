import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from "../services/UsersService"
import { MessagesService } from "../services/MessagesService"

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionsService()
  const userService = new UsersService()
  const msgService = new MessagesService()

  socket.on('client_first_access', async params => {
    // console.log(params)
    const socketId = socket.id
    const { text, email } = params as IParams // forcing to be type IParams, if something different of email or text comes, the apps must throw an error 

    let user = await userService.findByEmail(email)

    if (!user) {
      user = await userService.create(email)
    }

    const connection = await connectionService.findByUserId(user.id)

    if (!connection) {
      await connectionService.create({
        socketId, userId: user.id
      })
    } else {
      connection.socketId = socketId

      await connectionService.create(connection)
    }

    await msgService.create({
      text, user_id: user.id
    })

    const allMessages = await msgService.listByUser(user.id)

    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionService.findWithoutAdmin()
    io.emit('admin_list_all_users', allUsers)
  })

  socket.on('client_send_to_admin', async (params) => {
    const { text, socketAdminId } = params

    const socketId = socket.id

    const { userId } = await connectionService.findBySocketId(socketId)

    const message = await msgService.create({ text, user_id: userId })

    console.log('socketAdminId', socketAdminId)

    io.to(socketAdminId).emit('admin_receive_message', {
      message,
      socketId
    })
  })
})