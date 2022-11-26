//contenue de l'application Express
const express = require('express');

const app = express();//creation d'une appliquation Express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//gerer le CORS:
// autoriser toutes les origines et toutes les methode sur tous les url,
//authoriser les header: {Origin, X-Requested-With, Content, Accept, Content-Type, Authorization}
//c'est le premier filtre qui s'applique avant redirection vers tout urls

app.use(express.json());//capture les req sous format json

app.post('/api/stuff',(req,
                       res,
                       next)=>{
    console.log(req.body);
    res.status(200).json({monmsg:"test succeeded..."});
});

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});

module.exports=app;