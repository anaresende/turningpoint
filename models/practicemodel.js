const { Schema, model } = require('mongoose');

const practiceSchema = new Schema ({
    practice : {
        type: String,
        required: true
    },
    duration : {
        type: Number,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    notes : {
        type: String,
    },
    mediaUrl: String,
});

const practice = model('Practice', practiceSchema);

module.exports = Practice;