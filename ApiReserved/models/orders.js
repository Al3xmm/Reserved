var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Order={};


/* Mostar todos los pedidos */
Order.all= function(callback){
    if (connection){
        connection.query("SELECT CuentaTotal,Mesa FROM pedidos",function (error,rows){
            if (error){
                throw error;
            }else{
                return callback(null,rows);
            }
        })
    }
}

/* Mostar un pedido buscado por su Id */
Order.findOneById=function(id, callback){
    if (connection){
        var sql=("SELECT CuentaTotal,Mesa FROM pedidos WHERE IdPedido ="+connection.escape(id));
        connection.query(sql,function(error,row){
            if (error){
                throw error;
            }else{
                return callback(null,row);
            }
        })
    }
}


/* Mostrar productos de un pedido*/
Order.findOrderProducts = function(id, callback){
  if(connection){
      var sql = ("select pp.PedidoP, pp.TipoProducto, p.IdProducto, p.nombre from productosdepedido pp, productos p where pp.ProductoP = p.IdProducto and pp.PedidoP ="+connection.escape(id));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}
/*CAMBIA ESTADO DE UN PRODUCTO: PREPARAR-PREPARANDO  */
/*:idpp Id de produco de pedido :idp  ID de producto*/
Order.CambiaEstadoPP = function(id,idpp,idp, callback){
  if(connection){
    var sql = ("UPDATE productosdepedido SET tipoproducto='Preparando' where productop = "+ connection.escape(idp) +" and pedidop  ="+connection.escape(id)+"and tipoproducto='Preparar' and idProductoDePedido ="+connection.escape(idpp));
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto Preparandose");
          }
      })
  }
}
/*CAMBIA ESTADO DE UN PRODUCTO: PREPARANDO-PREPARADO  */
/*:idpp Id de produco de pedido :idp  ID de producto*/

Order.CambiaEstadoPP2 = function(id,idpp,idp, callback){
  if(connection){
    var sql = ("UPDATE productosdepedido SET tipoproducto='Preparado' where productop = "+ connection.escape(idp) +" and pedidop  ="+connection.escape(id)+"and tipoproducto='Preparando' and idProductoDePedido ="+connection.escape(idpp));
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){

              throw error;
          }else{
              return callback(null,"Producto Preparado");
          }
      })
  }
}

/*CAMBIA ESTADO DE UN PRODUCTO: PREPARADO-SERVIDO  */
/*:idpp Id de produco de pedido :idp  ID de producto*/

Order.CambiaEstadoPS = function(id,idpp,idp, callback){
  if(connection){
    var sql = ("UPDATE productosdepedido SET tipoproducto='Servido' where productop = "+ connection.escape(idp) +" and pedidop  ="+connection.escape(id)+"and tipoproducto='Preparado' and idProductoDePedido ="+connection.escape(idpp));
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,"Producto Servido");
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

/* GET de productos de pedido por tipo de producto */
Order.findOrderProductsbyType = function(id,tipo, callback){
  if(connection){
      var sql = ("select pp.PedidoP, pp.TipoProducto, p.IdProducto, p.nombre from productosdepedido pp, productos p where pp.ProductoP = p.IdProducto and pp.PedidoP ="+connection.escape(id)+"and pp.TipoProducto="+connection.escape(tipo));
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas */
Order.findOrderbyBill = function(id, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap");
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas por nombre de restaurante */

Order.findOrderbyBillbyName = function(id,nombre,callback){
  if(connection){
      var sql = ("select re.nombre,p.cuentatotal from  pedidos p,reservas r,restaurantes re where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and r.restauranter=re.idrestaurante and re.nombre="+connection.escape(nombre));
      console.log(sql);
      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas filtrado por precio */
Order.findOrderbyBillFilterPrice = function(id,cuentainicial,cuentafinal, callback){
  if(connection){

      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal >="+connection.escape(cuentainicial)+" and p.cuentatotal <="+connection.escape(cuentafinal));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/* GET facturas filtrado por precio minimo */
Order.findOrderbyBillFilterPriceUnder = function(id,cuentainicial, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal >="+connection.escape(cuentainicial));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}


/* GET facturas filtrado por precio maximo */
Order.findOrderbyBillFilterPriceOver = function(id,cuentainicial, callback){
  if(connection){
      var sql = ("select p.cuentatotal from  pedidos p,reservas r where r.UsuarioR = "+connection.escape(id)+"and r.IdReserva=p.Reservap and p.cuentatotal <="+connection.escape(cuentainicial));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
          }
      })
  }
}

/*Metodo para avisar al camarero*/
Order.OrdersEmployee = function(id,idempleado, callback){
  if(connection){
      var sql = ("select mesa from  pedidos p where IdPedido = "+connection.escape(id)+"and asignare= "+connection.escape(idempleado));

      connection.query(sql,function(error,rows){
          if (error){
              throw error;
          }else{
              return callback(null,rows);
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

/* Modificar un pedido*/
Order.update = function(OrderData, callback){

  if(connection){
    var coma=false;

      var sql = "UPDATE pedidos set ";
      if(OrderData.asignare != undefined)
      {
        sql += "AsignarE = "+connection.escape(OrderData.asignare);
        coma=true;
      }

      if(OrderData.asignare != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }

        sql += "CuentaTotal = "+connection.escape(OrderData.cuentatotal);
        coma=true;
      }

      if(OrderData.mesa != undefined)
      {
        if(coma== true)
        {
          sql += ",";
          coma=false;
        }

        sql += "Mesa = "+connection.escape(OrderData.mesa);
        coma=true;
      }

      sql += "where IdPedido = "+OrderData.IdPedido;
      console.log(sql);

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
