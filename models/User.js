const {Schema, model, Types} = require('mongoose');

// Имя
// Фамилия
// Отчество
// Логин
// Пароль
// Руководитель - пользователь
//   leader: {},
//   team: {}

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  otherName: {type: String, required: true},
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  secret: {type: String, required: true},
  isLeader: {type: Boolean, default: false},
  leader: {type: String},
  team: {type: Array}
});

module.exports = model('User', schema);