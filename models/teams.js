const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndpointTeamsSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  api:{
    type:Object,
    required:true
  }
}, {collection: 'teams'})

module.exports = mongoose.model('teams', EndpointTeamsSchema);