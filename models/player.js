import mongoose from "mongoose"

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: String,
  avatar: String,
  year: Number,
  team: String,
  stats: String,
  firstOfKind: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Player = mongoose.model('Player', playerSchema)

export {
  Player
}