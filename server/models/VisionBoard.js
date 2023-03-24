const mongoose = require('mongoose');
const { Schema } = mongoose;

const visionBoardSchema = new Schema({
    imageLink: {
      type: String,
      required: true,
      trim: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
  
const VisionBoard = mongoose.model('VisionBoard', visionBoardSchema);
  
module.exports = VisionBoard;