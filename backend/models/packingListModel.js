const mongoose = require('mongoose')

const packingListSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        creationDate: {
            type: Date,
            default: Date.now
        },
        listname: {
            type: String,
            required: [true, 'Please add a name for the list'],
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('PackingList', packingListSchema)