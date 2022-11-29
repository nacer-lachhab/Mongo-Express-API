//gerer le routage des objets -stuff-
const express = require('express');
const router = express.Router();

const Thing = require('../models/Thing');

router.post('/',(req,
                       res,
                       next)=>{
    delete req.body._id;//pour ne pas copier le champ '_id'
    const thing_dto= new Thing({
        ...req.body//raccourcie permetant copier les champs de req.body dans les attribus de Thing.
    });
    thing_dto.save()//save retourne un promise
        .then(()=>res.status(201).json({message:'Objet enregistré...'}))//a envoyer au client
        .catch(error=>res.status(400).json({msgErreur:error}));
});

//'/api/stuff:id' = :id pour dire a express que id est un parametre dynamique.
router.get('/:id',(req,
                          resp,
                          next)=>{
    // console.log('dedand');
    Thing.findOne({_id:req.params.id})
        .then(thing=>resp.status(200).json(thing))
        .catch(error=>res.status(404).json({msgErreur:error}));//404: erruer de creation
})

router.get('/', (req,
                       res,
                       next) => {
    Thing.find()
        .then(things=>res.status(200).json(things))
        .catch(error=>res.status(400).json({msgErreur:error}));
});

router.put('/:id',(req,
                          res,
                          next)=>{
    ////id depuis la base mongoDB et pas l'id genere par defaut depuis le frontend qui change a chaque fois
    Thing.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
        .then(()=>res.status(200).json("Objet modifié avec succes..."))
        .catch(error=>res.status(400).json({error}));
})

router.delete('/:id',(req,
                             res,
                             next)=>{
    Thing.deleteOne({_id:req.params.id})
        .then(()=>res.status(200).json({msg:"Objet supprimé avec succes..."}))
        .catch(error=>res.status(400).json({error}));
})

module.exports=router;