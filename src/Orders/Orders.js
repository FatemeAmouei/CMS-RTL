import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Errorbox from '../Errorbox/Errorbox'
import Deletemodal from "../Deletemodal/Deletemodal";
import { ThemeContext  } from '../Context/ThemeContext';
import './Orders.css'

export default function Orders() {
  const [allOrders ,setAllOrders] = useState([])
  const [IsDeletemodal ,setDeletemodal] = useState(false)
  const [IsAcceptmodal ,setAcceptmodal] = useState(false)
  const [IsRejectmodal ,setRejectmodal] = useState(false)
  const [OrderID ,setOrderID] = useState('')
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    getAllOrders()
  },[])

  const getAllOrders = ()=>{
    fetch('http://localhost:8000/api/orders/')
    .then(res => res.json())
    .then(order =>{
      console.log(order)
      setAllOrders(order)
    })
  }

  const CloseDeletModal = ()=>setDeletemodal(false)  
  const closeAcceptModal = ()=> setAcceptmodal(false)
  const closeRejectModal = ()=>setRejectmodal(false)

  const deleteOrder =()=>{
    fetch(`http://localhost:8000/api/orders/${OrderID}`,{
      method:'DELETE'
  }).then(res => res.json())
    .then(datas => {
      console.log(datas)
      CloseDeletModal()
      getAllOrders(datas)
    })
  }

  const AcceptOrderHandler = ()=>{
    const isActive = 1;

    fetch(`http://localhost:8000/api/orders/active-order/${OrderID}/${isActive}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(result => {
      closeAcceptModal()
      getAllOrders()

  })}

    const RejectOrderHandler = () =>{
      const isActive = 0;

      fetch(`http://localhost:8000/api/orders/active-order/${OrderID}/${isActive}`, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(result => {
          closeRejectModal()
          getAllOrders()
  })}

    return (
      <div className={`orders ${theme}`}>
        <h1 className="order-title">لیست سفارشات</h1>
        {allOrders.length === 0 ? (
        <Errorbox/>
        ) : ( 
        <div className={`order-container ${theme}`}>
          <div className={`order-table ${theme}`}>
            <table className='table'>
              <thead>
                <tr>
                  <th>شماره</th>
                  <th>نام مشتری</th>
                  <th>نام محصول</th>
                  <th>قیمت</th>
                  <th>تعداد</th>
                  <th>ساعت</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  allOrders.map((order,index) =>(
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.userID}</td>
                      <td>{order.productID}</td>
                      <td>{order.price.toLocaleString()} تومان</td>
                      <td>{order.count}</td>
                      <td>{order.hour}</td>
                      <td className='order-table__btns'> 
                        <Button variant="outline-primary" className={`order-table__btn ${theme}`}
                          onClick={()=>{
                            setDeletemodal(true)
                            setOrderID(order.id)
                        }}>حذف</Button>

                        {
                          order.isActive === 0 ? (
                            <Button variant="outline-primary" className={`order-table__btn ${theme}`} 
                              onClick={()=>{
                                setAcceptmodal(true)
                                setOrderID(order.id);
                            }} >تائید </Button>
                          ) :
                          (
                            <Button variant="outline-danger" className={`order-table__btn ${theme}`} 
                              onClick={()=>{
                                setRejectmodal(true)
                                setOrderID(order.id);
                            }} >رد </Button>
                          )
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
          {IsDeletemodal && <Deletemodal onHide={CloseDeletModal} cancelAction={CloseDeletModal} title="آیا از حذف اطمینان دارید؟" submitAction={deleteOrder}/>}
          {IsAcceptmodal && <Deletemodal onHide={closeAcceptModal} cancelAction={closeAcceptModal} title="آیا از تائید اطمینان دارید؟"  submitAction={AcceptOrderHandler}/>}
          {IsRejectmodal && <Deletemodal onHide={closeRejectModal} cancelAction={closeRejectModal} title="آیا از رد کامنت اطمینان دارید؟" submitAction={RejectOrderHandler}/>}
      </div>

    )
  }

