
const mongoose = require('mongoose');

const guitarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
}, 

{
    timestamps: true,
}

);

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;