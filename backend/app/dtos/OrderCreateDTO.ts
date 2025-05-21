export interface OrderCreateDTO {
  books: {
    id: number
    title: string
    quantidade: number
  }[]
}
