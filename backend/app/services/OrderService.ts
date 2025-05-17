import Book from '#models/book'
import Order from '#models/order'

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
