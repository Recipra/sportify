import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as playersCtrl from '../controllers/players.js'

const router = Router()

router.get('/', isLoggedIn, playersCtrl.index)
router.get('/new', isLoggedIn, playersCtrl.new)
router.post('/', isLoggedIn, playersCtrl.create)
router.get('/:id', playersCtrl.show)
router.get('/:id/edit', playersCtrl.edit)
router.put('/:id', playersCtrl.update)

export {
  router
}