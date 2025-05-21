export interface OrderCreateDTO {
  books: {
    id: number
    titulo: string
    quantidade: number
  }[]
}
