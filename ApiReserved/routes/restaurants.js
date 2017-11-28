var express = require('express');
var router = express.Router();
var Restaurant=require("../models/restaurants");
var Comments=require("../models/comments");
var Product=require("../models/products");

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
    var restaurantData={
        IdRestaurante:null,
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

    Product.update(req.params.id,req.params.idproducto,productData, function(error, callback){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});
module.exports = router;
