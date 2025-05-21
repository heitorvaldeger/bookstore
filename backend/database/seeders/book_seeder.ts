import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BookCategoryEnum } from '../../app/enums/BookCategoryEnum.js'

export default class extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        titulo: 'A Brief History of Time',
        author: 'Stephen Hawking',
        description:
          'A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space? What will happen when it all ends?',
        stock: 12,
        preco: 4590,
        imageURL: 'https://m.media-amazon.com/images/I/91ebghaV-eL.jpg',
        category: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: 'The Selfish Gene',
        author: 'Richard Dawkins',
        stock: 8,
        preco: 3999,
        category: BookCategoryEnum.SCIENCE,
        description:
          "As influential today as when it was first published, The Selfish Gene has become a classic exposition of evolutionary thought. Professor Dawkins articulates a gene's eye view of evolution - a view giving centre stage to these persistent units of information, and in which organisms can be seen as vehicles for their replication.",
        imageURL: 'https://m.media-amazon.com/images/I/61dtRkUbfRL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        titulo: 'The Bible',
        author: 'Various Authors',
        description: 'Sacred scripture in Christianity, containing the Old and New Testaments.',
        stock: 100,
        preco: 2999,
        imageURL: 'https://m.media-amazon.com/images/I/71U0MvNYxpL._AC_UF1000,1000_QL80_.jpg',
        category: BookCategoryEnum.BIBLE,
      },
      {
        titulo: 'Cosmos',
        author: 'Carl Sagan',
        stock: 5,
        preco: 4999,
        imageURL: 'https://m.media-amazon.com/images/I/710C5x4MzwL.jpg',
        description:
          'Renowned astronomer Carl Sagan’s classic bestseller that “dives into the past, present, and future of science, dealing with the mind-staggering enormity of the cosmos in which we exist” (Associated Press)—with an Introduction by Ann Druyan and a Foreword by Neil deGrasse Tyson',
        category: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: 'The Origin of Species',
        author: 'Charles Darwin',
        description:
          "Charles Darwin's classic, which sparked a public uproar, changed the trajectory of science, and has continued to alter how we see the world.",
        stock: 10,
        preco: 4250,
        category: BookCategoryEnum.SCIENCE,
        imageURL: 'https://m.media-amazon.com/images/I/71z2XfoLFfL.jpg',
      },
      {
        titulo: 'To Love and Be Loved: A Personal Portrait of Mother Teresa',
        author: 'Jim Towey',
        description:
          'From a trusted advisor and devoted friend of Mother Teresa comes a “powerful” (The Washington Free Beacon) firsthand account of the miraculous woman behind the saint and a book that is “rich in reflection on contemporary sanctity” (George Weigel).',
        stock: 50,
        preco: 999,
        category: BookCategoryEnum.BIBLE,
        imageURL: 'https://m.media-amazon.com/images/I/71RJKnRyzJL._SY522_.jpg',
      },
      {
        titulo: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        stock: 20,
        preco: 5990,
        description:
          'From renowned historian Yuval Noah Harari comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be “human.”',
        imageURL: 'https://m.media-amazon.com/images/I/716E6dQ4BXL._SY522_.jpg',
        category: BookCategoryEnum.SCIENCE,
      },
      {
        titulo: "God's Stories as told by God's Children",
        author: 'The Bible for Normal People',
        stock: 30,
        preco: 1499,
        category: BookCategoryEnum.BIBLE,
        imageURL: 'https://m.media-amazon.com/images/I/81IlG7Il73L._SY522_.jpg',
        description:
          'Featuring the voices of 55 biblical scholars, theologians, and storytellers from around the world, God’s Stories as told by God’s Children is a beautifully illustrated storybook Bible that integrates biblical scholarship into engaging storytelling.',
      },
      {
        titulo: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        description:
          'In his mega bestseller, Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
        stock: 9,
        preco: 5200,
        category: BookCategoryEnum.SCIENCE,
        imageURL: 'https://m.media-amazon.com/images/I/71wvKXWfcML._SY522_.jpg',
      },
      {
        titulo: 'The Book Thief',
        author: 'Markus Zusak',
        description:
          'The extraordinary, beloved novel about the ability of books to feed the soul even in the darkest of times.',
        stock: 7,
        preco: 3500,
        category: BookCategoryEnum.OTHERS,
        imageURL: 'https://m.media-amazon.com/images/I/81cQAtrq2iL._SY522_.jpg',
      },
    ])
  }
}
