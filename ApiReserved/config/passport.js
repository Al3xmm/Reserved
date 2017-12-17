
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

var configAuth = require('./auth');

var User=require("../models/users");

var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);

var prueba=false;
var tipoUsuario=0;


module.exports=function(passport){

  // Guarda el segundo parametro de la funcion ("done") en la sesion para ser utilizado luego por el deserializeuser
    passport.serializeUser(function(user, done) {
      if(prueba==true){
          done(null, user.idUsuario);
      }else{
          done(null, user[0].idUsuario);
      }
        prueba=false;

    });

    // Comprueba que el primer parametro de la funcion (id) que es el parametro guardado en la sesión, corresponde con uno que exista en la DB
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });

    });

/********************** LOGIN LOCAL *******************************/

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'nick',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, nick, password, done) { // callback with email and password from our form
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOneLocal(nick, function(error, data) {
          // if there are any errors, return the error
          if (error){
              res.json(500,error);
          }else{
          // check to see if theres already a user with that email
            if(!data){
                return done(null, false, req.flash('loginMessage', 'Usuario no encontrado.'));
            }

            var dbpass=data[0].password;
            var comparepass=bcrypt.compareSync(password, dbpass);

            if(comparepass==false){
              return done(null, false, req.flash('loginMessage', 'Contraseña erronea.'));
            }
            //tipoUsuario=1;
            return done(null,data);
          }
      });

}));



/******************* REGISTRO LOCAL *******************************/

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'nick',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, nick, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOneLocal(nick, function(error, data) {
            // if there are any errors, return the error
            if (error){
                res.json(500,error);
            }else{
            // check to see if theres already a user with that email
              if (data) {
                  return done(null, false, req.flash('signupMessage', 'That nick is already taken.'));
              } else {
                  // if there is no user with that email
                  // create the user
                  var passhash=bcrypt.hashSync(password,salt);

                  var localData={
                    nick:nick,
                    nombre:nick,
                    password:passhash,
                    email:req.body.email
                  };

                  User.insertLocal(localData,function(error,data){
                      if (error){
                          console.log("ERROR al insertar el user local");
                      }else{
                          console.log("user local INSERTADO");
                          User.takeIdlocal(localData.nick,function(error,data){
                            prueba=true;
                            //tipoUsuario=0;
                            var sessionsave={
                              idUsuario:data[0].idUsuario,
                              nick:nick,
                              nombre:nick,
                              password:passhash,
                              email:req.body.email
                            }
                            return done(null, sessionsave);
                          })
                      }
                  });
              }
            }
        });
      });

  }));


/*********************** OAUTH GOOGLE *****************************/
  passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne(profile.id, function(error, data) {
                if (error){
                    res.json(500,error);
                }else{
                  if (data) {
                      // if a user is found, log them in
                      //tipoUsuario=0;
                      return done(null, data);
                  } else {
                      // if the user isnt in our database, create a new user
                      var nickaux=profile.displayName+profile.id;

                      var googleData={
                        nick:nickaux,
                        nombre:profile.displayName,
                        idrrss:profile.id,
                        tokenrrss:token,
                        email:profile.emails[0].value
                      };
                      User.insertGoogle(googleData,function(error,data){
                          if (error){
                              console.log("ERROR al insertar el user google");
                          }else{
                              console.log("user google INSERTADO");
                              User.takeIdrrss(googleData.idrrss,function(error,data){
                                prueba=true;
                                //tipoUsuario=0;
                                console.log()
                                var sessionsave={
                                  nick:data[0].nick,
                                  idUsuario:data[0].idUsuario,
                                  idrrss:data[0].idRRSS,
                                  tokenrrss:data[0].tokenRRSS
                                }
                                return done(null, sessionsave);
                              })
                          }
                      })
                  }
                }
            });
        });

    }));


  /***************************OAUTH FACEBOOK *******************************/

  passport.use(new FacebookStrategy({
          // pull in our app id and secret from our auth.js file
          clientID        : configAuth.facebookAuth.clientID,
          clientSecret    : configAuth.facebookAuth.clientSecret,
          callbackURL     : configAuth.facebookAuth.callbackURL

      },
      // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {

          // asynchronous
          process.nextTick(function() {

              // find the user in the database based on their facebook id
              User.findOne(profile.id, function(error, data) {
                  if (error){
                      res.json(500,error);
                  }else{
                    if (data) {
                        //tipoUsuario=0;
                        return done(null, data); // user found, return that user
                    } else {
                        //facebook no nos pasa email(?)
                        var nickaux=profile.displayName+profile.id;

                        var facebookData={
                          nick:nickaux,
                          nombre:profile.displayName,
                          idrrss:profile.id,
                          tokenrrss:token,
                        };
                        User.insertGoogle(facebookData,function(error,data){
                            if (error){
                                console.log("ERROR al insertar el user facebook");
                            }else{
                                console.log("user facebook INSERTADO");
                                User.takeIdrrss(facebookData.idrrss,function(error,data){
                                  prueba=true;
                                  var sessionsave={
                                    nick:data[0].nick,
                                    idUsuario:data[0].idUsuario,
                                    idrrss:data[0].idrrss,
                                    tokenrrss:data[0].tokenrrss
                                  }
                                  return done(null, sessionsave);
                                })
                            }
                        })
                    }
                  }
              });
          });
      }));


};
