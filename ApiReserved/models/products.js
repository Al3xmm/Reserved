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


module.exports = Products;
