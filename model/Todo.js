const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    createdUser:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports =Todo = mongoose.model("Todos", TodoSchema);
