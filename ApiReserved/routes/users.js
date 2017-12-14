var express = require('express');
var router = express.Router();
var User=require("../models/users");
var Comments=require("../models/comments");
var Reservations=require("../models/reservations");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

/* GET  Todos los Usuarios */
router.get('/', function(req, res, next) {

    User.all(function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear un usuario */
router.post('/',function(req,res,next){

    var hash=bcrypt.hashSync(req.body.password,salt);
    var userData={
        IdUsuario:null,
        nick:req.body.nick,
        password:hash,
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
router.get('/:id', function(req, res, next) {

    User.findOneById(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* PUT Modificar un usuario */
router.put('/:id',function(req,res,next){
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
router.delete("/:id",function(req,res,next){
    User.remove(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Comentarios de un Usuario */
router.get('/:id/comments', function(req, res, next) {

    Comments.findCommentsUser(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* GET Reservas de un Usuario */
router.get('/:id/reservations', function(req, res, next) {

    Reservations.findUserReserve(req.params.id,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
});

/* POST Crear una reserva */
router.post('/:id/reservations',function(req,res,next){

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

router.delete("/:iduser/reservations/:id",function(req,res,next){
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

/* PUT Modificar una reserva */
router.put('/:id/reservation/:idreservation',function(req,res,next){
    var reservationData={
        IdAforo:req.body.restauranter,
        dia:req.body.dia,
        hora:req.body.hora,
        turno:req.body.turno,
        idrestaurante:req.body.restauranter,
        comensales:req.body.comensales
    };

    Reservations.update(reservationData,req.params.idreservation,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })
    Reservations.updatereservation(reservationData,req.params.idreservation,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});


/*Metodo para cuando un usuario hace un login guardarlo */
router.post('/:id/usercontrol',function(req,res,next){


    var ControlData={
        idcontrolu:null,
        fecha:req.body.fecha,
        usuarioid:req.params.id

    };
    



    UserControl.insert(ControlData,function(error,data){
        if (error){
            res.json(500,error);
        }else{
            res.json(200,data);
        }
    })

});

/*Metodo que te sale el ultimo login  de un usuario*/
router.get('/:id/usercontrol',function(req,res,next){
  UserControl.findUserControl(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

router.delete('/:id/usercontrol',function(req,res,next){
  UserControl.remove(req.params.id,function(error,data){
      if (error){
          res.json(500,error);
      }else{
          res.json(200,data);
      }
  })
});

module.exports = router;
