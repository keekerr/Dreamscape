const mongoose = require('mongoose');
const { Schema } = mongoose;

const visionBoardSchema = new Schema({
    imageLink: {
      type: String,
      required: true,
      trim: true
    }
});
  
const VisionBoard = mongoose.model('VisionBoard', visionBoardSchema);
  
module.exports = VisionBoard;