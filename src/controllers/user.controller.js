const User = require('../models/User');
const Cart = require('../models/Cart');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newCart = await Cart.create({ products: [] });S

        const newUser = await User.create({ 
            username,
             email,
             password: hashedPassword,
             cart: newCart
            });
            
            if (!newUser) return res.status(400).json({ error: 'No fue posible crear el usuario' });
            return res.status(201).json({ datos: newUser });
            } catch (error) {
            return res.status(500).json({
                message: 'Error creando usuario',
                error: error.message,
        })
    }
};

    exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const correctPassword = await bcryptjs.compare(password, foundUser.password);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        return res.status(200).json({ datos: foundUser });
        } catch (error) {
        return res.status(500).json({
            message: 'Error autenticando usuario',
            error: error.message,
        });
        }
    }