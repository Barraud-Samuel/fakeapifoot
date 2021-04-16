const mongoose = require('mongoose');
console.log(process.env.MONGO_ATLAS_PW);
try {
  mongoose.connect(`mongodb+srv://SamuelB:${process.env.MONGO_ATLAS_PW}@cluster0.alseu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true,
  })
  console.log('connected to mongodb');
} catch (error) {
  console.log(`could not connect to the database error ${error}`);
}