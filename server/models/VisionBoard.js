const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const visionBoardSchema = new Schema({
  imageID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
    imageLink: {
      type: String,
      required: true,
      trim: true
    }
});
  
const VisionBoard = mongoose.model('VisionBoard', visionBoardSchema);
  
module.exports = VisionBoard;