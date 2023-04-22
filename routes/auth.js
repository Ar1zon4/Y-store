const router=require('express').Router()
const authController=require('../controllers/auth') 
const {check}=require('express-validator')


router.get('/login', authController.loginPage);
router.post('/login',[
  check('email').notEmpty().withMessage('Your email required')
  .isEmail().withMessage('Your email does not match').trim(),
  check('password').notEmpty().trim()

], authController.login);
// router.get('/register', authController.registerPage);
// router.post('/register',[
//   check('email').notEmpty().withMessage('Your email is required').isEmail().withMessage('invalid email').normalizeEmail(),
//   check('phone').notEmpty().withMessage('Your phone number is required').isNumeric().withMessage('Your phone number must contain 11 numbers').isLength({max:11}),
//   check('password').notEmpty().withMessage('Your password must contain more the 7 characters').isAlphanumeric(),
//   check('confirm_password').notEmpty().withMessage('Confirm password must not be empty')

// ], authController.register);

router.get('/forgotpassword', authController.forgot)
router.post('/forgotpassword',[
    check('email','email is required').notEmpty().isEmail().normalizeEmail(),

],
authController.forgotpass)

router.get('/retrive/:token', authController.retrivePassword);








module.exports=router