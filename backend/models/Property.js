const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 8,
    },
    type: {
        type: String,
        enum: ["beach", "mountain", "village"],
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 20,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sqmeters: {
        type: Number,
        required: true,
    },
    province:{
        type: String,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
        min: 1,
    },
    featured: {
        type: Boolean,
        default: false 
    }
}, {timestamps: true})

module.exports = mongoose.model("property", PropertySchema)