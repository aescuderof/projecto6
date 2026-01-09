const express = require('express');
// traer controladores
const { getAllGuitars, createGuitar, updateGuitar, deleteGuitar } = require('../controllers/guitar.controller'); 
const guitarRouter = express.Router();

guitarRouter.get('/', getAllGuitars ) //localhost:3000/guitars
guitarRouter.post('/', createGuitar ) // localhost:3000/guitars
guitarRouter.put('/:id', updateGuitar ) // localhost:3000/guitars/:id
guitarRouter.delete('/:id', deleteGuitar ) // localhost:3000/guitars/:id

module.exports = guitarRouter;

