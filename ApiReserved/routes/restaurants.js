var express = require('express');
var router = express.Router();
var Restaurant=require("../models/restaurants");
var Comments=require("../models/comments");
var Product=require("../models/products");
var Employee=require("../models/employees");
var Images=require("../models/images");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

/* GET  Todos los Restaurantes */
router.get('/', function(req, res, next) {

    Restaurant.all(function(error,data){
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
router.get('/:name', function(req, res, next) {

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

/* GET Aforo de Restaurante en un turno */
router.get('/:id/capacity', function(req, res, next) {

    Restaurant.seecapacity(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un Restaurante */
router.post('/',function(req,res,next){

    var hash=bcrypt.hashSync(req.body.password,salt);
    var restaurantData={
        IdRestaurante:null,
        nombre:req.body.nombre,
        password:hash,
        horario:req.body.horario,
        descripcion:req.body.descripcion,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        ciudad:req.body.ciudad,
        imagenes:req.body.imagenes,
        aforo:req.body.aforo,
        tipoComida:req.body.tipoComida
    };

    Restaurant.insert(restaurantData,function(error,data){
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
        horario:req.body.horario,
        descripcion:req.body.descripcion,
        direccion:req.body.direccion,
        telefono:req.body.telefono,
        ciudad:req.body.ciudad,
        imagenes:req.body.imagenes,
        aforo:req.body.aforo,
        tipoComida:req.body.tipoComida
    };

    Restaurant.update(restaurantData,function(error,data){
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
router.get("/product/:nombreproducto", function(req, res, next){
  console.log(req.params.nombreproducto);
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

/* Crear un producto en un restaurante*/
router.post('/:id/products', function(req, res, next){
  var productData={
      IdProducto: null,
      Nombre: req.body.nombre,
      Precio: req.body.precio,
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      RestauranteP: req.body.restaurantep
  };

    Product.insert(productData, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Modifica un producto en un restaurante*/
router.put('/:id/products/:idproducto', function(req, res, next){
    var productData={
        Nombre: req.body.nombre,
        Precio: req.body.precio,
        Tipo: req.body.tipo,
        Descripcion: req.body.descripcion
    };

    Product.update(req.params.id,req.params.idproducto,productData, function(error, data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
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
            res.json(200,data);
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

module.exports = router;
