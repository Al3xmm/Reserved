var mysql=require("mysql");

/* Conectar con la DB */
connection=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "reserved"
});

var UserControl={};



UserControl.insert = function(ControlData,callback){
    if (connection){

      console.log(ControlData.fecha);
      var sql=("INSERT INTO controlusuarios values (" + ControlData.idcontrolu + ",'" + ControlData.usuarioid + "','" + ControlData.fecha +" ') ON DUPLICATE KEY update controlusuarios.fecha= ' " + ControlData.fecha+" ' " );
      console.log(sql);
      connection.query(sql,function(error,result){
          if (error){
              throw error;
          }else{
              return callback(null,"Login Hecho");
          }
      })


    }
}


UserControl.findUserControl = function(id,callback){
    if (connection){
      var sql = ("SELECT * FROM controlusuarios WHERE usuarioid="+connection.escape(id));


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


module.exports=UserControl;