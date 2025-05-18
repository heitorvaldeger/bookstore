import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    books: vine.array(
      vine.object({
        id: vine.number().positive(),
        title: vine.string().minLength(3),
        quantity: vine.number().positive(),
      })
    ),
  })
)
