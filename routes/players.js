import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as playersCtrl from '../controllers/players.js'

const router = Router()

router.get('/', isLoggedIn, playersCtrl.index)
router.get('/new', isLoggedIn, playersCtrl.new)
router.post('/', isLoggedIn, playersCtrl.create)
router.get('/:id', isLoggedIn, playersCtrl.show)
router.get('/:id/edit', isLoggedIn, playersCtrl.edit)
router.put('/:id', isLoggedIn, playersCtrl.update)

export {
  router
}