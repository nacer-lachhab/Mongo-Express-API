//contenue de l'application Express
const express = require('express');

const app = express();//creation d'une appliquation Express

app.use((req,
         resp,
         next)=>{
    console.log('requete recue 1');
    resp.status(203);
    //resp.json({message:"Bienvenue sur Express Server"});
    next.call();
});

app.use((req,
         resp)=>{
    console.log('recue 2');
    resp.json({message:"Bienvenue sur Express Server"})
});//peu importe le type de requette c est tjrs use qui serai execute.

module.exports=app;//rendre l'application exportable,importable depuis les autres fichiers.