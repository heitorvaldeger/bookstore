export enum BookCategoryEnum {
  BIBLE = "bible",
  TEOLOGY = "teology",
  PHILOSOPHY = "philosophy",
  SCIENCE = "science",
  OTHERS = "others",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  imageURL: string;
  stock: number;
  category: BookCategoryEnum;
}
