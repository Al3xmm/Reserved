var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});
var Comments={};

/* Mostar los comentarios de un usuario */
Comments.findCommentsUser=function(id, callback){
    if (connection){
        var sql=("SELECT c.contenido, c.fecha, r.nombre FROM restaurantes r, comentarios c, usuarios u WHERE c.UsuarioC="+connection.escape(id)+" AND r.IdRestaurante=c.RestauranteC");
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar los comentarios de un restaurante */
Comments.findCommentsRestaurant=function(id, callback){
    if (connection){
        var sql=("SELECT DISTINCT c.contenido, c.fecha, u.nombre FROM restaurantes r, comentarios c, usuarios u WHERE c.RestauranteC="+connection.escape(id)+" AND u.IdUsuario=c.UsuarioC");
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Crear un comentario */
Comments.insert=function(commentData,callback){
    if(connection){
        connection.query("INSERT INTO comentarios SET ?",commentData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Eliminar un Comentario */
Comments.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM comentarios WHERE idComentario=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Comentario eliminado");
            }
        })
    }
}

module.exports=Comments;
