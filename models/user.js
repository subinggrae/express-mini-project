const db = require('../db');

const createUser = async (username, password) => {
  await db.query('INSERT INTO `user` (username, password) VALUES (?, sha2(?, 256))', [username, password]);
}

const findUser = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM `user` WHERE username = ? AND password = sha2(?, 256)', [username, password]);

  return rows.length ? rows[0] : null;
}

const getUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM `user` WHERE username = ?', [username]);

  return rows.length ? rows[0] : null;
};

const deleteUserByUsername = async (username) => {
  const [rows] = await db.query('DELETE FROM `user` WHERE username = ?', [username]);

  return rows.affectedRows;
}

module.exports = {
  createUser,
  findUser,
  getUserByUsername,
  deleteUserByUsername
};