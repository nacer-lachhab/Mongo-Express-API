const http = require('http');//importer le package http Natif de Node.
const app = require('./app');//app.js, pas besoin d'jaouter .js

app.set('port',process.env.PORT || 3000)
const serverBasic = http.createServer(app);

serverBasic.listen(process.env.PORT || 3000);
//3000 par defaut sinon le port proposé par la plateforme de déploiement
//process.env.PORT: variable d'environnement du port