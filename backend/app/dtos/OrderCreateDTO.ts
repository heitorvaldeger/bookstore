export interface OrderCreateDTO {
  books: {
    id: number
    title: string
    quantity: number
  }[]
}
