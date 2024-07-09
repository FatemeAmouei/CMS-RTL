import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Errorbox from '../Errorbox/Errorbox'
import Detailmodal from "../Detailmodal/Detailmodal";
import Deletemodal from "../Deletemodal/Deletemodal";
import Editmodal from "../Editmodal/Editmodal";
import { MdEmail ,  MdOutlineInventory2} from 'react-icons/md';
import { MdOutlinePassword  } from 'react-icons/md';
import { FaUserCheck  ,FaCity  ,FaStar } from 'react-icons/fa';
import { FaPhoneFlip , FaAddressBook  } from 'react-icons/fa6';
import { PiCurrencyDollarBold  } from "react-icons/pi";
import { ThemeContext  } from '../Context/ThemeContext';
import './Users.css'

export default function Users() {

  const [allUsers, setAllUsers] = useState([])
  const [IsDetailmodal ,setDetailmodal] = useState(false)
  const [IsDeletemodal ,setDeletemodal] = useState(false)
  const [IsEditmodal ,setEditmodal] = useState(false)
  const [userID ,setUserID] = useState('')
  const [currentUser, setCurrentUser] = useState(null);
  const [firsname ,setFirsname] = useState('')
  const [lastname ,setLastname] = useState('')
  const [username ,setUsername] = useState('')
  const [password ,setPassword] = useState('')
  const [phone ,setPhone] = useState('')
  const [city ,setCity] = useState('')
  const [email ,setEmail] = useState('')
  const [address ,setAddress] = useState('')
  const [score ,setScore] = useState('')
  const [buy ,setBuy] = useState('')
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    getAllUsers()
  },[])

  const getAllUsers = ()=>{
    fetch('http://localhost:8000/api/users/')
    .then(res => res.json())
    .then(user => {
      console.log(user)
      setAllUsers(user)
    })
  }

  const CloseDetailModal =()=>setDetailmodal(false)
  const CloseEditModal =()=>setEditmodal(false)
  const CloseDeletModal = ()=>setDeletemodal(false)
  
  const deleteUser =()=>{
    fetch(`http://localhost:8000/api/users/${userID}`,{
      method:'DELETE'
  }).then(res => res.json())
    .then(datas => {
      CloseDeletModal()
      getAllUsers(datas)
    })
  }

  const saveNewInfos=()=>{

    let newUserInfos ={
      firsname,
      lastname,
      username,
      password,
      phone,
      city,
      email,
      address,
      score,
      buy
    }

    fetch(`http://localhost:8000/api/users/${userID}`,{
      method:'PUT',
      headers:{
        'content-type' :'application/JSON'
    },
    body:JSON.stringify(newUserInfos)
    })
    .then(res =>console.log(res))
    .then(data =>{
      getAllUsers()
      CloseEditModal()
      emptyState()
    })
  }

  const emptyState =()=>{
    setFirsname('')
    setLastname('')
    setUsername('')
    setPassword('')
    setPhone('')
    setCity('')
    setAddress('')
    setScore('')
    setBuy('')
  }

  return (
    <div className={`users ${theme}`}>
      <h1 className="user-title">لیست کاربران</h1>
      {allUsers.length === 0 ? (
      <Errorbox/>
      ) : ( 
      <div className={`user-container ${theme}`}>
        <div className={`user-table ${theme}`}>
          <table className='table'>
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمزعبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.firsname} {user.lastname}</td>
                    <td> {user.username} </td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className='user-table__btns'> 
                      <Button variant="outline-primary" className={`user-table__btn ${theme}`}
                        onClick={()=>{
                          setDetailmodal(true)
                          setUserID(user.id)
                          setCurrentUser(user);
                      }}>جزئیات</Button>
                      <Button variant="outline-primary" className={`user-table__btn ${theme}`}
                        onClick={()=>{
                          setDeletemodal(true)
                          setUserID(user.id)
                      }}>حذف</Button>
                      <Button variant="outline-primary" className={`user-table__btn ${theme}`}
                        onClick={()=>{
                          setEditmodal(true)
                          setUserID(user.id)
                          setFirsname(user.firsname)
                          setLastname(user.lastname)
                          setUsername(user.username)
                          setPassword(user.password)
                          setPhone(user.phone)
                          setEmail(user.phone)
                          setCity(user.city)
                          setAddress(user.address)
                          setScore(user.score)
                          setBuy(user.buy)
                        }}>ویرایش</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      )}
        {
          IsDetailmodal && currentUser && <Detailmodal onHide={CloseDetailModal} columns={['نام و نام خانوادگی','شهر','آدرس','امتیاز','خرید']} body={[`${currentUser.firsname} ${currentUser.lastname}`,currentUser.city,currentUser.address,currentUser.score,currentUser.buy.toLocaleString()]}/>
        }
        {
          IsDeletemodal && <Deletemodal onHide={CloseDeletModal} cancelAction={CloseDeletModal} title="آیا از حذف اطمینان دارید؟" submitAction={deleteUser}/>
        }
        {
          IsEditmodal && <Editmodal onHide={CloseEditModal} onsubmitAction={saveNewInfos}
          form={
            <div className="editInput-container">
              <div className={`editInput-group ${theme}`}>
                <MdOutlineInventory2 />
                <input type="text" placeholder='نام جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={firsname} onChange={(e) => setFirsname(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <MdOutlineInventory2  />
                <input type="text" placeholder='نام خانوادگی جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={lastname} onChange={(e) => setLastname(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <FaUserCheck   />
                <input type="text" placeholder='نام کاربری جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <MdOutlinePassword   />
                <input type="text" placeholder='رمزعبور جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <FaPhoneFlip  />
                <input type="text" placeholder='شماره تماس جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <MdEmail  />
                <input type="text" placeholder='ایمیل جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <FaCity   />
                <input type="text" placeholder='شهر جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <FaAddressBook   />
                <input type="text" placeholder='آدرس جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={address} onChange={(e) => setAddress(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <FaStar   />
                <input type="text" placeholder='امتیاز جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={score} onChange={(e) => setScore(e.target.value)}/>
              </div>
              <div className={`editInput-group ${theme}`}>
                <PiCurrencyDollarBold   />
                <input type="text" placeholder='مبلغ جدید خرید محصول را بنویسید' className={`editForm-input ${theme}`} value={buy} onChange={(e) => setBuy(e.target.value)}/>
              </div>
            </div>

          }/>
        }
    </div>  
    )
  }
