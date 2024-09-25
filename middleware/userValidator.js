const { param, body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

const usernameValidation = [
  param('username')
    .notEmpty()
    .withMessage('아이디를 입력해주세요.'),
  validate
];

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('아이디를 입력해주세요'),
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요.'),
  validate
]

const registerValidation = [
  body('username')
    .matches(/^[a-z0-9-_]+$/)
    .withMessage('아이디는 영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.')
    .isLength({ min: 5, max: 20})
    .withMessage('아이디는 5에서 20자 범위에서 사용 가능합니다.'),
  body('password')
    .matches(/^[A-Za-z\d!@#$%^&*]+$/)
    .withMessage('비밀번호는 영문 대/소문자, 숫자, 특수문자만 사용 가능합니다.')
    .isLength({ min: 8, max: 16 })
    .withMessage('비밀번호는 8에서 16자 범위에서 사용 가능합니다.'),
    validate
];

module.exports = {
  usernameValidation,
  loginValidation,
  registerValidation
}