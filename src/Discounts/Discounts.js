import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Errorbox from '../Errorbox/Errorbox'
import Deletemodal from "../Deletemodal/Deletemodal";
import { ThemeContext  } from '../Context/ThemeContext';

import './Discounts.css'

export default function Discount() {

  const [AllDiscountCode , setAllDiscountCode] =useState([])
  const [IsDeletemodal ,setDeletemodal] = useState(false)
  const [DiscountID ,setDiscountID] = useState('')
  const [IsAcceptmodal ,setAcceptmodal] = useState(false)
  const [IsRejectmodal ,setRejectmodal] = useState(false)
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    getAllDiscountCode()
  },[])

  const getAllDiscountCode = ()=>{
    fetch('http://localhost:8000/api/offs/')
    .then(res => res.json())
    .then(codes =>{
      console.log(codes)
      setAllDiscountCode(codes)
    })
  }

  const CloseDeletModal = ()=>setDeletemodal(false)  
  const closeAcceptModal = ()=> setAcceptmodal(false)
  const closeRejectModal = ()=>setRejectmodal(false)

  const deleteDiscount =()=>{
    fetch(`http://localhost:8000/api/offs/${DiscountID}`,{
      method:'DELETE'
  }).then(res => res.json())
    .then(datas => {
      console.log(datas)
      CloseDeletModal()
      getAllDiscountCode(datas)
    })
  }

  const AcceptDiscountHandler = ()=>{
    const isActive = 1;

    fetch(`http://localhost:8000/api/offs/active-off/${DiscountID}/${isActive}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(result => {
      closeAcceptModal()
      getAllDiscountCode()
  })}
  
    const RejectDiscountHandler = () =>{
      const isActive = 0;
      
      fetch(`http://localhost:8000/api/offs/active-off/${DiscountID}/${isActive}`, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(result => {
        closeRejectModal()
        getAllDiscountCode()
  })  } 

  return (
    <div className={`discounts ${theme}`}>
      <h1 className="discount-title">لیست تخفیفات</h1>
      {AllDiscountCode.length === 0 ? (
      <Errorbox/>
      ) : ( 
      <div className={`discount-container ${theme}`}>
        <div className={`discount-table ${theme}`}>
          <table className='table'>
            <thead>
              <tr>
                <th>شماره</th>
                <th>کد تخفیف</th>
                <th>محصول</th>
                <th>درصد تخفیف</th>
                <th>تاریخ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                AllDiscountCode.map((code,index) =>(
                  <tr key={code.id}>
                    <td>{index + 1}</td>
                    <td>{code.code}</td>
                    <td>{code.productID}</td>
                    <td>{code.percent}</td>
                    <td>{code.date}</td>
                    <td className='discount-table__btns'> 
                      <Button variant="outline-primary" className={`discount-table__btn ${theme}`}
                        onClick={()=>{
                          setDeletemodal(true)
                          setDiscountID(code.id)
                      }}>حذف</Button>
                      {
                        code.isActive === 0 ? (
                          <Button variant="outline-primary" className={`discount-table__btn ${theme}`}
                            onClick={()=>{
                              setAcceptmodal(true)
                              setDiscountID(code.id);
                          }} >تائید </Button>
                        ) :
                        (
                          <Button variant="outline-danger" className={`discount-table__btn ${theme}`} 
                            onClick={()=>{
                              setRejectmodal(true)
                              setDiscountID(code.id);
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

      {IsDeletemodal && <Deletemodal onHide={CloseDeletModal} cancelAction={CloseDeletModal} title="آیا از حذف اطمینان دارید؟" submitAction={deleteDiscount}/>}
      {IsAcceptmodal && <Deletemodal onHide={closeAcceptModal} cancelAction={closeAcceptModal} title="آیا از تائید اطمینان دارید؟"  submitAction={AcceptDiscountHandler}/>}
      {IsRejectmodal && <Deletemodal onHide={closeRejectModal} cancelAction={closeRejectModal} title="آیا از رد کامنت اطمینان دارید؟" submitAction={RejectDiscountHandler}/>}

    </div>
  )
}
 