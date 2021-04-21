import express, { request } from 'express';
import './database'
import { routes } from './routes'

const app = express();

app.use(express.json())

app.use(routes)

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

app.listen(3333, () => console.log('server is running on port: 3333'))