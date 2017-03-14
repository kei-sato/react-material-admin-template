import mongoose from 'mongoose'
import passport from 'passport'
import { User } from '../models'

export const create = (req, res, next) => {
  const { loginId, password } = req.body
  if (!loginId) return next(new Error('username is empty'))
  if (!password) return next(new Error('password is empty'))
  const user = new User({ loginId, password })
  user.save()
  .then((user) => {
    res.send(user)
  }).catch(next)
}

export const read = (req, res, next) => {
  const { id } = req.params
  if (id) {
    User.findById(mongoose.Types.ObjectId(id))
    .then(user => res.send(user))
    .catch(next)
  } else {
    User.find({}).sort({ updatedAt: 'desc' }).exec()
    .then(users => res.send(users))
    .catch(next)
  }
}

export const update = (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  if (!id) return next(new Error('id is empty'))

  User.findById(mongoose.Types.ObjectId(id))
  .then((user) => {
    // eslint-disable-next-line no-param-reassign
    if (name) user.name = name
    user.save().then(() => res.send(user)).catch(next)
  }, next)
}

export const remove = (req, res, next) => {
  const { id } = req.params
  if (!id) return next(new Error('id is empty'))
  User.findByIdAndRemove(mongoose.Types.ObjectId(id))
  .then(() => res.status(200).send({}))
  .catch(next)
}

export const login = (req, res, next) => {
  // Do username and password validation for the server
  passport.authenticate('local', (err, user) => {
    if (err) return next(err)
    // Passport exposes a login() function on req (also aliased as logIn())
    // that can be used to establish a login session
    req.login(user, (err) => {
      if (err) return next(err)
      res.status(200).send(user)
    })
  })(req, res, next)
}

export const logout = (req, res) => {
  req.logout()
  res.sendStatus(200)
}
