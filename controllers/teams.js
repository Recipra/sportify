import { Team } from "../models/team.js"

function newTeam(req, res) {
  Team.find({})
  .then(teams => {
    res.render('teams/new', {
      title: 'Add a Team',
      teams
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/teams/new')
  })
}

function create(req, res) {
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