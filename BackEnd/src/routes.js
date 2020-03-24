const express = require('express');
const routes = express.Router();

const ongControllers = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profilController = require('./controllers/profilController');
const sessionController = require('./controllers/sessionController');

routes.get('/ongs', ongControllers.index);
routes.post('/ongs', ongControllers.store);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.store);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profil', profilController.index);

routes.post('/session', sessionController.store);



module.exports = routes;