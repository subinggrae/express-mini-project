// express 모듈 불러오기
const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

const db = new Map();
const currentIndex = (function() {
  let id = 1;

  return {
    increase() {
      return id++;
    }
  } 
}());

/**
 * @Path /channels
 * @Method [GET, POST]
 */
app.route('/channels')
  .get((req, res) => {
    const channels = [];

    channels.push(...db.values());

    res.status(200).json(channels);
  })
  .post((req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).end();
    }

    db.set(currentIndex.increase(), req.body);
    res.status(201).json({ message: '성공적으로 채널을 생성하였습니다.' });
  });

/**
 * @Path /channels/{id}
 * @Method [GET, PUT, DELETE]
 */
app.route('/channels/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const channel = db.get(id);

    if (!channel) {
      return res.status(404).end();
    }

    res.status(200).json(channel);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id);
    const channel = db.get(id);
    const { title } = req.body;

    if (!title) {
      return res.status(400).end();
    }
    if (!channel) {
      return res.status(404).end();
    }

    db.set(id, req.body);
    res.status(200).json({ message: '수정이 정상적으로 완료되었습니다.' });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);

    if (!db.get(id)) {
      return res.status(404).end();
    }

    db.delete(id);
    res.status(200).json({ message: '채널 삭제가 완료되었습니다.' });
  });