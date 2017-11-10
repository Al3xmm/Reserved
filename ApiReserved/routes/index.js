var express = require('express');
var router = express.Router();
var User=require("../models/users");
var Comments=require("../models/comments");

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
