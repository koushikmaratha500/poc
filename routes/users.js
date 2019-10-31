var express = require('express');
var router = express.Router();
const fs = require('fs')
const http = require('http')
const db = require('../config/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all',function(req,res,next) {
  db.query('Select * from video',function (err,result) {
      if(err){
        res.send(err);
      }else{
        http.createServer(function (req,res) {
  res.writeHead(200,{'content-type':'video.mp4'});
  let rs = fs.createReadStream("result.videoUrl")
  rs.pipe(res);
})
        res.send(result);
      }
  });
});
router.get('/id',function (req,res,next) {
    db.query('Select * from video WHERE id = ?',[req.body.id],function (err,result) {
        if(err)
        res.send(err);
      res.send(result);     
    });
});
router.get('/title',function (req,res,next) {
    db.query('Select * from video WHERE title = ?',[req.body.title],function (err,result) {
        if(err)
        res.send(err);
      res.send(result);
    });
});
// http.createServer(function (req,res) {
//   res.writeHead(200,{'content-type':'video/mp4'});
//   let rs = fs.createReadStream("file.mp4")
//   rs.pipe(res);
// }).listen(4000);

module.exports = router;
