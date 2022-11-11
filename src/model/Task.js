const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    task: {
        type: Number,
        default: 1,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    description: {
        type: String,
        // required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    priority: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    done: {
        type: Boolean,
        default: true,
    },    
},
{timestamps: true}
);

const taskModel = model("tasks", taskSchema)

module.exports = taskModel;