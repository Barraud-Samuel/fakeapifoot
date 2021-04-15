var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/checkAuth')

const Schema = mongoose.Schema;
const EndpointGamesSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  api:{
    type:Object,
    required:true
  }
}, {collection: 'games'})
const EndpointTeamsSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  api:{
    type:Object,
    required:true
  }
}, {collection: 'teams'})
var EndpointGames = mongoose.model('games', EndpointGamesSchema);
var EndpointTeams = mongoose.model('teams', EndpointTeamsSchema);



router.get('/',requireAuth, (req, res, next) => {
  EndpointGames.findOne((err,data)=>{
  let strigifiedData = JSON.stringify(data,null,4)
  res.render('index',{dataStringified: JSON.stringify(data,null,4),data:JSON.parse(strigifiedData)});
})
  //const rawDataGames = fs.readFileSync(path.resolve(__dirname,'../data/games.json'));
  //const games = JSON.parse(rawDataGames);
  //res.render('index',{dataStringified: JSON.stringify(games,null,4),data:games});
});

router.post('/updateGames',requireAuth,async (req,res,next)=>{
  //const updatedDataStringed = JSON.stringify(req.body.apiData,null,4)
  //const updatedData = req.body.apiData
  //fs.writeFileSync(path.resolve(__dirname,'../data/games.json'),updatedData)
  const id = JSON.parse(req.body.apiData)._id;
  let doc = await EndpointGames.findById(id);
  doc.api = JSON.parse(req.body.apiData).api 
  await doc.save()
  res.redirect('/')
})

router.get('/api/games',async (req,res,next)=>{
  const doc = await EndpointGames.findOne(); 
  res.send(doc)
})

router.get('/api/teams', async(req,res,next)=>{
  /* const rawDataTeams = fs.readFileSync(path.resolve(__dirname,'../data/teams.json'));
  const teams = JSON.parse(rawDataTeams) */
  const doc = await EndpointTeams.findOne();
  res.send(doc)
})

module.exports = router;
