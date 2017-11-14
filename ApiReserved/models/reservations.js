var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Reservation={};

/* Mostar las reservas de un usuario*/
Reservation.findUserReserve=function(id, callback){
    if (connection){
        var sql=("select dia,hora,re.nombre from reservas r,usuarios u,restaurantes re  where IdRestaurante=restauranter and IdUsuario=usuarior and UsuarioR="+connection.escape(id));
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
        var sql=("INSERT INTO aforo_libre values (" + AforoData.IdAforo + ",'" + AforoData.dia + "','" + AforoData.turno + "',(SELECT aforo FROM restaurantes where IdRestaurante="+AforoData.idrestaurante+")," + AforoData.idrestaurante + ") ON DUPLICATE KEY update aforo=aforo-" + AforoData.comensales);
        connection.query(sql,function(error,result){
            if (error){
                console.log(sql);
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

module.exports=Reservation;