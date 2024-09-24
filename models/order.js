const db = require('../db');

const createOrder = async (order) => {
  const sql = 'INSERT INTO `order` (flavor, size, quantity, price, user_id) VALUES (?, ?, ?, ?, ?);';
  const params = order;

  await db.query(sql, params);
}

const getAllOrders = async () => {
  const sql = 'SELECT * FROM `order`;';

  const [rows] = await db.query(sql);

  return rows;
}

const getOrderById = async (id) => {
  const sql = 'SELECT * FROM `order` WHERE id = ?;';
  const params = [id];

  const [rows] = await db.query(sql, params);

  return rows.length ? rows[0] : null;
}

const updateOrderById = async (id, order) => {
  const sql = 'UPDATE `order` SET flavor = ?, size = ?, quantity = ?, price = ? WHERE id = ?;';
  const params = [...order, [id]];

  const [result] = await db.query(sql, params);

  return result.affectedRows;
}

const deleteOrderById = async (id) => {
  const sql = 'DELETE FROM `order` WHERE id = ?';
  const params = [id];

  const [result] = await db.query(sql, params);

  return result.affectedRows;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
}