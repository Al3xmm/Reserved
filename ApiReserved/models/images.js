var mysql=require("mysql");


var configDB=require("../config/configdb");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: configDB.dbreserved.host,
        user: configDB.dbreserved.user,
        password: configDB.dbreserved.password,
        database: configDB.dbreserved.database
});

var Images={};


Images.uploadimage=function(file,img_name,id,callback){
  var aux=id+"_"+file.name;

  if(connection){
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"){
      file.mv('../ApiReserved/images/'+aux, function(err) {
         if (err){
          throw err;
         }

        var imgData={
            idImagenes:null,
            url:aux,
            imagenesR:id
        };

          connection.query("INSERT INTO imagenes SET ?",imgData,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Imagen Subida");
            }
        })
      });
    } else {
      res.json(200,"This format is not allowed , please upload file with '.png','.jpg'");
    }
  }
}

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
