require('dotenv').config();

const express = require('express');
const bcriptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('./src/config/db');
const cors = require('cors');

const auth = require('./src/middleware/authorization');
const guitarRouter = require('./src/routes/guitar.routes');

const Guitar = require('./src/models/Guitar');
const User = require('./src/models/User');
const Cart = require('./src/models/Cart');
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

const whitelist = [
    'http://localhost:3000', 
    'http://localhost:5173',
    'http://181.43.121.8:5173',
    'http://181.43.121.8:3000',
  
    
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (whitelist.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('No permitido por CORS'), false);
    }
},
methods: ['GET', 'POST', 'PUT', 'DELETE'],
credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/guitars', guitarRouter);

app.get('/', (req, res) => {
    return res.status(200).json({ ok: true });
});
 




app.post('/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });

        if (foundUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcriptjs.genSalt(10);
        const hashedPassword = await bcriptjs.hash(password, salt);

        const newCart = await Cart.create({ products: [] });

        const newUser = await User.create({ username, email, password: hashedPassword, cart: newCart._id });

        if (!newUser) return res.status(400).json({ error: 'no fue posible crear el usuario' });

        const payload = { user: { id: newUser._id } };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });

        const populated = await User.findById(newUser._id).populate('cart').lean();
        if (populated && populated.password) delete populated.password;

        return res.status(201).json({ datos: populated, token });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error creando usuario',
            error: error.message,
        });
    }
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcriptjs.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = { user: { id: foundUser._id } };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
        const { password: _, ...userData } = foundUser.toObject();

        return res.status(200).json({ datos: userData, token });
    } catch (error) {
        return res.status(500).json({
            message: 'Error autenticando usuario',
            error: error.message,
        });
    }
});

app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const correctPassword = await bcriptjs.compare(password, foundUser.password);
        if (!correctPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            id: foundUser.id,
            
        };
        
        jwt.sign(
                payload,
                secret = process.env.SECRET,
                { expiresIn: '24h' },
                (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                }
            ); 
    
        } catch (error) {
            return res.status(500).json({
                message: 'Error al iniciar sesión',
                error: error.message,
            });
        }
    });

app.get('/user/verify-user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error verificando usuario',
            error: error.message,
        });
    }
});    




app.put('/users/update', auth, async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcriptjs.genSalt(10);
        const hashedPassword = await bcriptjs.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {username, email, password: hashedPassword},
        {new: true, runValidators: true}
    )

    if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json({ usuarioActualizado: updatedUser });
    } catch (error) {
        return res.status(500).json({
            message: 'Error actualizando usuario',
            error: error.message,
        });
    }
});



app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});