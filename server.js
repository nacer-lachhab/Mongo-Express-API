const http = require('http');//importer le package http Natif de Node.

const server = http.createServer((req,resp)=>{
    resp.end('hi from server nodemon');
});

server.listen(process.env.PORT || 3000);
//3000 par defaut sinon le port proposé par la plateforme de déploiement
//process.env.PORT: variable d'environnement du port