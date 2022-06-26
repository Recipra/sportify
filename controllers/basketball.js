import { Player } from "../models/player.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('basketball/index', {
      profiles,
      title: 'Sportify Basketball',
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