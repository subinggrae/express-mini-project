// express 모듈 불러오기
const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

// 회원 정보
const db = new Map();

// 로그인
app.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (!(id && password)) {
    return res.status(400).end();
  }

  if (!db.get(id)) {
    return res.status(200).json({ message: '아이디와 비밀번호를 확인해주세요.' });
  }

  if (password !== db.get(id).password) {
    return res.status(200).json({ message: '아이디와 비밀번호를 확인해주세요.' });
  }

  res.status(200).json({ message: '로그인 성공!' });
})

// 회원가입
app.post('/join', (req, res) => {
  const { id, password, name } = req.body;

  if (!(id && password && name)) {
    return res.status(400).end();
  }

  if (db.get(id)) {
    return res.status(409).json({ message: '이미 가입된 아이디입니다.' });
  }

  db.set(id, req.body);
  res.status(201).json({ message : '정상적으로 회원가입이 완료되었습니다.' });
})

// 회원 개별 조회
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!db.get(id)) {
    return res.status(404).end();
  }

  res.status(200).json(db.get(id));
})

// 회원 개별 삭제
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!db.get(id)) {
    return res.status(404).end();
  }

  db.delete(id);
  res.status(200).json({ message: '정상적으로 회원탈퇴가 완료되었습니다.'})
})