import React, { useState, useContext} from 'react'
import { Form } from 'react-bootstrap';
import { MdDriveFileRenameOutline,  MdOutlineInventory2} from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaImages ,FaSortAmountUpAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoIosColorFill } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { ThemeContext  } from '../Context/ThemeContext';

import './Addnewproduct.css'

export default function Addnewproduct({getAllProducts}) {

    const [title ,setTitle] = useState('')
    const [price ,setPrice] = useState('')
    const [count ,setCount] = useState('')
    const [img ,setImg] = useState('')
    const [popularity ,setPopularity] = useState('')
    const [sale ,setSale] = useState('')
    const [colors ,setColors] = useState('')
    const [errors, setErrors] = useState({});
    const { theme } = useContext(ThemeContext);

    const newProductInfos = {
        title,
        price,
        count,
        img,
        popularity,
        sale,
        colors,
    }

    const validate = () => {
        let errors = {};
        if (!title) errors.title = 'نام محصول باید پر شود';
        if (!price) errors.price = 'قیمت محصول باید پر شود';
        if (!count) errors.count = 'موجودی محصول باید پر شود';
        if (!img) errors.img = 'آدرس محصول باید پر شود';
        if (!popularity) errors.popularity = 'میزان محبوبیت محصول باید پر شود';
        if (!sale) errors.sale = 'میزان فروش محصول باید پر شود';
        if (!colors) errors.colors = 'تعداد رنگبندی محصول باید پر شود';
        return errors;
    }

    const addNewProduct = (e)=>{
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch('http://localhost:8000/api/products/',{
            method:'POST',
            headers:{
                'content-type' :'application/JSON'
            },
            body:JSON.stringify(newProductInfos)
        })
        .then(res =>console.log(res))
        .then(data =>{
            console.log(data)
            getAllProducts()
            emptyState()
        })
    }

    const emptyState = ()=>{
        setTitle('');
        setPrice('');
        setCount('');
        setImg('');
        setPopularity('');
        setSale('');
        setColors('');
        setErrors({})
    }

    return (
        <div className={`products-main ${theme}`}>
            <h1 className="products-title">افزودن محصول جدید</h1>
            <Form className={`product-form ${theme}`}>
                <div className={`form-wrapper ${theme}`}>
                    <div className={`input-group ${theme}`}>
                        <MdDriveFileRenameOutline />
                        <input type="text" placeholder='نام محصول را بنویسید' className={`form-input ${theme}`} value={title} onChange={e => setTitle(e.target.value)}/>
                        {errors.title && <div className={`error-message ${theme}`}>{errors.title}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <BsCurrencyDollar  />
                        <input type="text" placeholder='قیمت محصول را بنویسید' className={`form-input ${theme}`} value={price} onChange={e => setPrice(e.target.value)}/>
                        {errors.price && <div className={`error-message ${theme}`}>{errors.price}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <MdOutlineInventory2 />
                        <input type="text" placeholder='موجودی محصول را بنویسید' className={`form-input ${theme}`} value={count} onChange={e => setCount(e.target.value)}/>
                        {errors.count && <div className={`error-message ${theme}`}>{errors.count}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <FaImages  />
                        <input type="text" placeholder='آدرس محصول را بنویسید' className={`form-input ${theme}`} value={img} onChange={e => setImg(e.target.value)}/>
                        {errors.img && <div className={`error-message ${theme}`}>{errors.img}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <FaStar  />
                        <input type="text" placeholder='میزان مجبوبیت محصول را بنویسید' className={`form-input ${theme}`} value={popularity} onChange={e => setPopularity(e.target.value)}/>
                        {errors.popularity && <div className={`error-message ${theme}`}>{errors.popularity}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <FaSortAmountUpAlt />
                        <input type="text" placeholder='میزان فروش محصول را بنویسید' className={`form-input ${theme}`} value={sale} onChange={e => setSale(e.target.value)}/>
                        {errors.sale && <div className={`error-message ${theme}`}>{errors.sale}</div>}
                    </div>
                    <div className={`input-group ${theme}`}>
                        <IoIosColorFill />
                        <input type="text" placeholder='تعداد رنگبندی محصول را بنویسید' className={`form-input ${theme}`} value={colors} onChange={e => setColors(e.target.value)}/>
                        {errors.colors && <div className={`error-message ${theme}`}>{errors.colors}</div>}
                    </div>
                </div>
                <Button variant="outline-primary" className={`submit-btn ${theme}`} onClick={addNewProduct}>ثبت محصول</Button>
            </Form>

        </div>
      );
    }
