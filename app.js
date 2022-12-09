//contenue de l'application Express
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');//connexion to DB mongoDB

const path = require('path');

const app = express();//creation d'une appliquation Express

const stuffRoutes = require('./routes/stuff');
const userRouter = require('./routes/userRouter');
mongoose.connect('mongodb+srv://nacerLACHHAB:n22a01c1995@cluster0.i5tukzj.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//filtre sur tous urls, gestion de CORS, permit ttes les origines & ttes les methode sur tte url,
//authoriser les header: {Origin, X-Requested-With, Content, Accept, Content-Type, Authorization}
app.use((req,
         res,
         next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.post(express.json());//capture les req sous format json,les met dans l'objet req
app.use(bodyParser.json());//de mm que: app.use(express.json())

app.use('/images',express.static(path.join(__dirname,'images')));//gestion d'images en local

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRouter);//racine de tous les routes d'authentification

module.exports=app;