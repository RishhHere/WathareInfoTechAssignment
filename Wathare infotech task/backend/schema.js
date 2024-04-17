const mongoose = require('mongoose');

const sample_dataSchema = new mongoose.Schema({

    ts:{
        type:String,
    },
    machine_status:{
        type:Number
    },
    vibration:{
        type:String
    }
}
)

module.exports = new mongoose.model('sample_data1',sample_dataSchema)