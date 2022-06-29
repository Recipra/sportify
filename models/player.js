import mongoose from "mongoose"

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  image: String,
  year: Number,
  team: String,
  stats: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

export {
  Player
}