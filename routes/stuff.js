//gerer le routage des objets -stuff-
const express = require('express');
const router = express.Router();

const Thing = require('../models/Thing');
const stuffController = require("../controllers/stuffController");

router.post('/',stuffController.createThing);
//ne pas mettre de parenthese on appel la fonction, on ne l'applique pas sur la route.

router.get('/:id', stuffController.getThingById)

router.get('/', stuffController.geAllThings);

router.put('/:id',stuffController.editThing)

router.delete('/:id',stuffController.removeThing)

module.exports=router;