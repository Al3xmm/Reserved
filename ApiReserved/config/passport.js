
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;

var configAuth = require('./auth');

var User=require("../models/users");

var prueba=false;

module.exports=function(passport){

  // Guarda el segundo parametro de la funcion "done" en la sesion para ser utilizado luego por el deserializeuser
    passport.serializeUser(function(user, done) {
      if(prueba==true){
          done(null, user.idgoogle);
      }else{
          done(null, user[0].idgoogle);
      }
        prueba=false;

    });

    // Comprueba que el primer parametro de la funcion (id) que es el parametro guardado en la sesión, corresponde con uno que exista en la DB
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


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
                      return done(null, data);
                  } else {
                      // if the user isnt in our database, create a new user

                      var googleData={
                        idUsuario:profile.id,
                        token:token,
                        email:profile.emails[0].value,
                        nombre:profile.displayName
                      };
                      User.insertGoogle(googleData,function(error,data){
                          if (error){
                              console.log("ERROR al insertar el user google");
                          }else{
                              console.log("user google INSERTADO");
                              prueba=true;
                              return done(null, googleData);
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
                        return done(null, data); // user found, return that user
                    } else {
                        //facebook no nos pasa email(?)
                        console.log(profile.id);
                        var facebookData={
                          idUsuario:profile.id,
                          token:token,
                          nombre:profile.displayName
                        };
                        User.insertGoogle(facebookData,function(error,data){
                            if (error){
                                console.log("ERROR al insertar el user facebook");
                            }else{
                                console.log("user facebook INSERTADO");
                                prueba=true;
                                return done(null, facebookData);
                            }
                        })
                    }
                  }
              });
          });
      }));


};
