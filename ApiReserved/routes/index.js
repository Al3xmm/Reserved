var express = require('express');
var router = express.Router();
var passport=require('passport');

var Comments=require("../models/comments");
var User=require("../models/users");
var Orders=require("../models/orders");


// formulario de registro
router.post('/signup', passport.authenticate('local-signup', {
   successRedirect : '/profile', // redirect to the secure profile section
   failureRedirect : '/signup', // redirect back to the signup page if there is an error
   failureFlash : true // allow flash messages
}));

// formulario de login
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// formulario modificacion usuario
router.post('/updateprofileuser', function(req,res,next){

    var passhash=bcrypt.hashSync(req.body.password,salt);
    if(req.body.password!=""){
      var userData={
          id:req.user[0].idUsuario,
          password:passhash,
          email:req.body.email
      };
    }else{
      var userData={
          id:req.user[0].idUsuario,
          password:req.body.password,
          email:req.body.email
      };
    }


    User.update(userData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
          res.render('profile.html', {
              user : req.user // get the user out of session and pass to template
          });
        }
    })
});


// Index para loguearse con las diferentes RRSS
router.get('/', function(req, res) {
    res.render('index.html'); // load the index.ejs file
});

// Ruta para ver el perfil
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.html', {
        user : req.user // get the user out of session and pass to template
    });
});

// Ruta para hacer logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/*****************REGISTRO LOCAL ROUTES **********************/

router.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.html', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.html', { message: req.flash('signupMessage') });
});

router.get('/updateprofile', isLoggedIn, function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('updateprofile.html');
});

router.get('/deleteprofile',isLoggedIn,function(req,res){
  User.remove(req.user[0].idUsuario,function(error,data){
      if (error){
          res.json(500,error);
      }else{
        req.logout();
        res.redirect('/');
      }
  })

})

/****************GOOGLE ROUTES ************************/
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// el callback despues de que se haya autenticado el usuario de google
router.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
}));

/***************** FACEBOOK ROUTES *************************/

router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email']}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
}));


  // ruta middleware para comprobar si un usuario esta logueado
  function isLoggedIn(req, res, next) {

      // si el usuario esta autenticado, continua sin problema
      if (req.isAuthenticated())
          return next();

      // si no lo esta redirige a index
      res.redirect('/');
  }


/* POST Crear un comentario */
router.post('/comment',function(req,res,next){
    var commentData={
        IdComentario:null,
        contenido:req.body.contenido,
        fecha:req.body.fecha,
        usuarioc:req.body.usuarioc,
        restaurantec:req.body.restaurantec,
    };

    Comments.insert(commentData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* DELETE Borrar un comentario */
router.delete("/comments/:id",function(req,res,next){
    Comments.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET pedidos */
router.get('/orders', function(req, res, next) {

    Orders.all(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET pedidos por su Id */
router.get('/orders/:id', function(req, res, next) {

    Orders.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});


/* POST Crear un pedido */
router.post('/orders', function(req,res,next){

    var OrderData={
        IdPedido:null,
        reservap:req.body.reservap,
        asignare:req.body.asignare,
        cuentatotal:req.body.cuentatotal,
        mesa:req.body.mesa
    };

    Orders.insert(OrderData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })
});

/* DELETE Eliminar un pedido */
router.delete('/orders/:id', function(req,res,next){
  Orders.remove(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

/* PUT Modificar un pedido */
router.put('/orders/:id', function(req,res,next){
  var OrderData={
      IdPedido:req.params.id,
      reservap:req.body.reservap,
      asignare:req.body.asignare,
      cuentatotal:req.body.cuentatotal,
      mesa:req.body.mesa
  };

  Orders.update(OrderData, function(error,data){
    if (error){
        res.json(500,error);
    }else{
        res.json(200,data);
    }
  })
});


/* POST Crear un producto de pedido */
router.post('/orders/:id/orderproducts/', function(req,res,next){

    var OrderProductData={
        IdProductoDePedido:null,
        pedidop:req.params.id,
        productop:req.body.productop,
        tipoproducto:req.body.tipoproducto,
        hora:req.body.hora
    };

    Orders.insertOrderProduct(OrderProductData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })
});

/* DELETE Eliminar un producto de pedido */
router.delete('/orders/:id/orderproducts/:product', function(req,res,next){
  Orders.removeOrderProduct(req.params.id, req.params.product,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARAR-PREPARANDO  */
/*:idpp Id de produco de pedido :idp  ID de producto*/
router.put('/orders/:id/orderproducts/:idpp/preparando/:idp', function(req, res, next){

        Orders.CambiaEstadoPP(req.params.id,req.params.idpp,req.params.idp,function(error,data){
            if (error){
                res.json(500,error);
            }else{
                res.json(200,data);
                aux=1;
            }
        })
    });

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARANDO-PREPARADO  */
/*:idpp Id de produco de pedido :idp  ID de producto*/
router.put('/orders/:id/orderproducts/:idpp/preparado/:idp', function(req, res, next){

      Orders.CambiaEstadoPP2(req.params.id,req.params.idpp,req.params.idp,function(error,data){
              if (error){
                    res.json(500,error);
                }else{
                    res.json(200,data);
                    aux=1;
                }
            })
        });
  /*CAMBIA ESTADO DE UN PRODUCTO: PREPARADO-SERVIDO  */
  /*:idpp Id de produco de pedido :idp  ID de producto*/
  router.put('/orders/:id/orderproducts/:idpp/servido/:idp', function(req, res, next){

        Orders.CambiaEstadoPS(req.params.id,req.params.idpp,req.params.idp,function(error,data){
                    if (error){
                        res.json(500,error);
                    }else{
                        res.json(200,data);
                        aux=1;
                    }
                })
            });


/* GET facturas */

router.get('/orders/:idusuario/bill', function(req, res, next){

    Orders.findOrderbyBill(req.params.idusuario,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET facturas por nombre de restaurante */

router.get('/orders/:idusuario/bill/name/:nombre', function(req, res, next){


    Orders.findOrderbyBillbyName(req.params.idusuario,req.params.nombre,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET facturas filtrado por precio */

router.get('/orders/:idusuario/bill/filter/:cuentainicial/:cuentafinal', function(req, res, next){

    Orders.findOrderbyBillFilterPrice(req.params.idusuario,req.params.cuentainicial,req.params.cuentafinal,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET facturas filtrado por precio minimo*/

router.get('/orders/:idusuario/bill/min/:cuenta', function(req, res, next){

    Orders.findOrderbyBillFilterPriceUnder(req.params.idusuario,req.params.cuenta,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET facturas filtrado por precio minimo*/

router.get('/orders/:idusuario/bill/max/:cuenta', function(req, res, next){

    Orders.findOrderbyBillFilterPriceOver(req.params.idusuario,req.params.cuenta,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Avisar empleado*/

router.get('/orders/:id/employee/:idempleado', function(req, res, next){

    Orders.OrdersEmployee(req.params.id,req.params.idempleado,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});




/* Prueba CONEXION */
/*
router.get('/users', function(req, res, next) {
  User.connect(function(error,res){
      if(error){
          console.log(JSON.stringify(error));
      }else{
          console.log(res);
      }
  })
});
*/

module.exports = router;
