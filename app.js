const express=require('express')
const path=require('path')
const session=require('express-session')
const flash= require('connect-flash')
const sequelize=require('./database/db')

const Product=require('./models/products')
const authRoutes=require('./routes/auth')
const pagesRoute=require('./routes/pages')
const cookieParser=require('cookie-parser')
const expressSession=require('express-session')
const bodyParser=require('body-parser')
const User=require('./models/users')
const multer = require('multer')

const app=express()


app.use(cookieParser())
app.use(expressSession({
        secret:'y-store',
        resave:false,
        saveUninitialized:false,
        cookie:{secure:false},
        
}))
app.use(flash())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
 let storage = multer.diskStorage({
        destination:(req,file, cd)=>{
           cd(null,'public/images')
        },
        filename:(req,file,cb)=>{
                // console.log(req.body)
                // let extention=file.mimetype.split('/')[1]
                // console.log(extention)
                cb(null,Date.now()+"-"+'picture'+file.originalname)
        }
 })
 app.use(multer({storage:storage}).single('image'))
app.set('view engine','ejs')
app.use((req, res, next)=>{
    User.findByPk(1).then(user=>{
    req.user=user
    next()
    })
   
 })


app.use(pagesRoute)
app.use(authRoutes)


sequelize.sync()
// User.sync({alter:true})

app.listen(3000,()=>{
        console.log('port working')
})


