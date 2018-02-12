var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});
var Reservation={};

/* Mostar las reservas de un usuario*/
Reservation.findUserReserve=function(id, callback){
    if (connection){
        var sql=("select dia,hora,re.nombre,comensales from reservas r,usuarios u,restaurantes re  where IdRestaurante=restauranter and IdUsuario=usuarior and UsuarioR="+connection.escape(id));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Crear una reserva */

//Este metodo lo que hace es crear la reserva
Reservation.insertReservation=function(ReservationData,callback){
    if(connection){
        connection.query("INSERT INTO reservas SET ?",ReservationData,function(error,result){
            if (error){
                throw error;
            }else{
                //return callback(null,result.insertid);
            }
        })
    }
}

//Este metodo lo que hace es crear una fila en aforo_libre o modificar una existente ajustando el aforo de un restaurante ese dia a ese turno
Reservation.updateAforo=function(AforoData,callback){
    if(connection){
        var sql=("INSERT INTO aforo_libre values (" + AforoData.IdAforo + ",'" + AforoData.dia + "','" + AforoData.turno + "',(SELECT aforo-"+AforoData.comensales+" FROM restaurantes where IdRestaurante="+AforoData.idrestaurante+")," + AforoData.idrestaurante + ") ON DUPLICATE KEY update aforo=aforo-" + AforoData.comensales);
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Elimina una reserva */

Reservation.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM reservas WHERE idReserva=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Reserva eliminada");
            }
        })
    }
}

Reservation.removeAforo=function(Id,ReservationData,callback){
    if(connection){
        var sql="UPDATE aforo_libre set aforo=aforo+(SELECT comensales from reservas where Idreserva="+connection.escape(Id)+") WHERE idaforo="+ReservationData.restaurante+" AND dia='"+ReservationData.dia+"' AND turno='"+ReservationData.turno+"'";
        connection.query(sql,function(error,result){
            if (error){
                console.log(sql);
                throw error;
            }else{
                //return callback(null,"Aforo actualizado");
            }
        })
    }
}

/* Modificar una reserva */

/*Aqui modificamos el aforo dependiendo de como cambien los comensales*/
Reservation.update=function(ReservationData,idreserva,callback){
    if(connection){
        var sql="UPDATE aforo_libre set aforo=aforo+(SELECT comensales from reservas where idreserva="+connection.escape(idreserva)+")-"+ReservationData.comensales+" where idaforo="+ReservationData.IdAforo+" AND dia='"+ReservationData.dia+"' AND turno='"+ReservationData.turno+"'";
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                //return callback(null,"Aforo actualizado");
            }
        })
    }
}

Reservation.updatereservation=function(ReservationData,idreserva,callback){
    if(connection){
        var sql="UPDATE reservas SET comensales="+ReservationData.comensales+", hora='"+ReservationData.hora+"' WHERE idreserva="+connection.escape(idreserva);
        connection.query(sql,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,"Reserva actualizada");
            }
        })
    }
}

module.exports=Reservation;
