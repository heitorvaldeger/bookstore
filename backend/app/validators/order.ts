import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
  vine.object({
    cliente: vine.string().maxLength(100),
    books: vine
      .array(
        vine.object({
          id: vine.number().positive(),
          quantidade: vine.number().positive(),
        })
      )
      .notEmpty(),
  })
)
