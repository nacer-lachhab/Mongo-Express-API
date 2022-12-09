const Thing = require("../models/Thing");
const fs = require('fs');//gestion de fichier en locale, image dans ce cas.

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
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject.userId;
    const thing_dto = new Thing({
        ...thingObject,
        userId:req.auth.userId,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        //imageUrl:req.protocol+'://'+req.get('host')+"/images/"+req.file.filename
    });

    thing_dto.save()
             .then(()=>res.status(201).json({message:'Objet enregistré...'}))
             .catch(error=>res.status(400).json({msgErreur:error}));
    // delete req.body._id;//pour ne pas copier le champ '_id'
    // const thing_dto= new Thing({
    //     ...req.body//raccourcie permetant copier les champs de req.body dans les attribus de Thing.
    // });
    // thing_dto.save()//save retourne un promise
    //     .then(()=>res.status(201).json({message:'Objet enregistré...'}))//a envoyer au client
    //     .catch(error=>res.status(400).json({msgErreur:error}));
};

exports.editThing=(req,res,next)=>{
    const thingReq = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete delete thingReq._userId;/////////tester: thingReq._userId

    Thing.findOne({_id:req.params.id})
        .then((thing)=>{
            if (thing.userId != req.auth.userId){
                res.status(401).json({message : 'non authorisé...'});
            }else {
                Thing.updateOne({_id:req.params.id},{...thingReq,_id:req.params.id})
                    .then(()=>res.status(200).json("Objet modifié avec succes..."))
                    .catch(error=>res.status(400).json({error}));
            }
        })
        .catch(error=>res.status(500).json({error}));
    ////id depuis la base mongoDB et pas l'id genere par defaut depuis le frontend qui change a chaque fois
    // Thing.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
    //     .then(()=>res.status(200).json("Objet modifié avec succes..."))
    //     .catch(error=>res.status(400).json({error}));
};

exports.removeThing=(req, res, next)=>{
    Thing.findOne({_id:req.params.id})
        .then((thing)=>{
            if(thing.userId != req.auth.userId){
                res.status(401).json({message : 'non authorisé...'});
            }else {
                const filename = thing.imageUrl.split('/images/')[1];
                //fs.unlink() method is used to remove a file or symbolic link from the filesystem.
                fs.unlink(`images/${filename}`,()=>{
                    Thing.deleteOne({_id:req.params.id})
                        .then(()=>res.status(200).json({message:'Objet Supprimé avec succé...'}))
                        .catch(error=>res.status(500).json({error}));
                })
            }
        })
        .catch(error=>res.status(500).json({error}));
};