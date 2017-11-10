var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var User={};

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
