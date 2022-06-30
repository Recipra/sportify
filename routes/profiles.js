import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/favTeams', isLoggedIn, profilesCtrl.addToFavTeams)
router.delete('/:id/favTeams/:favTeamId', isLoggedIn, profilesCtrl.deleteFavTeam)
router.post('/:id/roster', isLoggedIn, profilesCtrl.addToRoster)
router.delete('/:id/roster/:playerId', isLoggedIn, profilesCtrl.deletePlayer)

export {
  router
}