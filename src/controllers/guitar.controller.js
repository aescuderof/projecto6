const mongoose = require('mongoose');
const Guitar = require('../models/Guitar');
// traer modelo de Guitar
exports.getAllGuitars = async (req, res) => {
    try {
        const guitars = await Guitar.find({});
        return res.status(200).json({ guitars });
    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving guitars',
            error: error.message,
        });
    }
};

// obtener una guitarra por id
exports.getGuitarById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Formato de id inválido' });
        }
        const guitar = await Guitar.findById(id);
        if (!guitar) {
            return res.status(404).json({ error: 'Guitarra no encontrada' });
        }
        return res.status(200).json({ guitar });
    } catch (error) {
        return res.status(500).json({
            message: 'Error buscando guitarra por ID',
            error: error.message,
        });
    }
};

// completar los controladores para las rutas POST, PUT y DELETE
exports.createGuitar = async (req, res) => {
     try {
        const { name, price, description } = req.body;
        const newGuitar = await Guitar.create({ name, price, description });
        
        if (!newGuitar) return res.status(400).json({ error: 'no fue posible crear la guitarra' });
        
        return res.status(201).json( {datos: newGuitar });

    } catch (error) {
        return res.status(500).json({
            message: 'Error creating guitar',
            error: error.message,
        });
    }
};

// completar los controladores para las rutas POST, PUT y DELETE
exports.updateGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Formato de id inválido' });
        }
        const { name, price, description } = req.body;
        const updatedGuitar = await Guitar.findByIdAndUpdate(
            id,
            { name, price, description },
            { new: true, runValidators: true }
        );
        if (!updatedGuitar) {
            return res.status(404).json({ error: 'Guitar not found' });
        }
        return res.status(200).json({ guitarraActulizada: updatedGuitar });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating guitar',
            error: error.message,
        });
    }
};

// borrar guitarra
exports.deleteGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Formato de id inválido' });
        }
        const deletedGuitar = await Guitar.findByIdAndDelete(id);
        if (!deletedGuitar) {
            return res.status(404).json({ error: 'Guitar not found' });
        }
        return res.status(200).json({ message: 'Guitar deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting guitar',
            error: error.message,
        });
    }
};

// completar los controladores para las rutas POST, PUT y DELETE
exports.deleteGuitar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Formato de id inválido' });
        }
        const deletedGuitar = await Guitar.findByIdAndDelete(id);
        if (!deletedGuitar) {
            return res.status(404).json({ error: 'Guitar not found' });
        }
        return res.status(200).json({ message: 'Guitar deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting guitar',
            error: error.message,
        });
    }   

};
