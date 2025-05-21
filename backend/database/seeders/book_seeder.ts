import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'

export default class extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        titulo: 'A Brief History of Time',
        autor: 'Stephen Hawking',
        descricao:
          'A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends?',
        estoque: 12,
        preco: 4590,
        imagem: 'https://m.media-amazon.com/images/I/91ebghaV-eL.jpg',
        categoria: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: 'The Selfish Gene',
        autor: 'Richard Dawkins',
        estoque: 8,
        preco: 3999,
        categoria: BookCategoryEnum.SCIENCE,
        descricao:
          "As influential today as when it was first published, The Selfish Gene has become a classic exposition of evolutionary thought. Professor Dawkins articulates a gene's eye view of evolution - a view giving centre stage to these persistent units of information, and in which organisms can be seen as vehicles for their replication.",
        imagem: 'https://m.media-amazon.com/images/I/61dtRkUbfRL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        titulo: 'The Bible',
        autor: 'Various Authors',
        descricao: 'Sacred scripture in Christianity, containing the Old and New Testaments.',
        estoque: 100,
        preco: 2999,
        imagem: 'https://m.media-amazon.com/images/I/71U0MvNYxpL._AC_UF1000,1000_QL80_.jpg',
        categoria: BookCategoryEnum.BIBLE,
      },
      {
        titulo: 'Cosmos',
        autor: 'Carl Sagan',
        estoque: 5,
        preco: 4999,
        imagem: 'https://m.media-amazon.com/images/I/710C5x4MzwL.jpg',
        descricao:
          'Renowned astronomer Carl Sagan’s classic bestseller that “dives into the past, present, and future of science, dealing with the mind-staggering enormity of the cosmos in which we exist” (Associated Press)—with an Introduction by Ann Druyan and a Foreword by Neil deGrasse Tyson',
        categoria: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: 'The Origin of Species',
        autor: 'Charles Darwin',
        descricao:
          "Charles Darwin's classic, which sparked a public uproar, changed the trajectory of science, and has continued to alter how we see the world.",
        estoque: 10,
        preco: 4250,
        categoria: BookCategoryEnum.SCIENCE,
        imagem: 'https://m.media-amazon.com/images/I/71z2XfoLFfL.jpg',
      },
      {
        titulo: 'To Love and Be Loved: A Personal Portrait of Mother Teresa',
        autor: 'Jim Towey',
        descricao:
          'From a trusted advisor and devoted friend of Mother Teresa comes a “powerful” (The Washington Free Beacon) firsthand account of the miraculous woman behind the saint and a book that is “rich in reflection on contemporary sanctity” (George Weigel).',
        estoque: 50,
        preco: 999,
        categoria: BookCategoryEnum.BIBLE,
        imagem: 'https://m.media-amazon.com/images/I/71RJKnRyzJL._SY522_.jpg',
      },
      {
        titulo: 'Sapiens: A Brief History of Humankind',
        autor: 'Yuval Noah Harari',
        estoque: 20,
        preco: 5990,
        descricao:
          'From renowned historian Yuval Noah Harari comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.”',
        imagem: 'https://m.media-amazon.com/images/I/716E6dQ4BXL._SY522_.jpg',
        categoria: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: "God's Stories as told by God's Children",
        autor: 'The Bible for Normal People',
        estoque: 30,
        preco: 1499,
        categoria: BookCategoryEnum.BIBLE,
        imagem: 'https://m.media-amazon.com/images/I/81IlG7Il73L._SY522_.jpg',
        descricao:
          'Featuring the voices of 55 biblical scholars, theologians, and storytellers from around the world, God’s Stories as told by God’s Children is a beautifully illustrated storybook Bible that integrates biblical scholarship into engaging storytelling.',
      },
      {
        titulo: 'Thinking, Fast and Slow',
        autor: 'Daniel Kahneman',
        descricao:
          'In his mega bestseller, Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
        estoque: 9,
        preco: 5200,
        categoria: BookCategoryEnum.SCIENCE,
        imagem: 'https://m.media-amazon.com/images/I/71wvKXWfcML._SY522_.jpg',
      },
      {
        titulo: 'The Book Thief',
        autor: 'Markus Zusak',
        descricao:
          'The extraordinary, beloved novel about the ability of books to feed the soul even in the darkest of times.',
        estoque: 7,
        preco: 3500,
        categoria: BookCategoryEnum.OTHERS,
        imagem: 'https://m.media-amazon.com/images/I/81cQAtrq2iL._SY522_.jpg',
      },
    ])
  }
}
