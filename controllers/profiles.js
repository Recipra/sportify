import { Profile } from "../models/profile.js"
import { Team } from "../models/team.js"

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
  .then(profile => {
    Team.find({_id: {$nin: profile.favTeams}})
    .then(favTeams => {
      const self = profile._id.equals(req.user.profile._id)
      res.render('profiles/show', {
        title: `Profile: ${profile.name}`,
        profile,
        favTeams,
        self
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

export {
  index,
  show,
  addToFavTeams,
  deleteFavTeam
}