const mongoose = require('mongoose');
const { Schema } = mongoose;

const diarySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    entry: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Diary = mongoose.model('Diary', diarySchema);
  
module.exports = Diary;