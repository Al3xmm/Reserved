var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var Employee={};

Employee.findEmployee = function(id,callback){
    if (connection){
      var sql = ("SELECT nick,tipoempleado FROM empleados WHERE empleador="+connection.escape(id));


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

Employee.findEmployeeById=function(idempleado, callback){
    if (connection){

        var sql=("SELECT nick,tipoempleado FROM empleados WHERE idempleado="+connection.escape(idempleado));
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

Employee.insert=function(employeeData,callback){
    if(connection){
        connection.query("INSERT INTO empleados SET ?",employeeData,function(error,result){
            if (error){
                throw error;
            }else{
                return callback(null,result.insertid);
            }
        })
    }
}

Employee.update=function(employeeData,id,callback) {
    if(connection){
        var sql="UPDATE empleados SET nick="+connection.escape(employeeData.nick)+","+
                "password="+connection.escape(employeeData.password)+","+
                "tipoempleado="+connection.escape(employeeData.tipoempleado)+","+
                "empleador="+connection.escape(employeeData.empleador)+
                    "WHERE idEmpleado="+connection.escape(id);

                    console.log(sql);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Empleado actualizado");
            }
        })
    }
}

Employee.remove=function(id,callback){
    if(connection){
        var sql= "DELETE FROM empleados WHERE idEmpleado="+connection.escape(id);
        connection.query(sql,function(error,result){
            if(error){
                throw error;
            }else{
                return callback(null,"Empleado eliminado");
            }
        })
    }
}











module.exports=Employee;
