import { Router } from 'express'
import * as basketballCtrl from '../controllers/basketball.js'

const router = Router()

router.get('/', basketballCtrl.index)

export {
  router
}