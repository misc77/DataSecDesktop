/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {
    var user = require('./controllers/user_controller');
    var mitarbeiter = require('./controllers/mitarbeiter_controller');
    var standort = require('./controllers/standort_controller');
    var aufgabe = require('./controllers/aufgabe_controller');
    var musterrolle = require('./controllers/musterrolle_controller');
    var beschaeftigung = require('./controllers/beschaeftigung_controller');
    var rechte = require('./controllers/rechte_controller');
    var daten = require('./controllers/daten_controller');
    var rolle = require('./controllers/rolle_controller');
    var fahrzeug = require('./controllers/fahrzeug_controller');
    var ressource = require('./controllers/ressource_controller');
    var ressourcentyp = require('./controllers/ressourcentyp_controller');
    var tresor = require('./controllers/tresor_controller');
    var papierdokumente = require('./controllers/papierdokument_controller');
    var zutrittsmittel = require('./controllers/zutrittsmittel_controller');
    var zutrittsmittelStatus = require('./controllers/zutrittsmittelStatus_controller');
    var mitarbeiterStatus = require('./controllers/mitarbeiterStatus_controller');
    var raum = require('./controllers/raum_controller');
    var report = require('./controllers/report_controller');
            
    /**************************
     *      General Routes 
     ***************************/
//    app.all('*', function(req, res, next){
//        var result = user.ping();
//        if(result === 1 | result === 2){
//            next();
//        } else {
//            res.redirect('/disconnected', {message: 'Disconnected from Database! (' + result + ')'});
//        }
//    });
    app.get('/api/connection/state',   user.connectionState);
    app.all('/disconnected',           function(res, req) { res.redirect('/disconnected'); });
    
    /**************************
     *      Standort Routes 
     ***************************/
    app.post('/api/standort/create',    standort.create); 
    app.post('/api/standort/save',      standort.save); 
    app.post('/api/standort/delete',    standort.delete); 
    app.get('/api/standort/list',       standort.list) ;
    app.get('/api/standort/list_active',standort.list_active) ;
    app.get('/api/standort/get',        standort.get) ;
    
    /**************************
     *      Aufgabe Routes 
     ***************************/
    app.post('/api/aufgabe/create',     aufgabe.create); 
    app.post('/api/aufgabe/save',       aufgabe.save); 
    app.post('/api/aufgabe/delete',     aufgabe.delete); 
    app.get('/api/aufgabe/list',        aufgabe.list) ;
    app.get('/api/aufgabe/get',         aufgabe.get) ;
    
    /**************************
     *      Muster Rolle 
     ***************************/
    app.post('/api/musterrolle/create',     musterrolle.create); 
    app.post('/api/musterrolle/save',       musterrolle.save); 
    app.post('/api/musterrolle/delete',     musterrolle.delete); 
    app.get('/api/musterrolle/list',        musterrolle.list) ;
    app.get('/api/musterrolle/get',         musterrolle.get) ;
    app.get('/api/musterrolle/get_new_obj', musterrolle.get_new_obj) ;
    app.get('/api/musterrolle/exist',       musterrolle.exist);
    
     /**************************
     *      Befugniss Routes 
     ***************************/
    app.post('/api/befugnisse/create',         mitarbeiter.create); 
    app.post('/api/befugnisse/save',           mitarbeiter.save); 
    app.get('/api/befugnisse/list',            mitarbeiter.list) ;
    app.get('/api/befugnisse/get',             mitarbeiter.get) ;
    app.get('/api/befugnisse/get_new_obj',     mitarbeiter.get_init_rights) ;
   
    /**************************
     *      Beschaeftigung Routes 
     ***************************/
    app.post('/api/beschaeftigung/create',     beschaeftigung.create); 
    app.post('/api/beschaeftigung/save',       beschaeftigung.save); 
    app.post('/api/beschaeftigung/delete',     beschaeftigung.delete); 
    app.get('/api/beschaeftigung/list',        beschaeftigung.list) ;
    app.get('/api/beschaeftigung/get',         beschaeftigung.get) ;
    
    /**************************
     *      Berechtigung Routes 
     ***************************/
    app.post('/api/rechte/create',     rechte.create); 
    app.post('/api/rechte/save',       rechte.save); 
    app.post('/api/rechte/delete',     rechte.delete); 
    app.get('/api/rechte/list',        rechte.list) ;
    app.get('/api/rechte/get',         rechte.get) ;
    
    /**************************
     *      Daten Routes 
     ***************************/
    app.post('/api/daten/create',       daten.create); 
    app.post('/api/daten/save',         daten.save); 
    app.post('/api/daten/delete',       daten.delete); 
    app.get('/api/daten/list',          daten.list) ;
    app.get('/api/daten/get',           daten.get) ;
    
    /**************************
     *      Rollen Routes 
     ***************************/
    app.post('/api/rolle/create',       rolle.create); 
    app.post('/api/rolle/save',         rolle.save); 
    app.post('/api/rolle/delete',       rolle.delete); 
    app.get('/api/rolle/list',          rolle.list) ;
    app.get('/api/rolle/get',           rolle.get) ;
    
    /**************************
     *      Fahrzeug Routes 
     ***************************/
    app.post('/api/fahrzeug/create',    fahrzeug.create); 
    app.post('/api/fahrzeug/save',      fahrzeug.save); 
    app.post('/api/fahrzeug/delete',    fahrzeug.delete); 
    app.get('/api/fahrzeug/list',       fahrzeug.list) ;
    app.get('/api/fahrzeug/get',        fahrzeug.get) ;
       
    /**************************
     *      Ressource Routes 
     ***************************/
    app.post('/api/ressourcen/create',  ressource.create); 
    app.post('/api/ressourcen/save',    ressource.save); 
    app.post('/api/ressourcen/delete',  ressource.delete); 
    app.get('/api/ressourcen/list',     ressource.list) ;
    app.get('/api/ressourcen/list_active',ressource.list_active) ;
    app.get('/api/ressourcen/get',      ressource.get) ;
    
    /**************************
     *      RessourceTyp Routes 
     ***************************/
    app.post('/api/ressourcentyp/create',       ressourcentyp.create); 
    app.post('/api/ressourcentyp/save',         ressourcentyp.save); 
    app.post('/api/ressourcentyp/delete',       ressourcentyp.delete); 
    app.get('/api/ressourcentyp/list',          ressourcentyp.list) ;
    app.get('/api/ressourcentyp/get',           ressourcentyp.get) ;
    
    /**************************
     *      Tresor Routes 
     ***************************/
    app.post('/api/tresor/create',      tresor.create); 
    app.post('/api/tresor/save',        tresor.save); 
    app.post('/api/tresor/delete',      tresor.delete); 
    app.get('/api/tresor/list',         tresor.list) ;
    app.get('/api/tresor/list_active',  tresor.list_active) ;
    app.get('/api/tresor/get',          tresor.get) ;
    
    /**************************
     *      Papierdokumente Routes 
     ***************************/
    app.post('/api/papierdokumente/create',      papierdokumente.create); 
    app.post('/api/papierdokumente/save',        papierdokumente.save); 
    app.post('/api/papierdokumente/delete',      papierdokumente.delete); 
    app.get('/api/papierdokumente/list',         papierdokumente.list) ;
    app.get('/api/papierdokumente/list_active',  papierdokumente.list_active) ;
    app.get('/api/papierdokumente/get',          papierdokumente.get) ;
    
    /**************************
     *      Zutrittsmittel Routes 
     ***************************/
    app.post('/api/zutrittsmittel/create',      zutrittsmittel.create); 
    app.post('/api/zutrittsmittel/save',        zutrittsmittel.save); 
    app.post('/api/zutrittsmittel/delete',      zutrittsmittel.delete); 
    app.get('/api/zutrittsmittel/list',         zutrittsmittel.list) ;
    app.get('/api/zutrittsmittel/get',          zutrittsmittel.get) ;
    app.get('/api/zutrittsmittel/get_new_obj',  zutrittsmittel.get_new_obj) ;
    
     /**************************
     *     Zutrittsmittel Status Routes 
     ***************************/
    app.post('/api/zutrittsmittelstatus/create',     zutrittsmittelStatus.create); 
    app.post('/api/zutrittsmittelstatus/save',       zutrittsmittelStatus.save); 
    app.post('/api/zutrittsmittelstatus/delete',     zutrittsmittelStatus.delete); 
    app.get('/api/zutrittsmittelstatus/list',        zutrittsmittelStatus.list) ;
    app.get('/api/zutrittsmittelstatus/get',         zutrittsmittelStatus.get) ;
    app.get('/api/zutrittsmittelstatus/get_new_obj', zutrittsmittelStatus.get_new_obj) ;
    
    /**************************
     *     Mitarbeiter Status Routes 
     ***************************/
    app.post('/api/mitarbeiterstatus/create',  mitarbeiterStatus.create); 
    app.post('/api/mitarbeiterstatus/save',    mitarbeiterStatus.save); 
    app.post('/api/mitarbeiterstatus/delete',  mitarbeiterStatus.delete); 
    app.get('/api/mitarbeiterstatus/list',     mitarbeiterStatus.list) ;
    app.get('/api/mitarbeiterstatus/get',      mitarbeiterStatus.get) ;
    
    
     /**************************
     *     Raum Routes 
     ***************************/
    app.post('/api/raum/create',  raum.create); 
    app.post('/api/raum/save',    raum.save); 
    app.post('/api/raum/delete',  raum.delete); 
    app.get('/api/raum/list',     raum.list) ;
    app.get('/api/raum/get',      raum.get) ;
    
    /**************************
     *      Mitarbeiter Routes 
     ***************************/
    app.post('/api/mitarbeiter/create',         mitarbeiter.create );
    app.post('/api/mitarbeiter/save',           mitarbeiter.save); 
    app.post('/api/mitarbeiter/delete',         mitarbeiter.delete); 
    app.get('/api/mitarbeiter/list',            mitarbeiter.list) ;
    app.get('/api/mitarbeiter/get',             mitarbeiter.get) ;
    app.get('/api/mitarbeiter/get_new_obj',     mitarbeiter.get_new_obj) ;
    app.get('/api/mitarbeiter/get_init_right',  mitarbeiter.get_init_rights);
    
    /**************************
     *      Report Routes 
     ***************************/
    app.post('/api/auswertungen/create',        report.create );
    app.post('/api/auswertungen/save',          report.save); 
    app.post('/api/auswertungen/delete',        report.delete); 
    app.get('/api/auswertungen/list',           report.list) ;
    app.get('/api/auswertungen/get',            report.get) ;
    app.get('/api/auswertungen/get_new_obj',    report.get_new_obj);
    app.get('/api/auswertungen/query',          report.query);     
         
    /**************************
     *      USER Routes 
     ***************************/
    app.get('/api/benutzer/list',        user.list);
    app.get('/api/benutzer/get',         user.get);
    app.get('/api/benutzer/exists',      user.exists);
    app.post('/api/benutzer/save',       user.save);
    app.post('/api/benutzer/delete',     user.delete);
    app.post('/api/benutzer/create',     user.create);
    app.post('/api/ping',                user.ping);
    
    app.get('/api/user/loggedIn', function(req, res){
       if(req.session.user){
           res.json(req.session.user);                    
       } else {
           //res.json(404, {err: 'User Not Found!'});
       }
    });
    
    //home
    app.get('/', function(req, res){
        if(req.session.user) {
            res.render('index', { username: req.session.username, msg:req.session.msg, submenu:req.session.submenu } );
        }else {
            user.checkIsInit(req, res);
        }
    });
    app.get('/home', function(req, res){
        if(req.session.user) {
            res.render('index', { username: req.session.username, msg:req.session.msg, submenu:req.session.submenu } );
        }else {
            res.redirect(401, '/login');
        }
    });
    //modify user
    app.get('/user', function(req, res){
        console.log("user...");
        if(req.session.user){
            res.render('user');
        } else {
            res.redirect(401, '/login', {message: 'Access denied!'});
        }
    });    
    //signup
    app.get('/signup', function(req, res){
        if(req.session.user){
            res.redirect('/home', { username: req.session.user.name});
        } 
        res.render('signup');
    });
    //login
    app.get('/login', function(req, res){
        console.log("login...");
        if(req.session.user){
            res.redirect(200, '/home', { username: req.session.user.name, msg: req.session.msg});
        }else{
            res.render('login', {msg: req.session.msg});
        }
    });
    app.get('/locked', function(req, res){
        res.render('locked');
    });
    app.get('/failed', function(req, res){
        res.render('failed');
    });
    app.get('/inactive', function(req, res){
        res.render('inactive');
    });
    app.get('/notfound', function(req, res){
        res.render('notfound');
    });
    //logout
    app.get('/logout', function(req, res){
        if(req.session.user){
            req.session.destroy(function(){
                console.log('log out: redirect');
                res.render('login');
            });
        }
    });
    app.get('*',function(req, res){
        res.render('index');
    });    
    app.post('/signup',       user.signup);
    app.post('/user/update',  user.updateUser);
    app.post('/user/delete',  user.deleteUser);
    app.post('/login',        user.login);
    app.post('/user/profile', user.getUserProfile);
};
