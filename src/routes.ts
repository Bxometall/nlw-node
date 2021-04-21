import { request, response, Router } from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()

const settingsController = new SettingsController()

routes.post('/settings', settingsController.create)

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