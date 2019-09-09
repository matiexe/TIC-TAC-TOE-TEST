const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
    id:{
        type:String
    },
    tablero:{
        type:Object
    },
    players:{
        type:Object
    },
    winner:{
        type: {
            msg:String,
            check: Boolean
        }
    }
})

module.exports = mongoose.model('Juego',gameSchema);
