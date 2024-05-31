/*eslint-disable */
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import bg from './img/bg.png';
import { createContext, lazy,Suspense , useEffect, useState } from 'react';
import data from './data.js';
import axios from 'axios';
//라우터 설정 
import {Routes, Route, Link , useNavigate , Outlet, json } from 'react-router-dom';

//필요할떄 import해주세요~~
const BoardDetail = lazy(()=> import('./routes/BoardDetail.js'));
const Cart        = lazy(()=> import('./routes/Cart.js'));
import { compose } from '@reduxjs/toolkit';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useQuery } from 'react-query';
//state 보관함 props 많을때 사용 
export let Context1 = createContext();
//state변경시 쓸데없는 것까지 재렌더링 ,컴포넌트 재사용 어려움

function App() {

  //let obj ={name:'kim'}
  //array/object 는 JSON으로 변경해서 해야함  
  //array/object ->json 변환 
  // localStorage.setItem('data', JSON.stringify(obj));
  // let a = localStorage.getItem('data')
  //다시 JSON => array/object 변환 
  // console.log(JSON.parse(a))

  useEffect(()=>{
      const watched = localStorage.getItem('watched');
      if(watched === null){
        localStorage.setItem('watched',JSON.stringify([]))
      }
  },[])

  let [count,setCount] = useState(0);
  let [shoes,setShoes] = useState(data);
  let [load, setLoad] = useState(false);
  let [재고] = useState([10,11,12]);

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )

  
 
  //result.data //성공시
  //result.isLoading //로딩중일때
  //result.error //에러시

  //훅 페이지 이동 도와주는 함수
  let navigate = useNavigate();
   
  //더보기
  function moredata(){
    setLoad(true);
    setCount(count+1);
    axios.get('https://codingapple1.github.io/shop/data2.json')
    .then((res)=>{
      let copy =[...shoes,...res.data];
      setShoes(copy);
      setLoad(false);
    })
  }
  //여러개 한번에 전송
  // Promise.all([axios.get('/url'), axios.get('/url')])
  // .then(()=>){
  // }
  //데이터 전송
  //axios.post('/url',{name:'kim'})

  return (
    <div className="App">
        <Navbar bg="dark" data-bs-theme="dark" className='nav'>
        <Container>
          <Navbar.Brand href="#home">KongShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }} >Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }} >Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }} >장바구니</Nav.Link>
          </Nav>
          <Nav className="me-auto">
          <Nav.Link >
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <Link to='/'>홈</Link> 
      <Suspense fallback={<div>로딩중임</div>}>
     <Routes>
        <Route path='/' element={
        <div >
        <div className='main-bg' style={{backgroundImage :'url('+bg+')'}}></div>
         <div className='container'>
          <div className='row'>
            {/* 글목록 */}
            {
              shoes.map(function(a,i){
                return(
                  <Info shoes={shoes[i]} i={i+1}  key={i} ></Info>
                )
              })
            }
           </div>
           {
            load === true ?
             <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
            </div> :''
           }
           {  
            count < 2 ?
             <button className="btn btn-info" onClick={moredata}>더보기</button> :'더보기 상품이 없습니다.'
           }
          </div>
        </div>}/>
        <Route path='/detail/:id' element={
         <Context1.Provider value={{재고}}>
    
            <BoardDetail shoes={shoes}/>
         
          </Context1.Provider>
        }/>
        {/* 장바구니 */}
        <Route path='/cart' element={<div><Cart/></div>}></Route>

       {/* 오타포함 모든 경로  */}
        <Route path='/*' element={<div> 없는 페이지~~~</div>}/>
       {/* 여러 유사한 여러 페이지 필요할때  nested routes*/}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>}/>  {/*어디볼지 정할려면 <Outlet>*/}
          <Route path='location' element={<div>위치정보임</div>}/> {/* /about/location */}
        </Route>

        {/* 이벤트페이지 */}
        <Route path='/event' element={<Event/>}>
            <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path='two' element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>

      </Routes>
      </Suspense>
    
      {/* 이미지 넣는법 3가지 */}
      {/*
         <img src="/logo192.png" width="80%" />
         <img src={process.env.PUBLIC_URL +'/logo192.png'} width="80%" />
         <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" />
      */}

    </div>
  );
}
function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
//목록
function Info (props){
  return(
      <div className="col-md-4" >
        <Link  to={'/detail/'+props.shoes.id +''} >
        <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
        <p>{props.shoes.price}</p>
        </Link>
      </div>
  )
}


export default App;
