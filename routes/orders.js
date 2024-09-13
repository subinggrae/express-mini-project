// express 모듈 불러오기
const express = require('express');
const router = express.Router();
router.use(express.json());

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
 * @Path /orders
 * @Method [GET, POST]
 */
router.route('/')
  .get((req, res) => {
    const channels = [];

    channels.push(...db.values());

    res.status(200).json(channels);
  })
  .post((req, res) => {
    const { flavor, size, quantity, price } = req.body;

    if (!(flavor && size && quantity && price)) {
      return res.status(400).end();
    }

    db.set(currentIndex.increase(), req.body);
    res.status(201).json({ message: '성공적으로 주문하였습니다.' });
  });

/**
 * @Path /orders/{id}
 * @Method [GET, PUT, DELETE]
 */
router.route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const order = db.get(id);

    if (!order) {
      return res.status(404).end();
    }

    res.status(200).json(order);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id);
    const order = db.get(id);
    const { flavor, size, quantity, price } = req.body;

    if (!(flavor && size && quantity && price)) {
      return res.status(400).end();
    }
    if (!order) {
      return res.status(404).end();
    }

    db.set(id, req.body);
    res.status(200).json({ message: '주문 수정이 완료되었습니다.' });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);

    if (!db.get(id)) {
      return res.status(404).end();
    }

    db.delete(id);
    res.status(200).json({ message: '주문 취소가 완료되었습니다.' });
  });

  module.exports = router;