const User=require('../models/users')
// const Product=require('../models/users')
const crypto=require('crypto')

const user = require('../models/users')
// const User = require('../models/users')
const {validationResult}=require('express-validator/check')
const nodemailer=require('nodemailer')

exports.registerPage=(req,res)=>{
  let errors=req.flash('errors')
  res.render('auth/register' ,{errorMessage:errors})
}

exports.register = (req,res)=>{
   let errors=validationResult(req)
   if(! errors.isEmpty()){
    req.flash('errors',errors.array())
     req.session.save(()=>{
      res.redirect('/login')
     })
  }
  const {email,password,phone}=req.body
  let role ="user";
  User.create({
    email:email,
    phone:phone,
    password:password,
    role:role
  }).then(user=>{
    res.redirect('/login')
  }).catch(err=>
    console.log(err))
  // console.log(req.body)

}

exports.loginPage=(req,res)=>{
    if(! req.session.isLoggedIn){
    res.render('auth/login', 
    {
        loginErrors:req.flash('loginErrors'),
        userErr:req.flash('userErr'),
        passwordErr:req.flash('passwordErr')
    });

    }else{
        res.redirect('/dashboard')
    }
  
}


exports.login=(req,res)=>{
  const {email,password}=req.body
  errors= validationResult(req)
  if(! errors.isEmpty()){
    req.flash('loginErrors', errors.arrary())
    res.session.save(()=>{
      res.redirect('/dashboard')
    })
  }
  User.findOne({
    where:{
      email:email
    }
  }).then(user=>{
    if(!user){
      return res.redirect('/login') 
    }
     return user
  })
    req.session.isLoggedIn= true;
         req.session.user =user
        //  return   res.redirect('/dashboard');
        if(user.role=='user'){
            res.redirect('/dashboard')
        }else{
            res.redirect('/dashboard')
        }
    
        console.log(err)
    

}

exports.forgot=(req,res)=>{
  res.render('auth/forgotpassword', {error: req.flash('error'), userError:req.flash('userError')})

}

exports.forgotpass=(req,res)=>{
  const {email} = req.body;
  const errors = validationResult(req);
  if(! errors.isEmpty()){
    req.flash('error', errors.array())
   return  req.session.save(()=>{
      return  res.redirect('/forgotpassword')
    })
  }
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
        req.flash('userError','Unable to perform this function at the moment')
        return req.session.save(()=>{
            res.redirect('/forgotpassword')
        })
    }

    let token =buffer.toString('hex')
  User.findOne({
    where:{
        email:email,
    }
  }).then(user=>{
    if(!user){
        req.flash('userError','User does not exist')
        return req.session.save(()=>{
            res.redirect('/forgotpassword')
        })
    }
    user.resetToken=token
  user.resetTokenExpiration=Date.now()+9000000
  return user.save()
  
}).then(user=>{
  let email={
      to: user.email,
    from:{
      name:'Y-store',
      email:'info@gmail.com'
    },
    subject:'Retrive password',
    html:`
    <h2>You requested to retrive your password</h2>
    <p><a href="http:/localhost:3000/retrive/${token}">Click here </a> to retrive your password</p>
    <p>This link will expire in the next 24 hours.<br>
    Kindly ignore if you don't send this request
    </p>
    `
  }
 var transport=nodemailer.createTransport({
    host:"sandbox.smtp.mailtrap.io",
    port:"2525",
    auth:{
      user:"b43b77973b6e34",
      pass:"e3b0039c45abe9"
    }
 });
     transport.sendMail(email).then((res)=>{
      return res.render('/login')
     }).catch(err=> console.log(err))
     return res.redirect('/login')
})
})
}

exports.retrivePassword=(req, res)=>{
  let token = req.params.token;
  User.findOne({
    where:{
      resetToken:token
    }
  }).then(user=>{
    if(!user){
      req.flash('retrivePassword', 'invalid URL');
     return req.session.save(()=>{
        res.redirect('/login')
      })
    }
    if(user.resetTokenExpiration < Date.now()){
      req.flash('retrivePassword', 'URL has expired');
      return req.session.save(()=>{
         res.redirect('/login')
       })
    }
   return res.render('auth/retrive', {title:'Retrive Password'})
  })
}