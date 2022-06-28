import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as playersCtrl from '../controllers/players.js'

const router = Router()

router.get('/new', isLoggedIn, playersCtrl.new)
router.post('/', isLoggedIn, playersCtrl.create)
router.get('/:id', playersCtrl.show)

export {
  router
}