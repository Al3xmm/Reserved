var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Order={};

/* Mostrar la cuenta de un pedido (productos e importe)*/
Order.findOrderProducts = function(id, callback){
  if(connection){
      var sql = ("select pp.PedidoP, pp.TipoProducto, p.IdProducto, p.Nombre from productosdepedido pp, productos p where pp.ProductoP = p.IdProducto and pp.PedidoP ="+connection.escape(id));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* Crear un pedido (cada vez que se pida un producto) */
Order.insert = function(OrderData, callback){
  if(connection){
    connection.query("INSERT INTO pedidos SET ?",OrderData,function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Pedido creado");
        }
    })
  }
}

/* Crear un producto de pedido (meter un producto en un pedido) */
Order.insertOrderProduct = function(OrderProductData, callback){
  if(connection){
    connection.query("INSERT INTO productosdepedido SET ?",OrderProductData,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto de pedido creado");
          }
      })
  }
}

/* Modificar el estado de un producto de pedido */
/*Order.updateOrderProduct = function(id, callback){
  if(connection){
      var sql = ("UPDATE productosdepedido SET ");
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto de pedido actualizado");
          }
      })
  }
}*/


module.exports = Order;
