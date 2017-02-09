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
  'http://localhost:4200/detail/:id',
  'http://localhost:4200/join',
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

// let students = [];
let idNum = 1;
let rank = 1;
let teacher = {name:'', ip:''};
let students = [
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

app.get('/api/data', (req, res) => res.send(students));

app.get('/api/data/:id', (req, res) => res.send(req.params.id === 'admin'?  teacher : students.find( obj => Number(obj.id) === Number(req.params.id))));

app.post('/api/data', (req, res)=> {
  let newData = req.body.name === 'admin' ? {
      name: req.body.name,
      ip: req.body.ip
    } : {
      id: idNum++,
      name: req.body.name,
      complete: 0,
      ip: req.body.ip
    };
  newData.id ? students.push(newData) : teacher = newData;
  res.send(newData);
});

app.put('/api/data/:id', (req, res)=> {
  students.forEach((v, i)=>{
    if( Number(v.id) === Number(req.body.id) ){
      students[i].name = req.body.name;
      if( (students[i].complete === 0 || students[i].complete === 1) && Number(req.body.complete) === 2 ){
        students[i].rank = rank++;
      }
      students[i].complete = Number(req.body.complete);
    }
  });
  res.send('ok');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

