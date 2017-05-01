/*
 * Initation
 */
var Model = require('../models/models.js');
var Daten = Model.Daten;
var Raum = Model.Raum;

var self = module.exports =  {
    create : function (req, res){
        var raum = new Raum();
         raum.set('bezeichnung', req.body.bezeichnung);
         raum.set('display', req.body.bezeichnung);
         raum.set('beschraenkt', req.body.beschraenkt);
         raum.set('zutrittvon', req.body.zutrittvon);
         raum.set('zutrittbis', req.body.zutrittbis);
         raum.set('zutrittsmittel', req.body.zutrittsmittel);
         raum.set('daten', req.body.daten);
         raum.save(function(err){
             if(err){
                 console.log('err: ' + err);
             } else {
                 res.json(raum);
             }
         });
     },

    delete : function (req, res){
        Raum.findOneAndRemove({_id: req.body._id}, function(err){
            if (err){
                console.log('err: ' + err);
            } else {
                res.json({msg: 'Objekt gelöscht'});
            }
        });
    },

    save : function (req, res){
        Raum.findOne({_id: req.body._id}).exec(function(err, raum) {
            if (err) {
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                    raum.bezeichnung = req.body.bezeichnung;
                    raum.display = req.body.bezeichnung;
                }
                if (req.body.zutrittvon !== undefined & req.body.zutrittvon !== null) {
                    raum.zutrittvon = req.body.zutrittvon;
                }
                if (req.body.zutrittbis !== undefined & req.body.zutrittbis !== null) {
                    raum.zutrittbis = req.body.zutrittbis;
                }
                if (req.body.beschraenkt === undefined | req.body.beschraenkt === null | req.body.beschraenkt === false ){
                    raum.beschraenkt = false;
                } else {
                    raum.beschraenkt = true;
                }
                if (req.body.daten !== null & req.body.daten !== undefined){
                    raum.daten = [];
                    for ( var data of req.body.daten ){
                        if (data !== null) {
                            raum.daten.push(data._id);
                        }
                    }             
                }
                console.log('zutrittsmittel: ' + JSON.stringify(req.body.zutrittsmittel));
                if (req.body.zutrittsmittel !== null & req.body.zutrittsmittel !== undefined){
                    raum.zutrittsmittel = [];
                    for ( var zutrittsmittel of req.body.zutrittsmittel ){
                        if (zutrittsmittel !== null) {
                            raum.zutrittsmittel.push(zutrittsmittel._id);
                        }
                    }  
                }
                raum.save(
                    function(err){
                        if(err){
                            console.log('err: ' + err);
                        } else {
                            console.log('saved: ' + raum);
                            res.json(raum);
                        }
                    }
                );
            }
        }); 
    },

    list : function(req, res){
        Raum.find()
                .populate('daten')
                .populate('zutrittsmittel')
                .exec(function(err, raum) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                res.send(raum);
            }
        });
    },

    get : function(req, res){
        Raum.find({_id: req.query['id']})
                .populate('daten')
                .populate('zutrittsmittel')
                .exec(function(err, raum) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                console.log('raum: ' + JSON.stringify(raum));
                res.json({object : raum});
            }
        });
    }
};
