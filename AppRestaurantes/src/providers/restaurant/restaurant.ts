import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class RestaurantProvider {

  login_correcto=false;
  logueado=false;

  //info del login
  session:any;

  //datos del restaurante logueado
  inforestaurant:any;

  //empleados del restaurante logueado
  empleadosrestaurante:any;

  agregar_correcto=false;

  //carta del restaurante logueado
  cartarestaurante:any;

  anyadir_producto=false;

  modificar_producto=false;

  //idproducto que queremos modificar
  productoactual:any;

  //informacion producto a modificar
  infoproductoactual:any;

  //comentarios hechos hacia mi restaurante
  comentariosrestaurante:any;

  //boolean para comprobar si se ha denunciado o ya estaba denunciado (el comentario)
  denunciada=false;

  //info del aforo un dia en concreto
  aforo:any;

  //info de las reservas un dia en un turno concreto
  reservas:any

  //Info de los pedidos en curso del empleado logueado
  pedidosencurso:any

  //Info con los productos del pedido que estamos viendo
  productosdepedido:any

  //Info donde estan todas las categorias de un restaurante
  categoriasrestaurante:any

  //Id del pedido actual
  idpedidoactual:any

  //Productos que un CAMARERO tiene que llevar a mesa
  productospendientes:any;

  //Productos que un COCINERO tiene que hacer
  productosapreparar

  //Reservas del dia actual
  reservastoday:any;

  todoscomentarios:any;

  infocomida:any;

  infocena:any;

  allcategorias:any;

  productoscategoria:any;

  urlfotopreview:any;

  latlng:any;

  constructor(public http: HttpClient, private alertCtrl: AlertController, public storage:Storage, private transfer: FileTransfer) {
    
  }

  add_restaurant(data){
    let url="api/addrestaurant";

    return this.http.post(url, data, {responseType: 'json'} )
      .map(resp=>{
        //si entra, significa que el email ya esta siendo utilizado por otro usuario.
        console.log(resp);
        if(resp==='Email no disponible'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email ya en uso",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Restaurante creado");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);
        };

      })
  }

  login_restaurant(data){
    let url="api/loginrestaurant";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Login correcto");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);

          this.restaurant_profile(this.session.idRestaurante,this.session.token);


        }
      })
  }

  login_empleado(data){
    let url="api/loginempleado";

    return this.http.post(url,data,{responseType:'json'})
    .map(resp=>{
      
      if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else{
        console.log("Login correcto");
        this.logueado=true;
        this.login_correcto=true;
        //guardamos la informacion del usuario
        this.session=resp;
        //Guardar en el storage
        this.storage.set('idEmpleado', this.session.idRestaurante);
        this.storage.set('token', this.session.token);

        //this.restaurant_profile(this.session.idRestaurante,this.session.token);


      }
    })
  }

  modify_restaurant(data){
    let url="api/restaurants/";
    return this.http.put(url+this.session.idRestaurante, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Restaurante Actualizado");
          this.restaurant_profile(this.session.idRestaurante,this.session.token)

      })
  }

  modify_employee(data){
    let url="api/restaurants/employee/";
    return this.http.put(url+this.session.idEmpleado, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Pass Actualizada");
          //this.restaurant_profile(this.session.idRestaurante,this.session.token)
      })
  }


  restaurant_profile(id,token){
    let url="api/restaurants/";
    this.http.get(url+id,{headers: {'token-acceso':token}}).subscribe(data=>{
      this.inforestaurant=data;
    });

  }

  mis_empleados(){
    let url="api/restaurants/";

    this.storage.get('idRestaurante').then((val) => {
      this.storage.get('token').then((val2) => {
        this.http.get(url+val+"/employee",{headers: {'token-acceso':val2}}).subscribe(data=>{
          this.empleadosrestaurante=data;
        });
      });
    });

  }

  eliminar_empleado(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/employee/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mis_empleados();
    });

  }

  add_empleado(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/employee", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Empleado Creado");
          this.mis_empleados();
          this.agregar_correcto=true;

      })
  }

  mi_carta(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/products",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.cartarestaurante=data;
    });
  }

  eliminar_producto(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/products/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mi_carta();
    });
  }

  add_category(data){
    let url="api/restaurants/";
    return this.http.post(url+this.session.idRestaurante+"/products/category", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Categoria creada");
      },err=>{
        console.log(err);
      })
  }

  see_category(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/category",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.categoriasrestaurante=data;
    });
  }

  add_producto(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/products", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Producto Añadido");
          this.mi_carta();
          this.anyadir_producto=true;

      })
  }

  modify_producto(data){
    let url="api/restaurants/";

    return this.http.put(url+this.session.idRestaurante+"/products/"+ this.productoactual, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Producto Actualizado");
          this.mi_carta();
          this.modificar_producto=true;

      })

  }

  producto_id(id){
    let url="api/restaurants/allproducts/";

    this.http.get(url+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.infoproductoactual=data;
    });

  }

  mis_comentarios(){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/comments",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.comentariosrestaurante=data;
      });
  }

  find_comment(data){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/findcomment/"+data,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.comentariosrestaurante=data;
      });
  }
  
  denunciar_comentario(data){
    let url="api/restaurants/denunciation";
    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
        if(resp==='Denuncia ya realizada'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Denuncia ya realizada",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Denuncia Creada");
          this.denunciada=true;
        }

      })
  }

  cambiar_estado_denunciado(comentario){
    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/comment/"+comentario+"/denunciado",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        
      });
  }

  see_reservas(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/capacity", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Mostrando reservas");
          this.aforo=resp;
      })
  }

  mostrar_reservas(dia,turno){

    let fecha=dia.split('-');
    let anyo=fecha[0];
    let mes=fecha[1];
    let fecha2=fecha[2].split('T');
    let aux=parseInt(fecha2[0]);
    let day=aux+1;
    let finishdate=anyo+"-"+mes+"-"+day;

    let url="api/restaurants/";
      this.http.get(url+this.session.idRestaurante+"/"+finishdate+"/"+turno+"/reservations",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.reservas=data;
      });
  }

  //variable auxiliar para guardar el id del pedido
  aux:any;

  add_pedido(data){
    let url="api/restaurants/orders";

    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.aux=resp;
          this.ver_pin(this.aux.idPedido);
          this.info_pedido(this.aux.idPedido);
          console.log("Pedido Creado");

      })
  }

  //metodo para crear la reserva antes que el pedido si no se le asigna una reserva existente
  idreservaaux:any;

  add_reserva_pedido(data){
    let url="api/restaurants/reservationorder";

    return this.http.post(url, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.idreservaaux=resp;
          console.log("Reserva Creada");

      })

  }

  delete_pin(id){
    let url="api/restaurants/";
      this.http.get(url+id+"/deletepin",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        
      });
  }

  pedidos_en_curso(){
    let url="api/restaurants/currentorders/";
      this.http.get(url+this.session.idEmpleado,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.pedidosencurso=data;
      });
  }

  cerrar_pedido(id){
    let url="api/restaurants/currentorders/finish/";
    this.http.get(url+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      console.log("Pedido cerrado");
    });
  }

  info_pedido(id){
    let url="api/restaurants/orders/";
    this.http.get(url+id+"/orderproducts",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productosdepedido=data;
      this.idpedidoactual=id;
    });
  }

  //pin de la reserva del pedido que estamos viendo
  pin:any;

  ver_pin(id){
    let url="api/restaurants/";
    this.http.get(url+id+"/pin",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.pin=data;
      if(this.pin!=null){
        this.pin=this.pin[0].pin;
      }
    });
  }

  anyadir_precio_productodepedido(idpedido,idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+idpedido+"/deleteproduct/"+idproducto,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      //Precio cambiado
    }); 
  }

  eliminar_productodepedido(id,idproducto){
    let url="api/restaurants/orders/";

    this.http.delete(url+this.productosdepedido[0].PedidoP+"/orderproducts/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.anyadir_precio_productodepedido(this.productosdepedido[0].PedidoP, idproducto);
      this.info_pedido(this.productosdepedido[0].PedidoP);
    });
  }

  anyadir_producto_pedido(data){
    let url="api/restaurants/orders/";
    return this.http.post(url+this.idpedidoactual+"/orderproducts", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
        
      })
  }

  sumar_precio(idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.idpedidoactual+"/addproduct/"+idproducto,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      //Precio cambiado
    }); 
  }

  see_productosaentregar(){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.session.idEmpleado+"/pendientes",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productospendientes=data;
    });
  }

  producto_entregado(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/servido", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          console.log("Producto Servido");
          this.see_productosaentregar();
      })
  }

  see_productoscocinar(){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.session.idRestaurante+"/apreparar",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.productosapreparar=data;
    });
  }

  producto_preparado(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/preparado", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          console.log("Producto Preparado");
          this.see_productoscocinar();
      })
  }

  producto_preparando(data){
    let url="api/restaurants/orders/";

    this.http.get(url+data+"/orderproducts/preparando", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(resp=>{
          console.log("Producto Preparando");
          this.see_productoscocinar();
      })
  }

  reservas_today(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/reservationstoday", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.reservastoday=data;
      })
  }

  borrar_pin(){
    let url="api/restaurants/deletepin/";

    this.http.get(url+this.pin, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.pin=null;
      })
  }

  see_info(dia){
    this.see_info_comida(dia);
    this.see_info_cena(dia);
  }

  see_info_comida(dia){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/informationlunch/"+dia, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.infocomida=data;
      })
  }

  see_info_cena(dia){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/informationdinner/"+dia, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.infocena=data;
      })
  }

  categorias_restaurante(){
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+this.session.idRestaurante+"/category",{headers: {'token-acceso':val}}).subscribe(data=>{
        this.allcategorias=data;
      });
    });
  }

  productos_porcategoria(id){
    let url = "api/restaurants/";
    this.http.get(url+this.session.idRestaurante+"/products/"+"category/"+id,{headers:{'token-acceso':this.session.token}})
    .subscribe(data=>{
      this.productoscategoria =data;
      //console.log(this.productoscategoria);
    })
  }

  upload_image(data){
    let url = "api/17/uploadprincipal";
 
    // File for Upload
    var targetPath = data;
 
    var options: FileUploadOptions = {
      fileKey: 'imagensubir',
      chunkedMode: false,
      mimeType: 'image/jpeg',
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

  numfoto:any;

  upload_imagesec(data){
    let url = "api/17/uploadsecundaria"+this.numfoto;
 
    // File for Upload
    var targetPath = data;
 
    var options: FileUploadOptions = {
      fileKey: 'imagensubir',
      chunkedMode: false,
      mimeType: 'image/jpeg',
    };
 
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }


}
