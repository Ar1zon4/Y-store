const db=require('../database/db')
const bcrypt=require('bcrypt')
const Product=require('../models/products')
const product=require('../models/products')
// const bycrpt=require('bcrypt')

const User=require('../models/users')
// const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
// const user = require('../models/users')
// exports.indexPage=(req,res)=>{
//     res.render('pages/index')
// }

exports.readPage=(req,res)=>{
    
User.findAll()
    
     .then(results=>{
        res.render('user-pages/index',{user:results})
     }).catch(err=>{
        console.log(err)
     })


}


exports.addUser=(req,res)=>{
    res.render('user-pages/add-user')
}

exports.addUserpage=(req,res)=>{
    const {name,email,phone,remark,password}=req.body
    role="user"
    bcrypt.hash(password,12).then(hashedpassword=>{
        User.create({
            name:name,
            email:email,
            phone:phone,
            remark:remark,
            password:hashedpassword,
            role:role
        })
        .then(user=>{
             req.session.save(()=>{
                res.redirect('/add-user')
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    


}

exports.addProductpage=(req,res)=>{
    res.render('product-pages/add-product')
}

exports.addProduct=(req,res)=>{
    const {productname,price,quantity,description,image}=req.body
    let imagepath='/images/'+ req.file.filename
    console.log(imagepath)
    Product.create({
        productname:productname,
        price:price,
        quantity:quantity,
        description:description,
        image:imagepath,
        userId:req.session.userId
    }).then(product=>{
        res.render('product-pages/add-product')
    }).catch(err=>{
        console.log(err)
    })
}

exports.readProduct=(req,res)=>{
     let user= req.session.user
    let page = req.query.page || 1;
    let totalitemsPerPage = 2
     console.log(page)
     let totalItems;
 
 Product.count().then(dataTotalItems =>{
    
     totalItems = dataTotalItems
     Product.findAll({
         offset: (page -1) * totalitemsPerPage ,
         limit:totalitemsPerPage
        })
         .then(result=>{
            res.render('product-pages/product-index',
            {
                product:result,
                hasprevious: page > 1,  
                previousValue:page - 1,
                hasNext: totalItems > page * totalitemsPerPage,
                nextvalue: page + 1,
                totalPages: Math.ceil(totalItems / totalitemsPerPage)

            })
        }).catch(err=>{
            console.log(err)
        })

    })   
       

}

exports.updateUserId=(req,res)=>{
    const id=req.params.id
    

        User.findByPk(id).then(result=>{
            res.render('user-pages/update-user',{user:result})
        }).catch(err=>{
            console.log(err)
        })

}

exports.updateUser=(req,res)=>{
    const{id,name,email,phone,remarks,}=req.body

    User.findByPk(id)
    .then(user=>{
        
        user.name=name,
        user.email=email,
        user.phone=phone,
        user.remarks=remarks
        

        return user.save()
    }).then(result=>{
        res.render('user-pages/update-user')
    }).catch(err=>{
        console.log(err)
    })
}

exports.deleteUser=(req,res)=>{
    const {id} = req.body
    User.findByPk(id)
    .then(user=>{
    return user.destroy()
   
    }).then(user=>{
        
        res.render('user-pages/index')

    })
       
    .catch(err=>{
        console.log(err)
    })

}

exports.updateProductId=(req,res)=>{
    const id=req.params.id
    

        Product.findByPk(id).then(result=>{
            res.render('product-pages/update-product',{product:result})
        }).catch(err=>{
            console.log(err)
        })

}

exports.updateProduct=(req,res)=>{
    const{id,productname,price,quantity,image,description}=req.body

    Product.findByPk(id)
    .then(product=>{
        
        product.productname=productname
        product.price=price,
        product.quantity=quantity,
        product.image=image,
        product.description=description
        

        return product.save()
    }).then(result=>{
        res.render('product/update-product')
    }).catch(err=>{
        console.log(err)
    })
}

exports.deleteProduct=(req,res)=>{
    const {id}=req.body
    Product.findByPk(id)
    .then(product=>{
        return product.destroy()
    }).then(product=>{
        res.redirect('/product-index')
    }).catch(err=>{
        console.log(err)
    })

}

exports.dashboardPage=(req,res)=>{
      const {name}=req.body
         User.findAll()
         .then(result=>{
            res.render('dashboard/dashboard',{user:result})
         }).catch(err=>{
            console.log(err)
         })
   
}

exports.readP = (req, res, next)=>{
    let user= req.session.user
    let page = req.query.page || 1;
    let totalitemsPerPage = 2
     console.log(page)
     let totalItems;
 
 Product.count().then(dataTotalItems =>{
    
     totalItems = dataTotalItems
     Product.findAll({
         offset: (page -1) * totalitemsPerPage ,
         limit:totalitemsPerPage
        })
        .then(product => {
         res.render('pages/index',
          {
             title:'Home', 
             products:product, 
             hasprevious: page > 1,  
             previousValue:page - 1,
             hasNext: totalItems > page * totalitemsPerPage,
             nextvalue: page + 1,
             totalPages: Math.ceil(totalItems / totalitemsPerPage)
         });    
        })
        .catch(err => {
           return next(err)
        })
 
 })
 
 .catch(err => console.log(err))
    
     
 }


