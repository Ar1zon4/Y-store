
const pagesController=require('../controllers/pages')
const { route } = require('./auth')
const router=require('express').Router()
// const {isEmpty}=require('validator')
// const {check}=require('express-validator')

// router.get('/index', pagesController.indexPage)
router.get('/index',pagesController.readPage)


router.get('/add-user',pagesController.addUser)
router.post('/add-user',pagesController.addUserpage)

router.get('/update-user/:id',pagesController.updateUserId)
router.post('/update-user',pagesController.updateUser)

router.get('/update-product/:id',pagesController.updateProductId)
router.post('/update-product',pagesController.updateProduct)

router.get('/add-product',pagesController.addProductpage)
router.post('/add-product',pagesController.addProduct)

router.get('/product-index', pagesController.readProduct)

router.get('/indexdashboard', pagesController.readP)

router.post('/delete-user',pagesController.deleteUser)
router.post('/delete-product',pagesController.deleteProduct)

router.get('/dashboard', pagesController.dashboardPage )








module.exports=router