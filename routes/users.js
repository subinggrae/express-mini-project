// express 모듈 불러오기
const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
router.use(express.json());

// 로그인
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ error: '제대로 된 사용자 요청이 아닙니다.'});
  }

  const user = await userModel.findUser(username, password);
  
  if (!user) {
    return res.status(200).json({ message: '아이디와 비밀번호를 확인해주세요.' });
  }

  res.status(200).json({ message: '로그인 성공!' });
})

// 회원가입
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json({ error: '제대로 된 사용자 요청이 아닙니다.'});
  }

  try {
    await userModel.createUser(username, password);
  } catch (error) {
    return res.status(409).json({ error: '회원가입을 정상적으로 처리할 수 없습니다.' });
  }

  res.status(201).json({ message : `${username}님 회원이 되신 것을 진심으로 환영합니다.` });
})

// 회원 개별 조회 & 삭제
router.route('/users/:username')
  .get( async (req, res) => {
    const username = req.params.username;
    const user = await userModel.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
    }

    console.log(user);
    res.status(200).json(user);
  })
  .delete( async (req, res) => {
    const username = req.params.username;
    const affectedRows = await userModel.deleteUserByUsername(username);

    if (!affectedRows) {
      return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '정상적으로 회원탈퇴가 완료되었습니다.' });
  });

module.exports = router;