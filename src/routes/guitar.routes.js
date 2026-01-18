const express = require('express');
// traer controladores
const { getAllGuitars, getGuitarById, createGuitar, updateGuitar, deleteGuitar } = require('../controllers/guitar.controller'); 
const guitarRouter = express.Router();

guitarRouter.get('/', getAllGuitars ) //localhost:3000/guitars
guitarRouter.get('/:id', getGuitarById ) // localhost:3000/guitars/:id
guitarRouter.post('/', createGuitar ) // localhost:3000/guitars
guitarRouter.put('/:id', updateGuitar ) 
guitarRouter.delete('/:id', deleteGuitar ) 

module.exports = guitarRouter;

