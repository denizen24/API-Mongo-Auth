/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = req.cookies.jwt;
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, 'password-secret-key');
    console.log(payload);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload._id; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
