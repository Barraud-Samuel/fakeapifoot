var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');




router.get('/', (req, res, next) => {
  const rawdataGames = fs.readFileSync(path.resolve(__dirname,'../data/games.json'));
  const games = JSON.parse(rawdataGames);
  res.render('index',{dataStringified: JSON.stringify(games,null,4),data:games});
});

router.post('/updateGames',(req,res,necxt)=>{
  const updatedDataStringed = JSON.stringify(req.body.apiData,null,4)
  const updatedData = req.body.apiData
  fs.writeFileSync(path.resolve(__dirname,'../data/games.json'),updatedData)
  res.redirect('/')
})

router.get('/api/games',(req,res,next)=>{
  const rawdataGames = fs.readFileSync(path.resolve(__dirname,'../data/games.json'));
  const games = JSON.parse(rawdataGames);
  res.send(games)
})

module.exports = router;
