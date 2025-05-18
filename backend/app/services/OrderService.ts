import BookNotFoundException from '#exceptions/BookNotFoundException'
import OrderCreateForBooksException from '#exceptions/OrderCreateForBooksException'
import BookOutStockException from '#exceptions/OrderCreateForBooksException'
import Book from '#models/book'
import Order from '#models/order'
import { OrderCreateDTO } from '../dtos/OrderCreateDTO.js'
import { OrderStatusEnum } from '../enums/OrderStatusEnum.js'

interface OrderCreateError {
  bookId: number
  bookTitle: string
  error: string
}

export class OrderService {
  async getAll() {
    const orders = await Order.query().preload('books')

    return orders.map((order) => {
      return {
        id: order.id,
        status: order.status,
        items: order.books.map(this.getBook),
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
          bookTitle: book.title,
          error: `Book ${book.title} not found`,
        })
      } else if (book.quantity > bookItem.stock) {
        errors.push({
          bookId: bookItem.id,
          bookTitle: bookItem.title,
          error: `Book ${bookItem.title} out of stock`,
        })
      }
    }

    if (errors.length > 0) {
      throw new OrderCreateForBooksException(errors)
    }

    const newOrder = await Order.create({
      status: OrderStatusEnum.PENDING,
    })

    for (const book of order.books) {
      await newOrder.related('books').attach({
        [book.id]: {
          quantity: book.quantity,
        },
      })
      const bookItem = await Book.query().where('id', book.id).first()
      bookItem!.stock = bookItem!.stock - book.quantity
      await bookItem?.save()
    }

    return newOrder
  }

  private getOrderTotalField(order: Order) {
    const total = order.books.reduce((acc, books) => {
      const quantity = books.$extras.pivot_quantity
      return acc + quantity * books.price
    }, 0)

    return total
  }

  private getBook(book: Book) {
    return {
      id: book.id,
      title: book.title,
      quantity: book.$extras.pivot_quantity,
    }
  }
}
