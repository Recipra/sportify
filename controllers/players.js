import { Profile } from "../models/profile.js"
import { Player } from "../models/player.js"

function newPlayer(req, res) {
  Profile.findById(req.user.profile)
  .then(profile => {
    Player.find({_id: {$nin : profile.roster }})
    .then(players => {
      res.render('players/new', {
        title: 'Add a Player',
        players,
        user: req.user ? req.user : null
      })
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/players/new')
  })
}

function create(req, res) {
  const playerName = `${req.body.name}`
  const formattedName = playerName.toLowerCase().replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  })
  const playerTeam = `${req.body.team}`
  const formattedTeam = playerTeam.toLowerCase().replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  })
  req.body.name = formattedName
  req.body.team = formattedTeam
  Player.create(req.body)
  .then(player => {
    res.redirect('/players/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/players/new')
  })
}

function show(req, res) {
  Player.findById(req.params.id)
  .then(player => {
    const playerStats = player.stats.split(', ')
    const games = playerStats[0]
    const points = playerStats[1]
    const rebounds = playerStats[2]
    const assists = playerStats[3]
    const blocks = playerStats[4]
    res.render('players/show', {
      title: `${player.name}`,
      player,
      games,
      points,
      rebounds,
      assists,
      blocks,
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newPlayer as new,
  create,
  show
}