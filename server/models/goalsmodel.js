const { Schema, model } = require('mongoose');

const goalsSchema = new Schema ({
    goal : {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
});

const Goal = model('Goal', goalsSchema);

module.exports = Goal;