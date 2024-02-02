const mongoose = require('mongoose');
const { Schema } = mongoose;

const ebookRequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const EbookRequest = mongoose.model('EbookRequest', ebookRequestSchema);

module.exports = {
    EbookRequest
}