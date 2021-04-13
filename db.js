const mongoose = require('mongoose');

try {
  mongoose.connect(`mongodb+srv://SamuelB:dp3DMGEj3NHq@cluster0.alseu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex: true,
  })
  console.log('connected to mongodb');
} catch (error) {
  console.log(`could not connect to the database error ${error}`);
}