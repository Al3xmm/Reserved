var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var User={};

/*Buscar un usuario de RRSS por su ID*/
User.findById=function(id,callback){
    if (connection){
        connection.query("SELECT * FROM rrss WHERE idUsuario="+connection.escape(id),function (error,row){
            if (error){
                throw error;
            }else if(row!=""){
                return callback(null,row);
            }else{
                return callback(null,null);
            }
        })
    }
}

/*Login del Usuario de RRSS*/
User.findOne=function(idgoogle,callback){
    if (connection){
        connection.query("SELECT * FROM rrss WHERE idUsuario="+connection.escape(idgoogle),function (error,row){
            if (error){
                throw error;
            }else if(row!=""){
                return callback(null,row);
            }else{
                return callback(null,null);
            }
        })
    }
}

/* Crear un usuario con RRSS */
User.insertGoogle=function(userData,callback){
    if(connection){
        connection.query("INSERT INTO rrss SET ?",userData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Mostar todos los usuarios */
User.all= function(callback){
    if (connection){
        connection.query("SELECT * FROM usuarios",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Crear un usuario */
User.insert=function(userData,callback){
    if(connection){
        connection.query("INSERT INTO usuarios SET ?",userData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Mostar un usuario buscado por su Id */
User.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT * FROM usuarios WHERE idUsuario="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

/* Modificar un usuario */
User.update=function(userData,callback) {
    if(connection){
        var sql="UPDATE usuarios SET nombre="+connection.escape(userData.nombre)+","+
                "apellidos="+connection.escape(userData.apellidos)+","+
                "password="+connection.escape(userData.password)+","+
                "email="+connection.escape(userData.email)+","+
                "telefono="+connection.escape(userData.telefono)+","+
                "direccion="+connection.escape(userData.direccion)+
                "WHERE idUsuario="+userData.id;
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Usuario actualizado");
            }
        })
    }
}

/* Eliminar un Usuario */
User.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM usuarios WHERE idUsuario=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Usuario eliminado");
            }
        })
    }
}

/* PROBAR CONEXION */
/*
User.connect=function(callback){
    if(connection){
        var sql="SELECT 1+1";
        connection.query(sql,function(error,row){
                if(error){
                    return callback(error,null);
                }
                return callback(null,"Conexión establecida con mysql, resultado: "+JSON.stringify(row));
        })
    }else{
        return callback("No se puede conectar",null);
    }
}
*/


module.exports=User;
