const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const RoomSchema = new Schema({  
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Room', RoomSchema);  
