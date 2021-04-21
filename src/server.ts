import express, { request } from 'express';
import './database'

const app = express();

/**
 * GET
 * POST
 * PUT
 * DELETE
 * PATCH (modify a user info, like a phone, a simple modification)
 */

app.get("/", (request, response) => {
  // return response.send("Hello NLW 05")
  return response.json({
    message: "Hello NLW 05"
  })
})

app.post("/", (request, response) => {
  return response.json({
    message: "User saved!"
  })
})

app.listen(3333, () => console.log('server is running on port: 3333'))