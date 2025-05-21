export enum BookCategoryEnum {
  BIBLE = "bible",
  TEOLOGY = "teology",
  PHILOSOPHY = "philosophy",
  SCIENCE = "science",
  OTHERS = "others",
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  preco: number;
  imagem: string;
  estoque: number;
  categoria: BookCategoryEnum;
}
