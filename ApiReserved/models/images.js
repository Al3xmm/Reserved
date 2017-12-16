var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Images={};

Images.findImagenRestaurant=function(id, callback){
    if (connection){

        var sql=("SELECT url FROM imagenes WHERE imagenesR="+connection.escape(id));
        console.log(sql);
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

Images.findImageId=function(id,idimagen, callback){
    if (connection){

        var sql=("SELECT url FROM imagenes WHERE imagenesR="+connection.escape(id)+" and idImagenes="+connection.escape(idimagen));
        console.log(sql);
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}

/* Crear una imagen */
Images.insert=function(imageData,callback){
    if(connection){
        connection.query("INSERT INTO imagenes SET ?",imageData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,"Imagen Subida");
            }
        })
    }
}

/* Eliminar una imagen */
Images.remove=function(id,idimagen,callback){
    if(connection){
        var sql= ("DELETE FROM imagenes WHERE imagenesR="+connection.escape(id)+" and idImagenes="+connection.escape(idimagen));
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Imagen eliminada");
            }
        })
    }
}

module.exports = Images;
