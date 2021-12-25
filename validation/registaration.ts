import { body } from 'express-validator';

export const regValidation = [
   body('email', 'Введите email')
      .isEmail()
      .withMessage('Неверный формат email')
      .isLength({ min: 5, max: 35 })
      .withMessage('Min count of characters is 5, and max count is 35'),

   body('password', 'Укажите пароль')
      .isString()
      .isLength({
         min: 6,
         max: 50
      })
      .withMessage('Минимальный длина пароля - 6 символов')
]