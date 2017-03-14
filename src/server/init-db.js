import mongoose from 'mongoose'

import { MONGO_URL } from '../shared/config'
import { User } from './models'

const users = [
  { loginId: 'kindle', password: 'kindle' },
  { loginId: 'macbook', password: 'macbook' },
]

export default () => {
  // MongoDB Connection
  mongoose.connect(MONGO_URL, (err) => {
    if (err) {
      console.error('Please make sure Mongodb is installed and running!') // eslint-disable-line no-console
      throw err
    }

    // initial user
    User.count().exec((err, count) => {
      if (count > 0) return
      users.forEach((user) => {
        const userInstance = new User(user)
        userInstance.save((err) => { if (err) console.error(err) })
      })
    })
  })
}
