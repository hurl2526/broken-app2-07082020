const {waterfall} = require('async')

const faker = require('faker')
const Product = require('../products/models/Product')
const Category = require('../categories/models/Category');


const createProduct = (req, res, next) => {
  const category = new Category();
  category.name = req.body.name;
  category
    .save()
    .then(() => {
      waterfall([
        (callback) =>{
          Category.findOne({name:req.body.name},(err,category)=>{
            if(err)return next(err)
            callback(null,category)
          })
        },
        (category)=>{
          for(let i = 0;i<24;i++){
            const product = new Product();
            product.category =  category._id
            product.name = faker.commerce.productName();
            product.price = faker.commerce.price();
            product.image = `/images/products2/${i}.jpg`;
            product.description = faker.lorem.paragraph();
            product.save();
    
          }
        }
      ])
      req.flash('messages', `Successfully added ${req.body.name} Category and 24 products`);
      return res.redirect('/api/admin/add-category')
      // return res.redirect('/api/admin/add-category');
      // res.json({message:'Success',category:savedCategory})
      // return res.redirect(`/api/admin/create-product/${savedCategory.name}`);
    })
    .catch((err) => {
      if (err.code === 11000) {
        req.flash('errors', 'Category exists');
        return res.redirect('/api/admin/add-category');
      } else {
        return next(err);
      }
    });
};

module.exports = createProduct;