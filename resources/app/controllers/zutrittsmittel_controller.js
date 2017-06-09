/*
 * Initation
 */
var Model = require('../models/models.js');
var Zutrittsmittel = Model.Zutrittsmittel;

exports.create = function (req, res){
   console.log('daten: ' + req.body.toString());
   var zutrittsmittel = new Zutrittsmittel();
    zutrittsmittel.set('bezeichnung', req.body.bezeichnung);
    zutrittsmittel.set('display', req.body.bezeichnung);
    zutrittsmittel.set('beschreibung', req.body.beschreibung); 
    zutrittsmittel.set('status', req.body.status);
    zutrittsmittel.set('access_raum', req.body.access_raum);
    zutrittsmittel.set('access_tresor', req.body.access_tresor);
    zutrittsmittel.set('einmalig', req.body.einmalig);
    zutrittsmittel.set('zugewiesen', req.body.zugewiesen);
    zutrittsmittel.set('mitarbeiter', req.body.mitarbeiter);
    zutrittsmittel.set('ausgabe', req.body.ausgabe);
    zutrittsmittel.set('rueckgabe', req.body.rueckgabe);
    zutrittsmittel.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(zutrittsmittel);
        }
    });
};

exports.delete = function (req, res){
    Zutrittsmittel.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Zutrittsmittel.findOne({_id: req.body._id}).exec(function(err, zutrittsmittel) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                zutrittsmittel.bezeichnung = req.body.bezeichnung;
                zutrittsmittel.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                zutrittsmittel.beschreibung = req.body.beschreibung;
            }
            if (req.body.access_raum !== undefined & req.body.access_raum !== null) {
                zutrittsmittel.access_raum = true;
            }
            if (req.body.access_tresor !== undefined & req.body.access_tresor !== null) {
                zutrittsmittel.access_tresor = true;
            }
            if (req.body.einmalig !== undefined & req.body.einmalig !== null) {
                zutrittsmittel.einmalig = true;
            }
            if (req.body.zugewiesen !== undefined & req.body.zugewiesen !== null) {
                zutrittsmittel.zugewiesen = true;
            }
            if (req.body.status !== undefined & req.body.status !== null) {
                zutrittsmittel.status = req.body.status;
            }
            if (req.body.mitarbeiter !== undefined & req.body.mitarbeiter !== null) {
                zutrittsmittel.mitarbeiter = req.body.mitarbeiter;
            }
            if (req.body.ausgabe !== undefined & req.body.ausgabe !== null) {
                zutrittsmittel.ausgabe = req.body.ausgabe;
            }
            if (req.body.rueckgabe !== undefined & req.body.rueckgabe !== null) {
                zutrittsmittel.rueckgabe = req.body.rueckgabe;
            }
            zutrittsmittel.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(zutrittsmittel);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Zutrittsmittel.find()
            .populate('status')
            .exec(function(err, zutrittsmittel) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(zutrittsmittel);
        }
    });
};

exports.get = function(req, res){
    Zutrittsmittel.find({_id: req.query['id']})
            .populate('status')
            .populate('mitarbeiter')
            .exec(function(err, zutrittsmittel) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('object: ' + zutrittsmittel);
            res.json({object : zutrittsmittel});
        }
    });
};

exports.get_new_obj = function(req, res){
    var zutrittsmittel = new Zutrittsmittel();
    zutrittsmittel.set('bezeichnung',  'neu');
    zutrittsmittel.set('display',      'neu');
    zutrittsmittel.set('beschreibung', 'neu'); 
    zutrittsmittel.set('status',        null);
    zutrittsmittel.set('access_raum',   true);
    zutrittsmittel.set('einmalig',      true);
    zutrittsmittel.set('zugewiesen',    false);
    zutrittsmittel.set('mitarbeiter',   null);
    zutrittsmittel.set('ausgabe',       null);
    zutrittsmittel.set('rueckgabe',     null);
    res.json({object : zutrittsmittel});
};
