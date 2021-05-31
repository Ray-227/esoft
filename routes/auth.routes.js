const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /auth/register
router.post(
  '/register', 
  [
    check('firstName', 'Имя должно содержать минимум 3 буквы').isLength({min: 3, max: 50}),
    check('lastName', 'Фамилия должно содержать минимум 3 буквы').isLength({min: 3, max: 50}),
    check('otherName', 'Отчество должно содержать минимум 3 буквы').isLength({min: 3, max: 50}),
    check('login', 'Логин должнен содержать минимум 3 символа').isLength({min: 3, max: 50}),
    check('password', 'Пароль должнен содержать минимум 6 символов').isLength({min: 6, max: 50}),
    check('secret', 'Секретный ключ должен содержать минимум 6 символов').isLength({min: 6, max: 50}),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }
    
    const {
      firstName,
      lastName,
      otherName,
      login,
      password,
      secret,
      leader,
      team
    } = req.body;

    const isUser = await User.findOne({login: login});
    if (isUser) {
      return res.status(400).json({message: 'Такой пользователь уже зарегистрирован в системе'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      otherName: otherName,
      login: login,
      password: hashedPassword,
      secret: secret,
      leader: leader ? leader : '',
      team: team ? team : ''
    });

    await user.save();

    res.status(201).json({message: 'Пользователь успешно создан'});


  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
  }
});


// /auth/login
router.post(
  '/login', 
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      })
    }
    
    const {login, password} = req.body;

    const userLogin = await User.findOne({login: login});
    if(!userLogin) {
      return res.status(400).json({message: 'Пользователь не найден'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
      return res.status(401).json({message: 'Неверный пароль, попробуйте снова'});
    }

    // Пользователь авторизован
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token: token,
      userId: user.id,
      message: 'Авторизация прошла успешно, добро пожаловать снова'
    });


  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
  }
});


module.exports = router;