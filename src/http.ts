import express, { Request, Response } from 'express';
import './database'
import { routes } from './routes'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import path from 'path'

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get("/pages/client", (request: Request, response: Response) => {
  return response.render('html/client.html')
})

const http = createServer(app) // creating HTTP Protocol
const io = new Server(http) // creating WebSocket Protocol

// when the user made the first requisition
io.on('connection', (socket: Socket) => {
  // console.log("Connected", socket.id)
})

app.use(express.json())

app.use(routes)

export { http, io }


/**
 * GET
 * POST
 * PUT
 * DELETE
 * PATCH (modify a user info, like a phone, a simple modification)
 * the code bellow is only for example, we will not use it
 */

// pass this to README.md after... a simpler version of How to make a request more directly
// app.get("/", (request, response) => {
//   // return response.send("Hello NLW 05")
//   return response.json({
//     message: "Hello NLW 05"
//   })
// })

// app.post("/", (request, response) => {
//   return response.json({
//     message: "User saved!"
//   })
// })