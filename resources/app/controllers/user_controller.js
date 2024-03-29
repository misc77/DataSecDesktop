/*
 * Initation
 */
var crypto = require('crypto');
var Model = require('../models/models.js');
var User = Model.User;
var mongoose = require('mongoose');

/*
 * hashPW
 * encodes password as base64 string.
 * @param {type} pwd
 * @returns {String} hashed Password
 */
function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

exports.create = function (req, res){
   var user = new User();
    user.set('name', req.body.name);
    user.set('display', req.body.name + ' (' + req.body.rolle.display + ')');
    user.set('pwd', hashPW(req.body.password)); 
    user.set('email', req.body.email);
    user.set('aktiv', req.body.aktiv);
    user.set('rolle', req.body.rolle);
    user.set('locked', req.body.locked);
    user.set('mitarbeiter', req.body.mitarbeiter);
    user.set('raum', req.body.raum);
    user.set('ressourcen', req.body.ressource);
    user.set('hardware', req.body.hardware);
    user.set('fuhrpark', req.body.fuhrpark);
    user.set('hardware', req.body.hardware);
    user.set('rechte', req.body.rechte);
    user.set('musterrolle', req.body.musterrolle);
    user.set('auswertungen', req.body.auswertungen);
    user.set('dokumente', req.body.dokumente);
    user.set('befugnisse', req.body.befugnisse);
    user.set('aufgabe', req.body.aufgabe);
    user.set('beschaeftigung', req.body.beschaeftigung);
    user.set('datentyp', req.body.datentyp);
    user.set('ressourcentyp', req.body.ressourcentyp);
    user.set('tresor', req.body.tresor);
    user.set('standort', req.body.standort);
    user.set('zutrittsmittel', req.body.zutrittsmittel);
    user.set('mitarbeiterstatus', req.body.mitarbeiterstatus);
    user.set('zutrittsmittelstatus', req.body.zutrittsmittelstatus);
    user.set('reporttyp', req.body.reporttyp);
    user.set('admin', req.body.admin);
    user.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(user);
        }
    });
};

exports.save = function (req, res){
    User.findOne({_id: req.body._id}).exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.name !== undefined & req.body.name !== null) {
                user.name = req.body.name;
                user.display =  req.body.name + ' (' + req.body.rolle.display + ')';
            }
            if (req.body.email !== undefined | req.body.email !== null ){
                user.email = req.body.email;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null | req.body.aktiv === false){
                user.aktiv = false;
            } else {
                user.aktiv = true;
            }
            if (req.body.rolle !== null & req.body.rolle !== undefined ){
                user.rolle = req.body.rolle;
            }
            if (req.body.locked === undefined | req.body.locked === null | req.body.locked === false){
                user.locked = false;
            } else {
                user.locked = true;
            }
            if (req.body.mitarbeiter === undefined | req.body.mitarbeiter === null | req.body.mitarbeiter === false){
                user.mitarbeiter = false;
            } else {
                user.mitarbeiter = true;
            }
            if (req.body.raum === undefined | req.body.raum === null | req.body.raum === false){
                user.raum = false;
            } else {
                user.raum = true;
            }            
            if (req.body.ressourcen === undefined | req.body.ressourcen === null | req.body.ressourcen === false){
                user.ressourcen = false;
            } else {
                user.ressourcen = true;
            }
            if (req.body.hardware === undefined | req.body.hardware === null | req.body.hardware === false){
                user.hardware = false;
            } else {
                user.hardware = true;
            }
            if (req.body.rechte === undefined | req.body.rechte === null | req.body.rechte === false){
                user.rechte = false;
            } else {
                user.rechte = true;
            }            
            if (req.body.musterrolle === undefined | req.body.musterrolle === null | req.body.musterrolle === false){
                user.musterrolle = false;
            } else {
                user.musterrolle = true;
            }            
            if (req.body.auswertungen === undefined | req.body.auswertungen === null | req.body.auswertungen === false){
                user.auswertungen = false;
            } else {
                user.auswertungen = true;
            }            
            if (req.body.dokumente === undefined | req.body.dokumente === null | req.body.dokumente === false){
                user.dokumente = false;
            } else {
                user.dokumente = true;
            }
            if (req.body.befugnisse === undefined | req.body.befugnisse === null | req.body.befugnisse === false){
                user.befugnisse = false;
            } else {
                user.befugnisse = true;
            }
            if (req.body.aufgabe === undefined | req.body.aufgabe === null | req.body.aufgabe === false){
                user.aufgabe = false;
            } else {
                user.aufgabe = true;
            }
            if (req.body.beschaeftigung === undefined | req.body.beschaeftigung === null | req.body.beschaeftigung === false){
                user.beschaeftigung = false;
            } else {
                user.beschaeftigung = true;
            }
            if (req.body.datentyp === undefined | req.body.datentyp === null | req.body.datentyp === false){
                user.datentyp = false;
            } else {
                user.datentyp = true;
            }
            if (req.body.reporttyp === undefined | req.body.reporttyp === null | req.body.reporttyp === false){
                user.reporttyp = false;
            } else {
                user.reporttyp = true;
            }
            if (req.body.ressourcentyp === undefined | req.body.ressourcentyp === null | req.body.ressourcentyp === false){
                user.ressourcentyp = false;
            } else {
                user.ressourcentyp = true;
            }
            if (req.body.tresor === undefined | req.body.tresor === null | req.body.tresor === false){
                user.tresor = false;
            } else {
                user.tresor = true;
            }
            if (req.body.zutrittsmittel === undefined | req.body.zutrittsmittel === null | req.body.zutrittsmittel === false){
                user.zutrittsmittel = false;
            } else {
                user.zutrittsmittel = true;
            }
            if (req.body.mitarbeiterstatus === undefined | req.body.mitarbeiterstatus === null | req.body.mitarbeiterstatus === false){
                user.mitarbeiterstatus = false;
            } else {
                user.mitarbeiterstatus = true;
            }
            if (req.body.zutrittsmittelstatus === undefined | req.body.zutrittsmittelstatus === null | req.body.zutrittsmittelstatus === false){
                user.zutrittsmittelstatus = false;
            } else {
                user.zutrittsmittelstatus = true;
            }
            if (req.body.standort === undefined | req.body.standort === null | req.body.standort === false){
                user.standort = false;
            } else {
                user.standort = true;
            }
            if (req.body.admin === undefined | req.body.admin === null | req.body.admin === false){
                user.admin = false;
            } else {
                user.admin = true;
            }
            if (req.body.fuhrpark === undefined | req.body.fuhrpark === null | req.body.fuhrpark === false){
                user.fuhrpark = false;
            } else {
                user.fuhrpark = true;
            }
            user.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        console.log('save: ' + JSON.stringify(user));
                        res.json(user);
                    }
                }
            );
        }
    }); 
};

