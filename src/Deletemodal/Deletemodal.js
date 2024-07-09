import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Deletemodal.css'
import { useEffect ,useContext} from 'react';
import { ThemeContext  } from '../Context/ThemeContext';

function Deletemodal({onHide,cancelAction,title,submitAction}) {
  const { theme } = useContext(ThemeContext);

  useEffect(()=>{
    const checkKey = e =>{
      if(e.keyCode === 27){
        onHide()
      }
    }
    window.addEventListener('keydown',checkKey)
    return () => window.removeEventListener('keydown', checkKey);
  }, [onHide]);

  return (
    <Modal show={true} onHide={onHide} centered className='delete-container'>
        <Modal.Body className={`delete-modal__body ${theme}`}>
          <p>{title}</p>
            <div className='delete-modal__footer'>
              <Button className='delete-modal__btn' variant="primary" onClick={submitAction}>بله</Button>
              <Button className='delete-modal__btn' variant="secondary" onClick={cancelAction}>خیر</Button>
            </div>
        </Modal.Body>
    </Modal>
  );
}

export default Deletemodal;




