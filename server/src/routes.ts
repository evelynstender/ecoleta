import express from 'express';
import collectionPointsController from './controllers/collectionPointsController'
import itemsController from './controllers/itemsController'

const routes = express.Router()

// Items routes
routes.get('/items', itemsController.index)


// Collection point routes
routes.get('/points/:id', collectionPointsController.show)
routes.get('/points', collectionPointsController.index)
routes.post('/collection-point', collectionPointsController.create)

export default routes;