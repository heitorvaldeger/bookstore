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
  descricao?: string | null;
  preco: number;
  imagem?: string | null;
  estoque: number;
  categoria: BookCategoryEnum;
}
