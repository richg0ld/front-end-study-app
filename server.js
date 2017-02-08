const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //add
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// S: CORS Solution
const originsWhitelist = [
  'http://localhost:4200',
  'http://localhost:4200/students',
  'http://localhost:4200/dashboard',
  'http://localhost:4200/detail/:id'
];
const corsOptions = {
  origin: (origin, callback)=>{
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
};
app.use(cors(corsOptions));
// E: CORS Solution

// let result = [];
let idNum = 0;
let rank = 1;
let result = [
  {id: 44, name: '코마', complete: 0},
  {id: 55, name: '욱', complete: 0},
  {id: 66, name: 'CHRIS', complete: 0},
  {id: 77, name: '유리', complete: 1},
  {id: 88, name: '이예지', complete: 0},
  {id: 99, name: '김태균', complete: 2},
  {id: 56, name: '박진영', complete: 0},
  {id: 34, name: '홍길동', complete: 0},
  {id: 19, name: '김의중', complete: 1},
  {id: 67, name: 'ㅋㅋㅋ', complete: 0}
];

app.get('/api/data', (req, res) => res.send(result));
app.get('/api/data/:id', (req, res) =>  res.send(result.find( obj => Number(obj.id) === Number(req.params.id))));
// app.post('/api/data', (req, res)=> result.push(req.body.name));
app.post('/api/data', (req, res)=> {
  let newStudent = {
    id: idNum++,
    name: req.body.name,
    complete: 0
  };
  result.push(newStudent);
  res.send(newStudent);
});
app.put('/api/data/:id', (req, res)=> {
  result.forEach((v, i)=>{
    if( Number(v.id) === Number(req.body.id) ){
      result[i].name = req.body.name;
      if( (result[i].complete === 0 || result[i].complete === 1) && Number(req.body.complete) === 2 ){
        result[i].rank = rank++;
      }
      result[i].complete = Number(req.body.complete);
      console.log(result);
    }
  });
  res.send('ok');
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));

