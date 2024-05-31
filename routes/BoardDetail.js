/*eslint-disable */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components'; 
import Nav from 'react-bootstrap/Nav';
//보관함 import
import {Context1} from './../App.js';
import { useDispatch } from "react-redux";
import {addCartList} from '../store.js';

let YellowBtn = styled.button`
    background : ${ props => props.color };
    color:${ props => props.color =='blue' ? 'white' :'black' };
    padding : 10px;
`

let Box = styled.div`
    background : grey;
    padding : 20px;
`

function BoardDetail(props){
    //부모 보관함 가져오기 - 보관함해체
    let { 재고 } = useContext(Context1);
    let [fade2, setFade2] = useState('');
    let [alert,setAlert] = useState(false);
    let [state,setState] =useState(true);
    let [count,setCount] = useState(0);
    let {id} = useParams(); //url파라미터 받아옴 /:id
    let [tab,setTab] = useState(0);
    let 찾은상품 = props.shoes.find(x => x.id ==id)
    //페이지 이동 도와주는 함수
    let navigate = useNavigate();
    //store 도와주는 함수
    let dispatch = useDispatch()
    //useEffect 쓰는이유 
    //mount,update시 코드 실행해줌 --> html 렌더링 끝난후에 실행 
    //어려운연산 or 서버에서 데이터가져오는 작업/ 타이머 장착하는거

    //누가 페이지에 접속하면 그페이지에 보이는 id가져와서 로컬스토리지에 watched항목추가
    useEffect(()=>{
        //로컬스토리지 다시 가져오기
        let watched = JSON.parse(localStorage.getItem('watched'));
        //추가로 넣고
        watched.push(찾은상품.id)
        //중복제거
        watched = Array.from(new Set(watched))
        //넣은 watched 다시 localStorege에 생성 
        localStorage.setItem('watched',JSON.stringify(watched))

        setTimeout(()=>{ setState(false) },2000);
        setTimeout(()=>{   setFade2('end') },100);
        return()=>{
            setFade2('');
        }
    }, []); //1회만 실행 시키고 싶을때 []
    
    //useEffect 동작전에 실행댐 retrun
    // useEffect(()=>{
    //     let a = setTimeout(()=>{ setState(false) },2000);
    //     return()=>{
    //         //기존 데이터 요청 제거
    //         clearTimeout(a);
    //     }
    // }, );

    //숫자만 입력 체크
    const isNotNumber = (e) => {
        if(isNaN(e) === true){
            setAlert(true);
         }else{
            setAlert(false);
         }
    }

    return(
        <>
        <div className={'container start ' +fade2} >
            {
                state === true?  <div className="alert alert-warning" >2초이내 구매시 할인</div> :''
            }
            <Box>
            {재고}
            {count}
            <YellowBtn onClick={()=> {setCount(count+1)}} color="blue">버튼</YellowBtn>
            <YellowBtn color="pink">버튼</YellowBtn>
            </Box>
        <div className="row">
            <div className="col-md-6" >
            <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" />
            </div>
            <div className="col-md-6 ">
            <div className="mb-3">
            <input  onChange={(e)=> isNotNumber(e.target.value)}  type="number" className="form-control" id="exampleFormControlInput1" placeholder="숫자를 입력해주세요" />
            {
                alert === true? <div >경고 : 숫자만 입력하세요</div> :''
            }
            </div>
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <p>{props.shoes[id].content}</p>
            <p>{props.shoes[id].price}</p>
            <button onClick={()=>{
                dispatch(addCartList(props.shoes[id]))
                navigate('/cart')
                }} className="btn btn-danger">주문하기</button> 
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}}  eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2" >버튼2</Nav.Link>
            </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={props.shoes}></TabContent>
        </div>
        </div> 
        </>
    )
}

function TabContent({tab ,shoes}){
    let [fade,setFade] = useState('');
    let { 재고 } = useContext(Context1);

    //삭제했다가 end넣어줌
    useEffect(()=>{
        setTimeout(()=>{setFade('end');},100) //2빠
        return()=>{
            setFade(''); //1빠
        }
    },[tab]); //tab이 들어오면 변경됨 //
// return <div className={'start'+ fade }>
   return <div className={`start ${fade}`}>
            {[<div>{shoes[0].title} {재고}</div>,<div>내용1</div>,<div>내용2</div>][tab]}
          </div>
    // if(tab === 0){
    //     return(
    //         <div>내용0</div>
    //     )
    // }
    // if(tab === 1){
    //     return(
    //         <div>내용1</div>
    //     )
    // }
    // if(tab === 2){
    //     return(
    //         <div>내용2</div>
    //     )
    // }

}
export default BoardDetail;