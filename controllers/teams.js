import { Team } from "../models/team.js"

function newTeam(req, res) {
  Team.find({})
  .then(teams => {
    res.render('teams/new', {
      title: 'Add a Team',
      teams,
      user: req.user ? req.user : null
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/teams/new')
  })
}

function create(req, res) {
  const teamName = `${req.body.name}`
  const formattedName = teamName.toLowerCase().replace(/\w\S*/g, (text) => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  })
  req.body.name = formattedName
  Team.create(req.body)
  .then(team => {
    res.redirect('/teams/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/teams/new')
  })
}

export {
  newTeam as new,
  create
}