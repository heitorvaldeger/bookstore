export const MessagesValidation = {
  MUST_BE_REQUIRED: "O campo é obrigatório",
  MUST_BE_VALID_EMAIL: "O campo deve ser um e-mail válido",
  MUST_BE_STRING_LEAST: (length: number) =>
    `O campo deve conter ao menos ${length} caractere(s)`,
  MUST_BE_URL_VALID: "O campo deve ser um endereço URL válido",
  MUST_BE_NUMBER: "O campo deve ser um número",
};
