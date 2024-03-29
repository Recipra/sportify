import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as basketballCtrl from '../controllers/basketball.js'

const router = Router()

router.get('/', isLoggedIn, basketballCtrl.index)

export {
  router
}