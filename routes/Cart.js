
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeAge  } from './../store/userSlice.js';
import { increase ,decrease ,delCartList } from '../store.js';
import {memo } from "react"; //꼭 필요할때 재 렌더링

//memo -> 재렌더링 막아줌 --꼭필요한부분만 ~~ 대부분 잘안씀
//props가 변할때만 재렌더링해줌
let Child =memo( function(){
    console.log("gg")
    return <div>자식임</div>
})

function Cart(){
    //Redux store 가져와줌 
    let state = useSelector((state)=> state.user )
    let cartList = useSelector((state) => state.cartList)
    //store.js에게 요청
    let dispatch = useDispatch()
    return(
        <div>
             <Child></Child>
            {state.name} {state.age}의 장바구니
            <button onClick={()=>{dispatch(changeAge(10))}}>버튼</button>
           <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartList.map(function(a,i){
                            return(
                                <tr key={i}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td> 
                                                            {/* state수정  */}
                                    <button onClick={()=>dispatch(increase(a.id))} className="btn btn-warning"> + </button>
                                    {
                                        a.count === 0 ? <button className="btn btn-warning" disabled onClick={()=>dispatch(decrease(a.id))} > - </button>  :<button  className="btn btn-warning" onClick={()=>dispatch(decrease(a.id))}> - </button> 
                                    }
                                     <button  onClick={()=>dispatch(delCartList(a.id))} type="button" className="btn btn-danger">x</button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>  
        </div>
    )
}
export default Cart;