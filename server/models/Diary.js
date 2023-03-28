const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const diarySchema = new Schema({
    entryID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
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