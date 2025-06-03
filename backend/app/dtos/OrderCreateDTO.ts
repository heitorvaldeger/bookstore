export interface OrderCreateDTO {
  cliente: string
  books: {
    id: number
    quantidade: number
  }[]
}
