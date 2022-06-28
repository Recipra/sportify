import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/favTeams', profilesCtrl.addToFavTeams)
router.delete('/:id/favTeams/:favTeamId', profilesCtrl.deleteFavTeam)
router.post('/:id/roster', profilesCtrl.addToRoster)
router.delete('/:id/roster/:playerId', profilesCtrl.deletePlayer)

export {
  router
}