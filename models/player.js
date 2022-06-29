import mongoose from "mongoose"

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {type: String, required: true},
  image: String,
  year: {type: Number, required: true},
  team: {type: String, required: true},
  games: Number,
  points: Number,
  rebounds: Number,
  assists: Number,
  blocks: Number,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

export {
  Player
}