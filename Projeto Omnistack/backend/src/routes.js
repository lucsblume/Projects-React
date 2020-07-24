const express = require('express'); //importando

const OngController = require('./controllers/OngController'); //importando

const IncidentController = require('./controllers/IncidentController'); //importando

const ProfileController = require('./controllers/ProfileController'); //importando

const SessionController = require('./controllers/SessionController');


const routes = express.Router(); //desacoplando o modulo de rotas do express em uma nova variavel

routes.post('/sessions', SessionController.create); //criando uma sessão(login)


routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); //criando a primeira rota e passando uma função como segundo parametro

routes.get('/profile', ProfileController.index);
   
routes.get('/incidents', IncidentController.index);    
routes.post('/incidents', IncidentController.create); 
routes.delete('/incidents/:id', IncidentController.delete) //rota para deletar um caso de incidents


module.exports = routes; //exportando as rotas