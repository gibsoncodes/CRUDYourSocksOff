const mongoose = require('../db/connection')


const SockSchema = new mongoose.Schema(
    {
        sockColors: {
            type: [String],
            required: true
        },
        stripeColors: {
            type: [String],
        },
        gridRows: String,
        gridCols: String,
    },
    { timestamps: true}
)

const Sock = mongoose.model('Sock', SockSchema)

module.exports = Sock