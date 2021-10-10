const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    notesID: {
        type: Number,
        unique: true,
        required: [true, 'Required field'],
    },
    name: {
        type: String,
        required: [true, 'Required field'],
    },
    data: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
});

const notesModel = mongoose.model("notes", notesSchema);
module.exports = notesModel;