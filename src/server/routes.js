import { user } from './controllers'

export default (app) => {
  app.post('/user/login', user.login)
  app.post('/user/logout', user.logout)
  app.post('/user/create', user.create)
  app.get('/user/read', user.read)
  app.get('/user/read/:id', user.read)
  app.post('/user/update/:id', user.update)
  app.delete('/user/delete/:id', user.remove)
}
