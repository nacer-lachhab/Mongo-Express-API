//contenue de l'application Express
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');//connexion to DB mongoDB
const Thing = require('./models/Thing');

const app = express();//creation d'une appliquation Express

mongoose.connect('mongodb+srv://nacerLACHHAB:n22a01c1995@cluster0.i5tukzj.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req,
         res,
         next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // console.log('permited');
    next();
});
//gerer le CORS:
// autoriser toutes les origines et toutes les methode sur tous les url,
//authoriser les header: {Origin, X-Requested-With, Content, Accept, Content-Type, Authorization}
//c'est le premier filtre qui s'applique avant redirection vers tout urls

// app.post(express.json());//capture les req sous format json,les met dans l'objet req
app.use(bodyParser.json());//de mm que: app.use(express.json())

app.post('/api/stuff',(req,
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
app.get('/api/stuff/:id',(req,
                         resp,
                         next)=>{
    // console.log('dedand');
    Thing.findOne({_id:req.params.id})
        .then(thing=>resp.status(200).json(thing))
        .catch(error=>res.status(404).json({msgErreur:error}));//404: erruer de creation
})

app.get('/api/stuff', (req,
                       res,
                       next) => {
    Thing.find()
         .then(things=>res.status(200).json(things))
         .catch(error=>res.status(400).json({msgErreur:error}));
});

app.put('/api/stuff/:id',(req,
                         res,
                         next)=>{
    ////id depuis la base mongoDB et pas l'id genere par defaut depuis le frontend qui change a chaque fois
    Thing.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
        .then(()=>res.status(200).json("Objet modifié avec succes..."))
        .catch(error=>res.status(400).json({error}));
})

app.delete('/api/stuff/:id',(req,
                          res,
                          next)=>{
    Thing.deleteOne({_id:req.params.id})
        .then(()=>res.status(200).json({msg:"Objet supprimé avec succes..."}))
        .catch(error=>res.status(400).json({error}));
})

module.exports=app;