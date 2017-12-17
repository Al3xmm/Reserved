var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Restaurants={};

/* Mostar todos los restaurantes */
Restaurants.all= function(callback){
    if (connection){
        connection.query("SELECT  nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes",function (error,rows){
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
        var sql=("SELECT  nombre,horario,descripcion,direccion,telefono,ciudad,tipoComida FROM restaurantes WHERE IdRestaurante="+connection.escape(id));
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
Restaurants.update=function(restaurantData,callback) {
    if(connection){
            var sql="UPDATE restaurantes SET nombre="+connection.escape(restaurantData.nombre)+","+
                "password="+connection.escape(restaurantData.password)+","+
                "email="+connection.escape(restaurantData.email)+","+
                "horario="+connection.escape(restaurantData.horario)+","+
                "descripcion="+connection.escape(restaurantData.descripcion)+","+
                "direccion="+connection.escape(restaurantData.direccion)+","+
                "telefono="+connection.escape(restaurantData.telefono)+","+
                "ciudad="+connection.escape(restaurantData.ciudad)+","+
                "imagenes="+connection.escape(restaurantData.imagenes)+","+
                "aforo="+connection.escape(restaurantData.aforo)+","+
                "tipoComida="+connection.escape(restaurantData.tipoComida)+","+
                "coordenadas="+connection.escape(restaurantData.coordenadas)+
                " WHERE idRestaurante="+restaurantData.id;
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

module.exports=Restaurants;
