const Thing = require("../models/Thing");

exports.getThingById=(req, resp, next)=>{
    // console.log('dedand');
    Thing.findOne({_id:req.params.id})
        .then(thing=>resp.status(200).json(thing))
        .catch(error=>res.status(404).json({msgErreur:error}));//404: erruer de creation
};

exports.geAllThings=(req, res, next) => {
    Thing.find()
        .then(things=>res.status(200).json(things))
        .catch(error=>res.status(400).json({msgErreur:error}));
};//lectures des objets thing depuis BD

exports.createThing=(req,res,next)=>{
    delete req.body._id;//pour ne pas copier le champ '_id'
    const thing_dto= new Thing({
        ...req.body//raccourcie permetant copier les champs de req.body dans les attribus de Thing.
    });
    thing_dto.save()//save retourne un promise
        .then(()=>res.status(201).json({message:'Objet enregistré...'}))//a envoyer au client
        .catch(error=>res.status(400).json({msgErreur:error}));
};

exports.editThing=(req,res,next)=>{
    ////id depuis la base mongoDB et pas l'id genere par defaut depuis le frontend qui change a chaque fois
    Thing.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
        .then(()=>res.status(200).json("Objet modifié avec succes..."))
        .catch(error=>res.status(400).json({error}));
};

exports.removeThing=(req, res, next)=>{
    Thing.deleteOne({_id:req.params.id})
        .then(()=>res.status(200).json({msg:"Objet supprimé avec succes..."}))
        .catch(error=>res.status(400).json({error}));
};