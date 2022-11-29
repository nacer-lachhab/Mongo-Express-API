//contenue de l'application Express
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');//connexion to DB mongoDB

const app = express();//creation d'une appliquation Express

const stuffRoutes = require('./routes/stuff');

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
})
//gerer le CORS:
// autoriser toutes les origines et toutes les methode sur tous les url,
//authoriser les header: {Origin, X-Requested-With, Content, Accept, Content-Type, Authorization}
//c'est le premier filtre qui s'applique avant redirection vers tout urls

// app.post(express.json());//capture les req sous format json,les met dans l'objet req
app.use(bodyParser.json());//de mm que: app.use(express.json())

app.use('/api/stuff',stuffRoutes);

module.exports=app;