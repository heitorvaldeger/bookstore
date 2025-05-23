/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BookController = () => import('#controllers/BookController')
const OrderController = () => import('#controllers/OrderController')
const AuthController = () => import('#controllers/AuthController')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
      })
      .prefix('auth')

    router
      .group(() => {
        router.get('/', [BookController, 'getAll'])
        router.get('/search/:id', [BookController, 'getBookById'])
        router.get('/search', [BookController, 'getBooksByFilter'])
        router
          .group(() => {
            router.post('/', [BookController, 'create'])
            router.put('/:id', [BookController, 'update'])
            router.delete('/:id', [BookController, 'delete'])
          })
          .middleware(middleware.auth())
      })
      .prefix('books')

    router
      .group(() => {
        router.get('/', [OrderController, 'getAll'])
        router.post('/', [OrderController, 'create'])
      })
      .prefix('orders')
  })
  .prefix('api')
