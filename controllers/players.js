import { Profile } from "../models/profile.js"
import { Player } from "../models/player.js"

function index(req, res) {
  Player.find({})
  .then(players => {
    res.render('players/index', {
      title: 'Sportify Basketball',
      players,
      user: req.user ? req.user : null
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/basketball')
  })
}

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
    res.render('players/show', {
      title: `${player.name}`,
      player,
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/players/new')
  })
}

function edit(req, res) {
  Player.findById(req.params.id)
  .then(player => {
    res.render('players/edit', {
      title: `Edit ${player.name}, ${player.year}`,
      player
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/players/new')
  })
}

function update(req, res) {
  Player.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(player => {
    res.redirect(`/players/${req.params.id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/players')
  })
}

export {
  index,
  newPlayer as new,
  create,
  show,
  edit,
  update
}