import React, { useEffect, useState, useContext} from 'react'
import Addnewproduct from "../Addnewproduct/Addnewproduct";
import Detailmodal from "../Detailmodal/Detailmodal";
import Deletemodal from "../Deletemodal/Deletemodal";
import Editmodal from "../Editmodal/Editmodal";
import Button from 'react-bootstrap/Button';
import Errorbox from '../Errorbox/Errorbox'
import { MdDriveFileRenameOutline,  MdOutlineInventory2} from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaImages ,FaSortAmountUpAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoIosColorFill } from "react-icons/io";
import { ThemeContext } from '../Context/ThemeContext';
import './Products.css'

export default function Products() {
  const [Allproducts , setAllProducts] = useState([])
  const [IsDetailmodal ,setDetailmodal] = useState(false)
  const [IsDeletemodal ,setDeletemodal] = useState(false)
  const [IsEditmodal ,setEditmodal] = useState(false)
  const [ProductID ,setProductID] = useState('')
  const [currentProduct, setCurrentProduct] = useState(null);
  const [title ,setTitle] = useState('')
  const [price ,setPrice] = useState('')
  const [count ,setCount] = useState('')
  const [img ,setImg] = useState('')
  const [popularity ,setPopularity] = useState('')
  const [sale ,setSale] = useState('')
  const [colors ,setColors] = useState('')
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    getAllProducts()
  },[])

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
    .then(res => res.json())
    .then(datas => {
      console.log(datas)
      setAllProducts(datas)
    })
  }

  const CloseDetailModal =()=>setDetailmodal(false)
  const CloseEditModal =()=>setEditmodal(false)
  const CloseDeletModal = ()=>setDeletemodal(false)

  const deleteProduct =()=>{
    fetch(`http://localhost:8000/api/products/${ProductID}`,{
      method:'DELETE'
  }).then(res => res.json())
    .then(datas => {
      console.log(datas)
      CloseDeletModal()
      getAllProducts(datas)
    })
  }

  const saveNewInfos=()=>{

    let newProductInfos ={
      title,
      price,
      count,
      img,
      popularity,
      sale,
      colors,
    }

    fetch(`http://localhost:8000/api/products/${ProductID}`,{
      method:'PUT',
      headers:{
        'content-type' :'application/JSON'
    },
    body:JSON.stringify(newProductInfos)
    })
    .then(res =>console.log(res))
    .then(data =>{
        console.log(data)
        getAllProducts()
        CloseEditModal()
        emptyState()
    })
  }

  const emptyState = () =>{
    setTitle('');
    setPrice('');
    setCount('');
    setImg('');
    setPopularity('');
    setSale('');
    setColors('');
  }

  return (
    <div className={`product ${theme}`}>
      <Addnewproduct getAllProducts={getAllProducts}/>
      <div className={`product-container ${theme}`}>
        <h1 className="product-title">لیست محصولات</h1>
          {Allproducts.length === 0 ? (
          <Errorbox/>
          ) : ( 
          <div className={`product-table ${theme}`}>
            <table className={`table ${theme}`}>
              <thead>
                <tr>
                  <th>عکس</th>
                  <th>اسم</th>
                  <th>قیمت</th>
                  <th>موجودی</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {
                Allproducts.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.img} alt="pic" className='product-table__img' /></td>
                    <td>{product.title}</td>
                    <td>{product.price.toLocaleString()} تومان</td>
                    <td>{product.count}</td>
                    <td className='product-table__btns'> 
                      <Button variant="outline-primary" className={`product-table__btn ${theme}`}
                        onClick={()=>{
                          setDetailmodal(true)
                          setCurrentProduct(product)
                      }}
                      >جزئیات</Button>
                      <Button variant="outline-primary" className={`product-table__btn ${theme}`}
                       onClick={()=>{
                        setDeletemodal(true)
                        setProductID(product.id)
                      }}>حذف</Button>
                      <Button variant="outline-primary" className={`product-table__btn ${theme}`}
                        onClick={()=>{
                          setEditmodal(true)
                          setProductID(product.id)
                          setTitle(product.title)
                          setPrice(product.price)
                          setCount(product.count)
                          setImg(product.img)
                          setPopularity(product.popularity)
                          setSale(product.sale)
                          setColors(product.colors)
                      }}>ویرایش</Button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
              {
                IsDetailmodal && <Detailmodal onHide={CloseDetailModal} columns={["محبوبیت", "فروش", "رنگبندی"]} body={[currentProduct.popularity,currentProduct.sale.toLocaleString(),currentProduct.colors]}/>
              }

              {
                IsDeletemodal && <Deletemodal onHide={CloseDeletModal} cancelAction={CloseDeletModal} title="آیا از حذف اطمینان دارید؟" submitAction={deleteProduct}/>
              }

              {
                IsEditmodal && <Editmodal onHide={CloseEditModal} onsubmitAction={saveNewInfos}
                form={
                  <div>
                    <div className={`editInput-group ${theme}`}>
                      <MdDriveFileRenameOutline />
                      <input type="text" placeholder='نام جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <BsCurrencyDollar  />
                      <input type="text" placeholder='قیمت جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <MdOutlineInventory2 />
                      <input type="text" placeholder='موجودی جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={count} onChange={(e) => setCount(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <FaImages  />
                      <input type="text" placeholder='آدرس جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={img} onChange={(e) => setImg(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <FaStar  />
                      <input type="text" placeholder='میزان محبوبیت جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={popularity} onChange={(e) => setPopularity(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <FaSortAmountUpAlt />
                      <input type="text" placeholder='میزان فروش جدید محصول را بنویسید' className={`editForm-input ${theme}`} value={sale} onChange={(e) => setSale(e.target.value)}/>
                    </div>
                    <div className={`editInput-group ${theme}`}>
                      <IoIosColorFill />
                      <input type="text" placeholder='تعداد جدید رنگبندی محصول را بنویسید' className={`editForm-input ${theme}`} value={colors} onChange={(e) => setColors(e.target.value)}/>
                    </div>
                  </div>
                }/>
              }
          </div>
        )}
      </div>
    </div>

    )
  }

