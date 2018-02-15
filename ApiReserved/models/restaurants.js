var mysql=require("mysql");

var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Restaurants={};

/*Busca el email del restaurante*/
Restaurants.findEmail=function(email,callback){
    if (connection){
        connection.query("SELECT * FROM restaurantes WHERE email="+connection.escape(email),function (error,row){
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

/* Mostar todos los restaurantes */
Restaurants.all= function(callback){
    if (connection){
        connection.query("SELECT  idRestaurante,nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar un restaurante buscado por su Id */
Restaurants.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT  idRestaurante,nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes WHERE IdRestaurante="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

/* Mostar restaurantes por su Nombre */
Restaurants.findRestaurantName=function(name, callback){
    if (connection){
        var sql=("SELECT  nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes WHERE nombre LIKE"+connection.escape('%'+name+'%'));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar restaurantes por su Tipo */
Restaurants.findRestaurantType=function(type, callback){
    if (connection){
        var sql=("SELECT  nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes WHERE tipoComida LIKE"+connection.escape(type));
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar aforo de un restaurante */
Restaurants.seecapacity=function(id,callback){
    if (connection){
        var sql="SELECT dia,turno,aforo FROM aforo_libre WHERE idRestaurante="+connection.escape(id);
        connection.query(sql,function(error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Crear un Restaurante */
Restaurants.insert=function(restaurantData,callback){
    if(connection){
        connection.query("INSERT INTO restaurantes SET ?",restaurantData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

/* Modificar un restaurante */
Restaurants.update=function(id,restaurantData,callback) {
  var coma=false;
  if(connection){
      var sql= "UPDATE restaurantes SET "

      if(restaurantData.nombre != undefined)
      {
        sql += " nombre="+connection.escape(restaurantData.nombre);
        coma=true;
      }

      if(restaurantData.password != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql +=  "contraseña="+connection.escape(restaurantData.password);
        coma=true;
      }

      if(restaurantData.email != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql +=  "email="+connection.escape(restaurantData.email);
        coma=true;
      }

      if(restaurantData.horario != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "horario="+connection.escape(restaurantData.horario);
        coma=true;
      }

      if(restaurantData.descripcion != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "descripcion="+connection.escape(restaurantData.descripcion);
        coma=true;
      }

      if(restaurantData.direccion != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "direccion="+connection.escape(restaurantData.direccion);
        coma=true;
      }

      if(restaurantData.telefono != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "telefono="+connection.escape(restaurantData.telefono);
        coma=true;
      }

      if(restaurantData.ciudad != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "ciudad="+connection.escape(restaurantData.ciudad);
        coma=true;
      }

      if(restaurantData.imagenes != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "imagenes="+connection.escape(restaurantData.imagenes);
        coma=true;
      }

      if(restaurantData.aforo != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "aforo="+connection.escape(restaurantData.aforo);
        coma=true;
      }

      if(restaurantData.tipoComida != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "tipoComida="+connection.escape(restaurantData.tipoComida);
        coma=true;
      }

      if(restaurantData.coordenadas != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }
        sql += "coordenadas="+connection.escape(restaurantData.coordenadas);
        coma=true;
      }

  sql +=  "WHERE idRestaurante="+connection.escape(id);

          connection.query(sql,function(error,result){
          if(error){
              throw error;
          }else{
              return callback(null,"Restaurante actualizado");
          }
      })
  }
}

/* Eliminar un Restaurante */
Restaurants.remove=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM restaurantes WHERE idRestaurante=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Restaurante eliminado");
            }
        })
    }
}

/* Crear una denuncia a un comentario */
Restaurants.insertdenunciation=function(denunciaData,callback){
    if(connection){
        connection.query("INSERT INTO denunciaUsuario SET ?",denunciaData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,denunciaData);
            }
        })
    }
}

/* Mostar todas los denuncias en curso */
Restaurants.seedenunciations= function(callback){
    if (connection){
        connection.query("select u.nick, r.nombre, c.contenido, idComentario from denunciaUsuario dc, usuarios u, restaurantes r, comentarios c where dc.usuarioU=u.idUsuario and dc.restauranteR=idRestaurante and dc.comentarioC=c.idComentario",function (error,rows){
            if (error){
                throw error;
            }else{
              console.log(rows);
                return callback(null,rows);
            }
        })
    }
}

/* Eliminar un comentario de una denuncia */
Restaurants.removedenunciation=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM denunciaUsuario WHERE comentarioC=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                //return callback(null,"Restaurante eliminado");
            }
        })
    }
}

Restaurants.removecomment=function(Id,callback){
    if(connection){
        var sql= "DELETE FROM comentarios WHERE idComentario=" + connection.escape(Id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Comentario y denuncia eliminado");
            }
        })
    }
}



module.exports=Restaurants;
