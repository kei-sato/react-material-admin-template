import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import express from 'express'

import session from './session'
import routes from './routes'
import initDb from './init-db'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { isProd } from '../shared/util'
import indexHtml from './indexHtml'

const server = express()

server.use(compression())
server.use(bodyParser.json())
server.use(methodOverride())
// for parsing application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))
server.use(STATIC_PATH, express.static('dist'))
server.use(STATIC_PATH, express.static('public'))

session(server)
routes(server)

initDb()

server.get('*', (req, res) => {
  const user = req.user || {}
  const isAuthenticated = req.isAuthenticated()
  res.send(indexHtml({ user: Object.assign({}, user, { isAuthenticated }) }))
})

// error handler
server.use((err, req, res, next) => {
  if (!err) return next()
  console.error(err.stack)
  res.status(err.status || 500)
  res.send({
    message: err.message ? err.message : err,
  })
})

server.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
