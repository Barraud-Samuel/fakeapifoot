var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const requireAuth = require('../middleware/checkAuth')
const EndpointGames = require('../models/games');
const EndpointTeams = require('../models/teams');


router.get('/',requireAuth, (req, res, next) => {
  EndpointGames.findOne((err,data)=>{
  let strigifiedData = JSON.stringify(data,null,4)
  const fixtures = JSON.parse(strigifiedData).api.fixtures.reverse()
  res.render('index',{dataStringified: JSON.stringify(data,null,4),fixtures:fixtures});
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
