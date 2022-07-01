import { Player } from "../models/player.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .populate('roster')
  .then(profiles => {
    const lastPlayers = profiles.map(profile => {
      const roster = profile.roster
      const lastPlayer = roster[0]
      const lastPlayerName = lastPlayer?.name
      const result = lastPlayerName ? lastPlayerName : null
      return result
    })
    res.render('basketball/index', {
      profiles,
      title: 'Sportify Basketball',
      lastPlayers,
      user: req.user ? req.user : null
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  index
}