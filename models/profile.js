import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: Number,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  roster: [{type: Schema.Types.ObjectId, ref: 'Player'}],
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
