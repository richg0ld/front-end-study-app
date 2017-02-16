const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const ROUTES = ['', '/students', '/dashboard', '/detail/:id', '/join'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
ROUTES.forEach(route=> app.use(route, express.static(path.join(__dirname, 'dist'))) );

// S: CORS Solution for dev (테스트 코드가 서버에 접속 할 수 있도록 허용해주는 코드)
const DOMAIN = 'http://127.0.0.1:4200';
const originsWhitelist = ROUTES.map(route=> DOMAIN + route);
console.log(originsWhitelist);

const corsOptions = {
  origin: (origin, callback)=>{
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
};
app.use(cors(corsOptions));
// E: CORS Solution for dev

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

app.get('/api/data/:id', (req, res) => res.send(req.params.id === 'admin'?  teacher : students.find( obj => +obj.id === +req.params.id)));

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

app.delete('/api/data/:id', (req, res) => {
  students.forEach( (student, i) => +student.id === +req.params.id && students.splice(i,1) );
  res.send(students);
});

app.put('/api/data/:id', (req, res)=> {
  students.forEach((student, i)=>{
    if( +student.id === +req.body.id ){
      students[i].name = req.body.name;
      if( (students[i].complete === 0 || students[i].complete === 1) && +req.body.complete === 2 ){
        students[i].rank = rank++;
      }
      students[i].complete = Number(req.body.complete);
    }
  });
  res.send('ok');
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));

io.on('connection', socket => {
  // *****TIP*******
  // socket.emit : 보낸온 당사자한테만 / socket.broadcast.emit : 나를 제외한 나머지 / io.emit : 모두에게
  console.log('a user connected');
  socket.on('join study', name => socket.broadcast.emit('join study', name));
  socket.on('update studentStatus', () => io.emit('update studentStatus'));
  socket.on('disconnect', () => console.log('user disconnected'));
});