/*
 * SIGNUP
 */
exports.signup = function(req, res){
    console.log('in signup...');
    var user = new User();
    console.log('name: ' + req.body.username);
    console.log('pwd: ' + req.body.password);
    console.log('email: ' + req.body.email);
    user.set('name', req.body.username);
    console.log('user set');
    user.set('pwd', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.save(function(err){
        if(err){
            console.log('err: ' + err);
            res.redirect(user, '/signup');
        } else {
            req.session.regenerate(function(){
                req.session.user = user.id;
                req.session.username = user.name;
                req.session.msg = 'Logged in as ' + user.name;
                console.log('user. ' + JSON.stringify(user));
                res.redirect('/signup');
            });
        }
    });
};

/*
 * Login
 */
exports.login = function(req, res){
    console.log('in login... username: ' + req.body.username + ' ' + JSON.stringify(req.body));
    User.findOne({name: req.body.username})
            .exec(function(err, user, path){
                err = null;
                if(user === undefined | user === null){
                     err = 'User Not Found!';
                     path = '/notfound';
                } else if (user.pwd === hashPW(req.body.password.toString())) {
                    if (user.locked) {
                         err = 'Benutzer ist gesperrt!';
                         path = '/locked';
                    } else if (!user.aktiv) {
                         err = 'Benutzer ist inaktiv!';
                         path = '/inactive';
                    } else {
                        req.session.regenerate(function(){
                            req.session.user = user.id;
                            req.session.username = user.name;
                            req.session.msg = 'Logged in as ' + user.name;
                            console.log('user. ' + JSON.stringify(user));
                            res.redirect('/home');
                        });
                    }
                } else {
                    err = 'Authentication failed!';
                    path = '/failed';
                }
                
                if(err !== null && path !== undefined){
                    console.log('error: ' + err + ' path: ' + path);
                    res.redirect(path);
                }
    });
};

/*
 * Get User
 */
exports.getUserProfile = function(req, res){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user){
                if(user){
                    res.json(404, {err: 'User Not Found!'});
                } else {
                    res.json(user);
                }
    });
};

/*
 * Update User
 */
exports.updateUser = function(req, res, dataService){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user, dataService){
                user.set('email', req.body.email);
                user.save(function(err){
                    if(err){
                        req.session.err = err;
                    } else {
                        req.session.msg = 'User updated!';
                    }
                    res.redirect('/user');
                });
            });
};

/**
 * Counts users
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
exports.checkIsInit = function(req, res){
    User.find().count(function(err, count){
        console.log('user.count=' + count);
        if (count > 0) {
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    });
};

/*
 * Delete User
 */
exports.deleteUser = function(req, res, dataService){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user, dataService){
                if(user){
                    user.remove(function(err, dataService){
                        if(err){
                            req.session.err = err;
                        }
                        req.session.destroy(function(){
                            res.redirect('/login');
                        });
                    });
                } else {
                    req.session.err = 'User not found!';
                    req.session.destroy(function(){
                        res.redirect('/login');
                    });
                }
    });
};

exports.delete = function(req, res) {
     User.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.list = function(req, res){
    User.find()
            .populate('rolle')
            .exec(function(err, user) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(user);
        }
    });
};

exports.get = function(req, res){
    User.find({_id: req.query['id']})
            .populate('rolle')
            .exec(function(err, user) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : user});
        }
    });
};

exports.exists = function(req, res){
    console.log('check user: ' + req.query['name']);
    User.count({name: req.query['name']})
            .exec(function(err, result) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            var exists = false;
            if (result !== undefined && result !== null && result > 0 ){
                exists = true;
            }
            res.json({userExists : exists});
        }
    });
};

/********************************       
 *     Mongoose States
 *  0 = disconnected
 *  1 = connected
 *  2 = connecting
 *  3 = disconnecting
 *
 ********************************/
exports.ping = function(){
    console.log('in ping...');
    console.log('ping: ' + mongoose.connection.readyState);
    return mongoose.connection.readyState;  
};

exports.connectionState = function( req, res ){
    res.json({state : mongoose.connection.readyState});
};

exports.is_authorized = function(req, property){
    var query = User.find({_id: req.session.user.id});
    console.log('property: ' + property);
    query.select(property);
    query.exec( function (err, user) {
        if(err) {
            console.log('err: ' + err);
            return false;
        } else {
            console.log('user prop: ' + user[property]);
            //** Doesn't work!! **//
            if (user[property] === true) {
                return true;
            } 
            return false;
        }
    });
};
