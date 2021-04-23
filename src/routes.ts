import { request, response, Router } from 'express'
import { MessagesController } from './controllers/MessagesController'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'

const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findByUsername)
routes.put('/settings/:username', settingsController.update)

routes.post('/users', usersController.create)
routes.post('/messages', messagesController.create)
routes.get('/messages/:id', messagesController.showByUser)


/**
 * Params types
 * Route Params => route params
 * https://localhost:3333/settings/1
 * 
 * Query Params => filters and searchs
 * https://localhost:3333/settings/?search=something&name=test
 * 
 * Body Params  => {}
 */
// pass this to README.md after... a simpler version of How to make a request.post directly
// routes.post('/settings', async (request, response) => {

//   const { chat, username } = request.body
  
//   const settingsRepository = getCustomRepository(SettingsRepository)

//   const settings = settingsRepository.create({
//     chat,
//     username
//   })

//   await settingsRepository.save(settings)

//   return response.json(settings)
// })

export { routes }