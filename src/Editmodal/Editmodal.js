import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { ThemeContext  } from '../Context/ThemeContext';
import { useEffect, useContext } from 'react';

import './Editmodal.css'

function Editmodal({onHide,form,onsubmitAction}) {
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    const chekKey = e =>{
      if(e.keyCode === 27){
        onHide()
      }
    }
    window.addEventListener('keydown',chekKey)
  })

  return (
    <div className={`edit-product__container ${theme}`}>
      <Modal show={true} onHide={onHide} centered>
        <Modal.Header className={`edit-products__header ${theme}`}>
          <h1 className="edit-products__title">افزودن محصول جدید</h1>
        </Modal.Header>
        <Modal.Body className={`edit-products__body ${theme}`}>
          <Form>
            {form}
          </Form>
        </Modal.Body>
        <Modal.Footer className={`modal-btn ${theme}`}>
          <Button variant="primary" className='edit-submit__btn' onClick={onsubmitAction}>ثبت اطلاعات جدید</Button>
        </Modal.Footer>
      </Modal> 
    </div>
  );
}

export default Editmodal;




