// express 모듈 불러오기
const express = require('express');
const router = express.Router();
router.use(express.json());

// 회원 정보
const db = new Map();

// 로그인
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).end();
  }

  if (!db.get(username)) {
    return res.status(200).json({ message: '아이디와 비밀번호를 확인해주세요.' });
  }

  if (password !== db.get(username).password) {
    return res.status(200).json({ message: '아이디와 비밀번호를 확인해주세요.' });
  }

  res.status(200).json({ message: '로그인 성공!' });
})

// 회원가입
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).end();
  }

  if (db.get(username)) {
    return res.status(409).json({ message: '이미 가입된 아이디입니다.' });
  }

  db.set(username, req.body);
  res.status(201).json({ message : '정상적으로 회원가입이 완료되었습니다.' });
})

// 회원 개별 조회
router.get('/users/:username', (req, res) => {
  const username = req.params.username;

  if (!db.get(username)) {
    return res.status(404).end();
  }

  res.status(200).json(db.get(username));
})

// 회원 개별 삭제
router.delete('/users/:username', (req, res) => {
  const username = req.params.iusernamed;

  if (!db.get(username)) {
    return res.status(404).end();
  }

  db.delete(username);
  res.status(200).json({ message: '정상적으로 회원탈퇴가 완료되었습니다.'})
})

module.exports = router;