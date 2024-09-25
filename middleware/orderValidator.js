const { param, body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const validateIdParam = param('id')
  .notEmpty()
  .withMessage('주문 아이디를 입력해주세요.')
  .isInt()
  .withMessage('숫자만 입력 가능합니다.')

const validateIcecream =  [
  body('flavor')
    .notEmpty()
    .withMessage('아이스크림 맛을 입력해주세요.'),
  body('size')
    .notEmpty()
    .withMessage('아이스크림 사이즈를 입력해주세요.'),
  body('quantity')
    .notEmpty()
    .withMessage('아이스크림 수량를 입력해주세요.')
    .isInt()
    .withMessage('수량은 숫자 형식입니다.'),
  body('price')
    .notEmpty()
    .withMessage('총 가격을 입력해주세요.')
    .isInt()
    .withMessage('총 가격은 숫자 형식입니다.')
];

const idValidation = [
  validateIdParam,
  validate
]

const createOrderValidation = [
  ...validateIcecream,
  body('userId')
    .notEmpty()
    .withMessage('주문한 사용자 아이디를 입력해주세요.')
    .isInt()
    .withMessage('사용자 아이디는 숫자 형식입니다.'),
  validate
]

const updateOrderValidation = [
  validateIdParam,
  ...validateIcecream,
  validate
]

module.exports = {
  idValidation,
  createOrderValidation,
  updateOrderValidation
}