const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.use(express.static(path.join(__dirname, '리액트장인/shop/build')));
//처음접속시 보여주는 화면
app.get('/', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/리액트장인/shop/build/index.html'));
});
//db데이터 리액트에서 보여주는법

//1db데이터 뽑아서 보내주는 api작성 2리액트는 여기로 get요청
app.get('/cart', function (요청, 응답) {
    응답.json({name:'black shoes'})
  });




//"고객이 URL란에 아무거나 입력하면 걍 리액트 프로젝트나 보내주셈"
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/리액트장인/shop/build/index.html'));
  });