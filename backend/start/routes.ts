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

router
  .group(() => {
    router.get('', [BookController, 'getAll'])
    router.get('search', [BookController, 'getBooksByFilter'])
    router.get('category/:categoryName', [BookController, 'getBooksByCategory'])
    router.post('', [BookController, 'create'])
    router.put(':id', [BookController, 'update'])
    router.delete(':id', [BookController, 'delete'])
  })
  .prefix('books')
