import OrderCreateForBooksException from '#exceptions/OrderCreateForBooksException'
import Book from '#models/book'
import Order from '#models/order'
import { OrderCreateDTO } from '../dtos/OrderCreateDTO.js'
import { OrderStatusEnum } from '../enums/OrderStatusEnum.js'

interface OrderCreateError {
  bookId: number
  error: string
}

export class OrderService {
  async getAll() {
    const orders = await Order.query().preload('books', (b) => {
      b.orderBy('id')
    })

    return orders.map((order) => {
      return {
        id: order.id,
        status: order.status,
        itens: order.books.map(this.getBook),
        total: this.getOrderTotalField(order),
      }
    })
  }

  async create(order: OrderCreateDTO) {
    const bookIds = order.books.map((book) => book.id)
    const books = await Book.query().whereIn('id', bookIds)
    const booksMap = new Map(books.map((book) => [book.id, book]))

    const errors: OrderCreateError[] = []
    for (const book of order.books) {
      const bookItem = booksMap.get(book.id)
      if (!bookItem) {
        errors.push({
          bookId: book.id,
          error: `Livro #${book.id} não encontrado`,
        })
      } else if (book.quantidade > bookItem.estoque) {
        errors.push({
          bookId: bookItem.id,
          error: `Livro ${bookItem.titulo} fora de estoque`,
        })
      }
    }

    if (errors.length > 0) {
      throw new OrderCreateForBooksException(errors)
    }

    const newOrder = await Order.create({
      status: OrderStatusEnum.PAID,
    })

    for (const book of order.books) {
      await newOrder.related('books').attach({
        [book.id]: {
          quantidade: book.quantidade,
        },
      })
      const bookItem = await Book.query().where('id', book.id).first()
      bookItem!.estoque = bookItem!.estoque - book.quantidade
      await bookItem?.save()
    }

    return newOrder
  }

  private getOrderTotalField(order: Order) {
    const total = order.books.reduce((acc, books) => {
      const quantidade = books.$extras.pivot_quantidade
      return acc + quantidade * books.preco
    }, 0)

    return total
  }

  private getBook(book: Book) {
    return {
      id: book.id,
      titulo: book.titulo,
      autor: book.autor,
      quantidade: book.$extras.pivot_quantidade,
    }
  }
}
