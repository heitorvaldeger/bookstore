export interface OrderCreateDTO {
  books: {
    id: number
    quantidade: number
  }[]
}
