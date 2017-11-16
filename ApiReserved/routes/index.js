var express = require('express');
var router = express.Router();
var User=require("../models/users");
var Comments=require("../models/comments");
var Restaurant=require("../models/restaurants");
var Reservations=require("../models/reservations");
var Product=require("../models/products");

/* GET  Todos los Usuarios */
router.get('/users', function(req, res, next) {

    User.all(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un usuario */
router.post('/users',function(req,res,next){
    var userData={
        IdUsuario:null,
        nick:req.body.nick,
        password:req.body.password,
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        email:req.body.email,
        telefono:req.body.telefono,
        direccion:req.body.direccion
    };

    User.insert(userData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* GET Usuario por su Id */
router.get('/users/:id', function(req, res, next) {

    User.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un usuario */
router.put('/users/:id',function(req,res,next){
    var userData={
        id:req.params.id,
        password:req.body.password,
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        email:req.body.email,
        telefono:req.body.telefono,
        direccion:req.body.direccion
    };

    User.update(userData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/* DELETE Borrar un usuario */
router.delete("/users/:id",function(req,res,next){
    User.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Comentarios de un Usuario */
router.get('/users/:id/comments', function(req, res, next) {

    Comments.findCommentsUser(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Comentarios de un Restaurante */
router.get('/restaurant/:id/comments', function(req, res, next) {

    Comments.findCommentsRestaurant(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

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

/* GET  Todos los Restaurantes */
router.get('/restaurants', function(req, res, next) {

    Restaurant.all(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurante por su Id */
router.get('/restaurants/:id', function(req, res, next) {

    Restaurant.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por nombre */
router.get('/restaurants/:name', function(req, res, next) {

    Restaurant.findRestaurantName(req.params.name,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Restaurantes por Tipo de comida */
router.get('/restaurants/type/:type', function(req, res, next) {

    Restaurant.findRestaurantType(req.params.type,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Aforo de Restaurante en un turno */
router.get('/restaurants/:id/capacity', function(req, res, next) {

    Restaurant.seecapacity(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un Restaurante */
router.post('/restaurants',function(req,res,next){
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
router.put('/restaurants/:id',function(req,res,next){
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
router.delete("/restaurants/:id",function(req,res,next){
    Restaurant.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Reservas de un Usuario */
router.get('/user/:id/reservations', function(req, res, next) {

    Reservations.findUserReserve(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear una reserva */
router.post('/user/:id/reservations',function(req,res,next){

    var ReservationData={
        IdReserva:null,
        dia:req.body.dia,
        turno:req.body.turno,
        hora:req.body.hora,
        comensales:req.body.comensales,
        usuarior:req.params.id,
        restauranter:req.body.restauranter
    };

    var AforoData={
        IdAforo:req.body.restauranter,
        dia:req.body.dia,
        turno:req.body.turno,
        idrestaurante:req.body.restauranter,
        comensales:req.body.comensales
    };

    Reservations.insertReservation(ReservationData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
            aux=1;
        }
    })

        Reservations.updateAforo(AforoData,function(error,data){
            if (error){
                res.json(500,error);
            }else{
                res.json(200,data);
            }
        })

});

/* DELETE Borrar una Reserva */

router.delete("/user/:iduser/reservations/:id",function(req,res,next){
    var ReservationData={
        dia:req.body.dia,
        turno:req.body.turno,
        restaurante:req.body.restaurante
    };

    Reservations.removeAforo(req.params.id,ReservationData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

    Reservations.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Mostrar todos los Productos de un Restaurante*/
router.get("/restaurants/:id/products", function(req, res, next){
    Product.findByRestaurantId(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Borrar un producto de un restaurante*/
router.delete('/restaurants/:id/products/:idproducto', function(req, res, next){
    Product.remove(req.params.id, req.params.idproducto, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Crear un producto en un restaurante*/
router.post('/restaurants/:id/products', function(req, res, next){
  var productData={
      IdProducto: null,
      Nombre: req.body.nombre,
      Precio: req.body.precio,
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      RestauranteP: req.body.restauranteP
  };

    Product.insert(req.params.id, function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* Modifica un producto en un restaurante*/
router.put('restaurants/:id/products/:producto', function(req, res, next){
    var productData={
        IdProducto: req.body.idProducto,
        Nombre: req.body.nombre,
        Precio: req.body.precio,
        Tipo: req.body.tipo,
        Descripcion: req.body.descripcion,
        RestauranteP: req.body.restauranteP
    };

    Product.update(id, productData, function(error, callback){
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
