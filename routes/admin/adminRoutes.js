const router = require('express').Router();

// const { validationResult } = require('express-validator');
// const { waterfall } = require('async');
// const faker = require('faker');

// const Product = require('./products/models/Product');
// const Category = require('./categories/models/Category');
const checkCategory = require('./categories/utils/checkCategory');
const productCreator = require('./helpers/createProducts')
const validateCategory= require('./adminValidation/categoryValidation')


router.get('/add-category', (req, res, next) => {
  return res.render('admin/add-category');
});

router.post('/add-category', checkCategory, validateCategory,productCreator)

module.exports = router;
