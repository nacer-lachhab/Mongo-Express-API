//gerer le routage des objets -stuff-
const express = require('express');
const auth = require('../midelware/auth')

const multer = require('../midelware/multer-config');

const router = express.Router();

//const Thing = require('../models/Thing');
const stuffController = require("../controllers/stuffController");

router.post('/',auth ,multer ,stuffController.createThing);
//ne pas mettre de parenthese on appel la fonction, on ne l'applique pas sur la route.

router.get('/:id',auth , stuffController.getThingById);

router.get('/',auth  , stuffController.geAllThings);

router.put('/:id',auth  ,stuffController.editThing)

router.delete('/:id',auth  ,stuffController.removeThing)

module.exports=router;