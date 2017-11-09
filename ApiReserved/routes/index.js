var express = require('express');
var router = express.Router();
var User=require("../models/users");

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
        contraseña:req.body.contraseña,
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
        contraseña:req.body.contraseña,
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
