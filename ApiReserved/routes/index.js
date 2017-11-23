var express = require('express');
var router = express.Router();

var Comments=require("../models/comments");

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
