// name, phone, sum_of_all_ratings , total_number_of_ratings

const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    reviewSum : {
        type : Number,
        required : true
    },
    reviewCount : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("Object", objectSchema);