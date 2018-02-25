var express = require('express');
var router = express.Router();
var path = require("path");
var Restaurant=require("../models/restaurants");
var Comments=require("../models/comments");
var Product=require("../models/products");
var Category=require("../models/category");
var Employee=require("../models/employees");
var Images=require("../models/images");
var Visit=require("../models/visitrestaurant");
var Orders=require("../models/orders");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

var multer  = require('multer');
var upload = multer({ dest: 'images/' })

var jwt = require('jsonwebtoken');
var configJWT = require('../config/auth');

//Comprobar token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['token-acceso'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token,configJWT.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    res.json(200,"No token provided.");

  }
});



/*
//ver foto
router.get('/:name', function (req, res) {
    console.log(req.params.name);
    res.sendfile(path.resolve('./images/'+req.params.name));
});

//subir foto
router.post('/:id/upload',upload.single('imagensubir'), function(req, res) {
  console.log(req.files.imagensubir);
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }

  var file = req.files.imagensubir;
  var img_name=file.name;

  Images.uploadimage(file,img_name,req.params.id,function(error,data){
    if (error){
        res.json(500,error);
    }else{
        res.json(200,data);
    }
  })

});
*/

/* GET  Restaurantes por nombre */
router.get('/find/:nick', function(req, res, next) {

    Restaurant.findlikename(req.params.nick,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurante por su Id */
router.get('/:id', function(req, res, next) {
    Restaurant.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por nombre */
router.get('/name/:name', function(req, res, next) {

    Restaurant.findRestaurantName(req.params.name,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por Tipo de comida */
router.get('/type/:type', function(req, res, next) {

    Restaurant.findRestaurantType(req.params.type,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* GET Restaurantes por Ciudad */
router.get('/city/:city', function(req, res, next) {

    Restaurant.findRestaurantCity(req.params.city,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* GET Restaurantes dada una ciudad, nombre y tipocomida */
router.get('/find', function(req, res, next) {

    var restaurantData={
        nombre:req.body.nombre,
        ciudad:req.body.ciudad,
        tipoComida:req.body.tipoComida
    };
    Restaurant.findRestaurant(restaurantData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Aforo de Restaurante */
router.get('/:id/capacityall', function(req, res, next) {

    Restaurant.seecapacityall(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Aforo de Restaurante en un turno */
router.post('/:id/capacity', function(req, res, next) {

  var capacityData={
      dia:req.body.dia,
  };

    Restaurant.seecapacity(req.params.id,capacityData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET reservas de un restaurante */
router.get('/:id/:dia/:turno/reservations', function(req, res, next) {

    Restaurant.seereservations(req.params.id,req.params.dia,req.params.turno,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un Restaurante */
router.put('/:id',function(req,res,next){
    var restaurantData={
        id:req.params.id,
        nombre:req.body.nombre,
        password:req.body.password,
        email:req.body.email,
        horario:req.body.horario,
        descripcion:req.body.descripcion,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        ciudad:req.body.ciudad,
        imagenes:req.body.imagenes,
        aforo:req.body.aforo,
        tipoComida:req.body.tipoComida,
        coordenadas:req.body.coordenadas
    };

    Restaurant.update(req.params.id,restaurantData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un Restaurante */
router.delete("/:id",function(req,res,next){
    Restaurant.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Comentarios de un Restaurante */
router.get('/:id/comments', function(req, res, next) {
    Comments.findCommentsRestaurant(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar todos los restaurantes segun el nombre del plato */
router.get("/products/:nombreproducto", function(req, res, next){
    Product.findByRestaurantByNameProduct(req.params.nombreproducto, function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar todos los Productos de un Restaurante*/
router.get("/:id/products", function(req, res, next){
    Product.findByRestaurantId(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Borrar un producto de un restaurante*/
router.delete('/:id/products/:idproducto', function(req, res, next){
    Product.remove(req.params.id, req.params.idproducto, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Mostrar un producto en concreto*/
router.get("/allproducts/:id", function(req, res, next){
    Product.findProduct(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Crear un producto en un restaurante*/
router.post('/:id/products', function(req, res, next){
  var productData={
      IdProducto: null,
      Nombre: req.body.nombre,
      Precio: req.body.precio,
      Tipo: req.body.tipo,
      Informacion: req.body.informacion,
      RestauranteP: req.params.id
  };

    Product.insert(productData, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Producto anyadido");
        }
    })
});

/* Modifica un producto en un restaurante*/
router.put('/:id/products/:idproducto', function(req, res, next){
    var productData={
        Nombre: req.body.nombre,
        Precio: req.body.precio,
        Tipo: req.body.tipo,
        Informacion: req.body.informacion
    };

    Product.update(req.params.id,req.params.idproducto,productData, function(error, data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Producto actualizado");
        }
    })
});

/* Mostrar los productos segun su tipo */
router.get("/:id/products/:type", function(req, res, next){
    Product.findProductsByType(req.params.id,req.params.type, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* Mostrar los productos segun su categoria */
router.get("/:id/products/category/:category", function(req, res, next){
    Product.findProductsByCategory(req.params.id,req.params.category, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/*Todos los empleados de un restaurante */
router.get('/:id/employee',function(req,res,next){
  Employee.findEmployee(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

/* GET por id de empleado */
router.get('/:id/employee/:idempleado', function(req, res, next){

    Employee.findEmployeeById(req.params.idempleado,function(error,data){

        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

//Eliminar un empleado
router.delete("/:id/employee/:idempleado",function(req,res,next){
    Employee.remove(req.params.idempleado,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

//Crear un empleado
router.post('/:id/employee',function(req,res,next){

    var hash=bcrypt.hashSync(req.body.password,salt);
    var employeeData={
        IdEmpleado:null,
        nick:req.body.nick,
        password:hash,
        tipoempleado:req.body.tipoempleado,
        empleador:req.params.id
    };

    Employee.insert(employeeData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,"Empleado creado");
        }
    })

});

/* PUT Modificar un usuario */
router.put('/:id/employee/:idempleado',function(req,res,next){

    var employeeData={
      IdEmpleado:req.params.idempleado,
        nick:req.body.nick,
        password:req.body.password,
        tipoempleado:req.body.tipoempleado,
        empleador:req.params.id
    };



    Employee.update(employeeData,req.params.idempleado,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

//Mostrar imagenes por id
router.get('/:id/images/:idimagen',function(req,res,next){
  Images.findImageId(req.params.id,req.params.idimagen,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});



//Mostrar imagenes por restaurante
router.get('/:id/images/',function(req,res,next){
  Images.findImagenRestaurant(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});


//Crear una imagen
router.post('/:id/images',function(req,res,next){
    var imageData={
        IdImagenes:null,
        url:req.body.url,
        imagenesr:req.params.id
    };

    Images.insert(imageData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

//Eliminar una imagen
router.delete("/:id/images/:idimagen",function(req,res,next){
    Images.remove(req.params.id,req.params.idimagen,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});


//Mostrar visitas a un restautante
router.get('/:id/visit',function(req,res,next){
  Visit.findVisitRestaurant(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

//Crear una denuncia
router.post('/denunciation',function(req,res,next){
    var denunciaData={
        usuarioU:req.body.usuarioU,
        restauranteR:req.body.restauranteR,
        comentarioC:req.body.comentarioC
    };

    Restaurant.finddenunciation(denunciaData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
          if(data!=null){
            res.json(200,"Denuncia ya realizada");
          }else{
              Restaurant.insertdenunciation(denunciaData,function(error,data){
                  if (error){
                      res.json(500,error);
                  }else{
                      res.json(200,data);
                  }
              })
          }
      }
    })
});

/* GET  Todas las denuncias */

router.get('/denunciation/all', function(req, res, next) {
    Restaurant.seedenunciations(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* DELETE Borrar una Reserva */

router.delete("/denunciation/:id",function(req,res,next){

    Restaurant.removedenunciation(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Restaurant.removecomment(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});




/* GET  categoria por nombre */
router.get('/:id/products/category/name/:name', function(req, res, next) {

    Category.findlikename(req.params.name,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET categoria por su Id */
router.get('/:id/products/category/:id', function(req, res, next) {
    Category.findOneById(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* PUT Modificar un category */
router.put('/:id/products/category/:idcategoria',function(req,res,next){
    var categoryData={
        idCategoria:req.params.idcategoria,
        nombre:req.body.nombre,
        restauranteCad:req.params.id
    };

    Category.update(req.params.id,req.params.idcategoria, categoryData, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un Category */
router.delete('/:id/products/category/:idcategoria',function(req,res,next){
    Category.remove(req.params.id,req.params.idcategoria,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
/* Crear una categoria en un restaurante*/
router.post('/:id/products/category', function(req, res, next){
    var categoryData={
        IdCategoria: null,
        Nombre: req.body.nombre,
        restauranteCat: req.params.id
    };

      Category.insert(categoryData, function(error,data){
          if (error){
              res.json(500,error);
          }else{
              res.json(200,"Categoria anyadida");
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
          mesa:parseInt(req.body.mesa)
      };
      console.log(OrderData);
      Orders.insert(OrderData,function(error,data){
          if (error){
              res.json(500,error);
          }else{
              res.json(200,data);
              aux=1;
          }
      })
  });
  
 /* Mostrar todos las categorias de un Restaurante*/
router.get("/:id/category", function(req, res, next){
    Category.findByRestaurantId(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

module.exports = router;
