import { Profile } from "../models/profile.js"
import { Team } from "../models/team.js"
import { Player } from "../models/player.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      title: 'Profiles',
      profiles
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('favTeams')
  .populate('roster')
  .then(profile => {
    Team.find({_id: {$nin: profile.favTeams}})
    .then(favTeams => {
      Player.find({_id: {$nin: profile.roster}})
      .then(player => {
        const self = profile._id.equals(req.user.profile._id)
        const seperateNames = profile.name.split(' ')
        res.render('profiles/show', {
          title: `Profile: ${profile.name}`,
          profile,
          favTeams,
          player,
          firstName: seperateNames[0],
          self
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToFavTeams(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.favTeams.push(req.body.favTeamId)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/profiles')
  })
}

function deleteFavTeam(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.favTeams.remove({_id: req.params.favTeamId})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/profiles')
  })
}

function addToRoster(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    console.log('PROFILE ROSTER', profile.roster)
    profile.roster.push(req.body.playerId)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/profiles')
  })
}

function deletePlayer(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.roster.remove({_id: req.params.playerId})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/profiles')
  })
}

export {
  index,
  show,
  addToFavTeams,
  deleteFavTeam,
  addToRoster,
  deletePlayer
}