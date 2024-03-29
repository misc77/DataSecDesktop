/*
 * Initation
 */
var Model = require('../models/models.js');
var Tresor = Model.Tresor;
var Zutrittsmittel = Model.Zutrittsmittel;

exports.create = function (req, res){
   var tresor = new Tresor();
    tresor.set('bezeichnung', req.body.bezeichnung);
    tresor.set('display', req.body.bezeichnung);
    tresor.set('beschreibung', req.body.beschreibung); 
    tresor.set('zutrittsmittel', req.body.zutrittsmittel);
    tresor.set('aktiv', req.body.aktiv);
    tresor.set('daten', req.body.daten);
    
    tresor.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            // update zutrittsmittel to mark as assigned
            for (index in req.body.zutrittsmittel){
                var element = req.body.zutrittsmittel[index];
                console.log('updating zutrittsmittel: ' + element._id);
                Zutrittsmittel.findOneAndUpdate( { _id : element._id }, 
                                                 { $set: { 'zugewiesen' : true }} 
                                               ), function (err, zutrittsmittel){
                    console.log('updated zutrittsmittel');                       
                }
            }
            res.json(tresor);
        }
    });
    
};

exports.delete = function (req, res){
    Tresor.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Tresor.findOne({_id: req.body._id}).exec(function(err, tresor) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                tresor.bezeichnung = req.body.bezeichnung;
                tresor.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                tresor.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                tresor.aktiv = false;
            } else {
                tresor.aktiv = true;
            }
            if (req.body.daten !== null & req.body.daten !== undefined & req.body.daten.length > 0){
                tresor.daten = req.body.daten;
            }
            if (req.body.zutrittsmittel !== null & req.body.zutrittsmittel !== undefined){
                tresor.zutrittsmittel = [];
                for ( var zutrittsmittel of req.body.zutrittsmittel ){
                    if (zutrittsmittel !== null) {
                        tresor.zutrittsmittel.push(zutrittsmittel._id);
//                        console.log('updated zutrittsmittel ' + zutrittsmittel._id);   
//                        Zutrittsmittel.findOneAndUpdate( { _id : zutrittsmittel._id }, 
//                                                             { $set: { 'zugewiesen' : true }} 
//                                                           ), function (err, zutrittsmittel){
//                                
//                            };
                    }
                }  
            }
           
            tresor.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(tresor);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Tresor.find()
            .populate('daten')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(tresor);
        }
    });
};

exports.list_active = function(req, res){
    Tresor.find({active:true})
            .populate('daten')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(tresor);
        }
    });
};

exports.get = function(req, res){
    Tresor.find({_id: req.query['id']})
            .populate('daten')
            .populate('zutrittsmittel')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : tresor});
        }
    });
};
