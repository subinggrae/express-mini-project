const db = require('../db');

const createUser = async (username, password) => {
  const sql = 'INSERT INTO `user` (username, password) VALUES (?, sha2(?, 256))';
  const params = [username, password];

  await db.query(sql, params);
}

const findUser = async (username, password) => {
  const sql = 'SELECT * FROM `user` WHERE username = ? AND password = sha2(?, 256)';
  const params = [username, password];

  const [rows] = await db.query(sql, params);

  return rows.length ? rows[0] : null;
}

const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM `user` WHERE username = ?';
  const params = [username];

  const [rows] = await db.query(sql, params);

  return rows.length ? rows[0] : null;
};

const deleteUserByUsername = async (username) => {
  const sql = 'DELETE FROM `user` WHERE username = ?';
  const params = [username];

  const [result] = await db.query(sql, params);

  return result.affectedRows;
}

module.exports = {
  createUser,
  findUser,
  getUserByUsername,
  deleteUserByUsername
}