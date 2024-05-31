import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
//redux 모든 컴포넌트에서 사용가능 
//props 사용x
//useSatae역할
//1state 생성
//모든걸 넣지말자 
// let user = createSlice({
//     name:'user',
//     initialState : { name :'kim' , age:20},
//     //state 수정하는법 1 
//     reducers:{
//         changeName(state){
//             state.name = 'pppak'
//         },
//         // changeAge(state){
//         //     state.age += 1
//         // },
//         changeAge(state ,action){ //파마리터 넣을수 있음 
//             state.age += action.payload
//         }
//     }
// })
///state 수정하는법  2 오른쪽 자료를 변수로뻄  exprot
// --> state 수정하는법  3 사용하고싶은곳에 import하고 dispatch(state변경함수())
// export let {changeName , changeAge } =user.actions
let stock = createSlice({
    name:'stock',
    initialState : [10,11,12]
})
//최근본상품 
//최근본 상품을 로컬스토리지에서 가져온다
//그다음 메인 페이지에 노출시킴
//로컬스토리지에 담겨잇는 id와 같은 상품의 내용 출력 

let cartList = createSlice({
    name:'cartList',
    initialState : [
                    {id : 0, name : 'White and Black', count : 2},
                    {id : 2, name : 'Grey Yordan', count : 1}
                   ],
    reducers:{
        //수량 증가 
        increase(state , action){
            //복사해서 봐야 console에 찍힘 
            //const plainState = state.map(item => ({ ...item })); 
            // console.log(plainState);
            let item = state.find(item => item.id === action.payload);
            if (item) {
                item.count += 1;
            }
        },
        //수량감소
        decrease(state,action){
            let item = state.find(item => item.id === action.payload);
            if (item) {
                item.count -= 1;
            }
        },
        //장바구니 상품 추가
        addCartList(state,action){
            const newItem = action.payload
            let item = state.find(item => item.id === newItem.id);
            if (item) {
                item.count += 1;
            }else{
                state.push({
                    id : newItem.id,
                    name : newItem.title,
                    count : 1,
                })
            }
        },
        //장바구니 상품 삭제 
        delCartList(state,action){
            //내 id의 인덱스 찾기 
            let idIdx = state.findIndex((a)=>{ return a.id === action.payload })
            state.splice(idIdx,1)
        }
    }
})
export let { increase,decrease ,addCartList,delCartList} = cartList.actions

export default configureStore({
    //2변수 등록해야함
    reducer: { 
        user    : user.reducer,
        stock   : stock.reducer,
        cartList: cartList.reducer,
  }
})