import { Player } from "../models/player.js"

function newPlayer(req, res) {
  Player.find({})
  .then(players => {
    res.render('players/new', {
      title: 'Add a Player',
      players,
      user: req.user ? req.user : null
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/players/new')
  })
}

function create(req, res) {
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
    res.redirect('/')
  })
}

export {
  newPlayer as new,
  create,
  show
}