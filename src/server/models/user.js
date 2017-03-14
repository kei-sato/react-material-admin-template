import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'

// eslint-disable-next-line prefer-const
let schema = new mongoose.Schema({
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String }, // not unique name
}, { timestamps: true })

// attach id to the results of toJSON which is called on res.send
schema.set('toJSON', { virtuals: true })

/**
 * Password hash middleware.
 */
schema.pre('save', function preSave(next) {
  // eslint-disable-next-line no-var
  var user = this
  if (!user.name) user.name = user.loginId
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

/*
 Defining our own custom document instance method
 */
schema.methods = {
  comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return callback(err)
      callback(null, isMatch)
    })
  },
}

export default mongoose.model('User', schema)
