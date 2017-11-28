var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Products={};

/* Mostrar todos los productos de un Restaurante*/
Products.findByRestaurantId = function(id,callback){
    if (connection){
      var sql = ("SELECT * FROM productos WHERE RestauranteP ="+connection.escape(id));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }
          else{
              return callback(null,rows);
          }
      })
    }
}

/* Borrar un producto de un restaurante*/
Products.remove = function(id,product,callback){
    if (connection){
      var sql = ("DELETE FROM productos WHERE IdProducto ="+connection.escape(product)+" AND RestauranteP ="+connection.escape(id));
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }
          else{
              return callback(null,"Producto eliminado");
          }
      })
    }
}

/* Crear un producto en un restaurante*/
Products.insert = function(productData,callback){
    if (connection){
      connection.query("INSERT INTO productos SET ?",productData,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,result.insertid);
          }
      })
    }
}


/* Modifica un producto en un restaurante*/
Products.update = function(id,idproducto, productData,callback){
    if(connection){
        var sql="UPDATE productos SET Nombre="+connection.escape(productData.Nombre)+","+
                "Precio="+connection.escape(productData.Precio)+","+
                "Tipo="+connection.escape(productData.Tipo)+","+
                "Descripcion="+connection.escape(productData.Descripcion)+","+
                "WHERE IdProducto="+connection.escape(idproducto)+"AND RestauranteP = "+connection.escape(id);
               

                connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Producto actualizado");
            }
        })
    }
}

module.exports = Products;
