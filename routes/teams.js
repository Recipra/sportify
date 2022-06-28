import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as teamsCtrl from '../controllers/teams.js'

const router = Router()

router.get('/new', isLoggedIn, teamsCtrl.new)
router.post('/', isLoggedIn, teamsCtrl.create)

export {
  router
}