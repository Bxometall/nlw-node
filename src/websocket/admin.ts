import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on('connect', async (socket) => {

  const connService = new ConnectionsService()
  const msgService = new MessagesService()

  const allConnectionsWithoutAdmin = await connService.findWithoutAdmin()

  /**
   * I don't wanna send this information to the client who is connected with this socket, I wanna send to all admins to listen, so
   * here we don't use socket.on instead we're going to use io again
   *  */ 
  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { userId } = params

    const allMessages = await msgService.listByUser(userId)

    callback(allMessages)
  })

  socket.on('admin_send_message', async params => {
    const { userId, text } = params

    await msgService.create({
      text, 
      user_id: userId, 
      adminId: socket.id
    })

    const { socketId } = await connService.findByUserId(userId)

    // sending the response directly to the socket of user who started the chat
    io.to(socketId).emit('admin_send_to_client', {
      text, 
      socketId: socket.id
    })
  })

  socket.on('admin_in_support', async params => {

    const { userId } = params

    /**
     * commented cus without the list with the userId it stops working
     */
    // await connService.updateAdminId(userId, socket.id)

    // const allConnectionsWithoutAdmin = await connService.findWithoutAdmin()
    // io.emit('admin_list_all_users', allConnectionsWithoutAdmin)
  })
})