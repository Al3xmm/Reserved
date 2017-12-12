var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Order={};

/* Mostrar productos de un pedido*/
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

/* Eliminar un pedido */
Order.remove = function(id, callback){
  if(connection){
    connection.query("DELETE from pedidos where IdPedido = "+connection.escape(id),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Pedido eliminado");
        }
    })
  }
}

/* Modificar un pedido (Probar) */
Order.update = function(OrderData, callback){
  if(connection){
      var sql = "UPDATE pedidos set AsignarE = "+connection.escape(OrderData.asignare)+", CuentaTotal = "+connection.escape(OrderData.cuentatotal)+" , Mesa = "+connection.escape(OrderData.mesa)+ " where IdPedido = "+OrderData.IdPedido;
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Pedido actualizado");
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

/* Eliminar un producto de pedido (Falta probar)*/
Order.removeOrderProduct = function(id, product, callback){
  if(connection){
    connection.query("DELETE from productosdepedido where PedidoP = "+connection.escape(id)+" and ProductoP = "+connection.escape(product),function(error,result){
        if (error){
            throw error;
        }else{
            return callback(null,"Producto de pedido eliminado");
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
