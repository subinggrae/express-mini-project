const express = require('express');
const orderModel = require('../models/order');
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
  .get(async (req, res) => {
    const orders = await orderModel.getAllOrders();

    res.status(200).json(orders);
  })
  .post(async (req, res) => {
    const { flavor, size, quantity, price, userId } = req.body;

    if (!(flavor && size && quantity && price && userId)) {
      return res.status(400).json({ error: '올바른 사용자 입력이 아닙니다.'});
    }

    try {
      await orderModel.createOrder([flavor, size, quantity, price, userId]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '서버에서 주문을 처리할 수 없습니다.' });
    }

    db.set(currentIndex.increase(), req.body);
    res.status(201).json({ message: '성공적으로 주문하였습니다.' });
  });

/**
 * @Path /orders/{id}
 * @Method [GET, PUT, DELETE]
 */
router.route('/:id')
  .get(async (req, res) => {
    const id = parseInt(req.params.id);
    const order = await orderModel.getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: '해당하는 주문을 찾을 수 없습니다.' });
    }

    res.status(200).json(order);
  })
  .put(async (req, res) => {
    const id = parseInt(req.params.id);
    const { flavor, size, quantity, price } = req.body;

    if (!(flavor && size && quantity && price)) {
      return res.status(400).json({ error: '올바른 사용자 입력이 아닙니다.'});
    }

    const updateRows = await orderModel.updateOrderById(id, [flavor, size, quantity, price]);

    if (updateRows > 0) {
      return res.status(200).json({ message: '주문 수정이 완료되었습니다.' });
    }

    res.status(404).json({ error: '주문을 정상적으로 처리할 수 없습니다.' });
  })
  .delete(async (req, res) => {
    const id = parseInt(req.params.id);
    const deleteRows = await orderModel.deleteOrderById(id);

    if (deleteRows > 0) {
      return res.status(200).json({ message: '주문 취소가 완료되었습니다.' });
    }

    res.status(404).json({ error: '주문을 정상적으로 삭제할 수 없습니다.' });
  });

  module.exports = router;