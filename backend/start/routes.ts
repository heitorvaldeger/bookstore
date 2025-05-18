/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const BookController = () => import('#controllers/BookController')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('', [BookController, 'getAll'])
    router.get('filter', [BookController, 'getBooksByCategory'])
    router.post('', [BookController, 'create'])
    router.put(':id', [BookController, 'update'])
  })
  .prefix('books')
