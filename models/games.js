const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndpointGamesSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  api:{
    type:Object,
    required:true
  }
}, {collection: 'games'})

module.exports = mongoose.model('games', EndpointGamesSchema);