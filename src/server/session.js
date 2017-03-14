import session from 'express-session'
import connectMongo from 'connect-mongo'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { MONGO_URL } from '../shared/config'
import { User } from './models'

const MongoStore = connectMongo(session)

const sessionOptions = {
  name: 'sessionId',
  secret: 'qwertyverysecure',
  resave: false,
  saveUninitialized: false,
  proxy: true, // The 'X-Forwarded-Proto' header will be used.
  store: new MongoStore(
    {
      url: MONGO_URL,
      autoReconnect: true,
    },
  ),
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}

export default (app) => {
  passport.use(new Strategy({
    usernameField: 'loginId',
  }, (loginId, password, done) => {
    User.findOne({ loginId }).select('+password').exec((err, user) => {
      if (err) return done(err)
      if (!user) return done(new Error(`user not found for id: ${loginId}`))
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) return done(null, user)
        done(new Error('Invalid id or password'))
      })
    })
  }))

  passport.serializeUser((user, callback) => {
    if (!user) return callback('user is empty')
    callback(null, user._id)
  })

  passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
      if (err) return callback(err)
      callback(err, user.toObject())
    })
  })

  app.use(session(sessionOptions))
  app.use(passport.initialize())
  app.use(passport.session())
}
